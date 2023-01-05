import knex from 'knex';
import { parse } from 'path';
import { Users, UserExperience, ExperienceType } from '../repos/http-api/type-output/pgdb'; // eslint-disable-line
import log from './utils/log';

const F = parse(__filename).name;

export default prodToDev;

export async function prodToDev() {
  log.debug(F, 'Starting prodToDev');

  // Initialize Production DB
  const prodDB = knex({
    client: 'pg',
    connection: 'postgres://tripbot_discord:4pMQz8U$3KgKFGihNw*a38t6@api.tripsit.me:5432/tripsit',
  });

  // Initialize Dev DB
  const devDB = knex({
    client: 'pg',
    connection: 'postgres://tripsit_api:P@ssw0rd@localhost:5432/tripsit',
  });

  const tableNames = [
    'users',
    'user_experience',
    'user_drug_doses',
    'user_reminders',
    'user_experience',
    'user_tickets',
    'user_actions',
    'discord_guilds',
  ];

  for (const tableName of tableNames) { // eslint-disable-line
    const records = await prodDB(tableName).select(); // eslint-disable-line
    log.debug(F, `Copying ${tableName} with ${records.length} records`);
    for (const record of records) { // eslint-disable-line
      await devDB(tableName) // eslint-disable-line
        .insert(record)
        .onConflict('id')
        .merge(); // eslint-disable-line
    }
  }

  log.info(F, 'Finished prodToDev');
  process.exit(200);
}

prodToDev().catch(err => {
  log.error(err);
  process.exit(200);
});
