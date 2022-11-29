import { parse } from 'path';
import { db } from '../utils/knex';
import { Users, UserExperience, ExperienceType } from '../repos/http-api/type-output/pgdb'; // eslint-disable-line
import log from '../utils/log';

import existingDb from '../assets/data/tripsit-me-bot-export.json';

const PREFIX = parse(__filename).name;

export default run;

export async function run() {
  // let i = 0;
  log.debug(`[${PREFIX}] Starting updateDB`);
  // log.debug(`[${PREFIX}] ${JSON.stringify(existingDb)}`);

  for (const key of Object.keys(existingDb.users_v5)) { // eslint-disable-line
    // if (i < 10) {
    // if (key === '177537158419054592') {
    if (Number(key)) {
      // i += 1;
      const userData = existingDb.users_v5[key as keyof typeof existingDb.users_v5] as any;
      // log.debug(`[${PREFIX}] ${JSON.stringify(userData, null, 2)}`);
      const userObj = {
        discord_id: key,
        timezone: null,
        birthday: null as Date | null,
        roles: '',
        karma_given: 0,
        karma_received: 0,
        sparkle_points: 0,
        move_points: 0,
        empathy_points: 0,
        discord_bot_ban: false,
        ticket_ban: false,
        last_seen_at: new Date(),
        last_seen_in: null,
        removed_at: null,
      };

      if (userData.timezone) {
        userObj.timezone = userData.timezone;
      }

      if (userData.birthday) {
        userObj.birthday = new Date(`2000-${userData.birthday.month}-${userData.birthday.day}`);
      }
      if (userData.karma) {
        userObj.karma_given = userData.karma.karma_given;
        userObj.karma_received = userData.karma.karma_received;
      }
      if (userData.discord) {
        userObj.sparkle_points = userData.discord.sparkle_points;
      }
      // log.debug(`${PREFIX} (${i}) Key: ${key}
      // @@@@@@@ userData: ${JSON.stringify(userData)}
      // $$$$$$$ updateData: ${JSON.stringify(userObj)}`);

      // log.debug(`[${PREFIX}] ${JSON.stringify(userObj, null, 2)}`);

          const userUUID = await db<Users>('users') // eslint-disable-line
        .insert(userObj)
        .onConflict('discord_id')
        .merge(userObj)
        .returning('id');

      // log.debug(`[${PREFIX}] userUUID ${JSON.stringify(userUUID, null, 2)}`);

      if (userData.experience) {
            for (const expKey of Object.keys(userData.experience)) { // eslint-disable-line
              const expUUID = await db<UserExperience>('user_experience') // eslint-disable-line
            .select('id')
            .where('user_id', userUUID[0].id)
            .andWhere('type', expKey.toUpperCase() as ExperienceType)
            .first();

          const expData = userData.experience[expKey as keyof typeof userData.experience] as any;
          const experienceObj = {
            id: expUUID ? expUUID.id : undefined,
            user_id: userUUID[0].id,
            type: expKey.toUpperCase() as ExperienceType,
            level: expData.level,
            level_points: expData.levelExpPoints,
            total_points: expData.totalExpPoints,
            last_message_at: new Date(expData.lastMessageDate),
            last_message_channel: expData.lastMessageChannel,
          };
          // log.debug(`[${PREFIX}] Experience (${expKey}): ${JSON.stringify(experienceObj, null, 2)}`);
              const expId = await db<UserExperience>('user_experience') // eslint-disable-line
            .insert(experienceObj)
            .onConflict(['id', 'user_id', 'type'])
            .merge()
            .returning('id');

          // log.debug(`[${PREFIX}] expId ${JSON.stringify(expId, null, 2)}`);
        }
      }
    }
    //   }
    // }
  }
  log.info(`[${PREFIX}] Finished updateDB`);
  process.exit(200);
}

run().catch(err => {
  log.error(err);
  process.exit(200);
});
