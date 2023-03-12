import knex from 'knex';
import { parse } from 'path';
import { log } from './utils/log';

require('dotenv').config();

const F = parse(__filename).name;

export default prodToDev;

export async function prodToDev() {
  log.info(F, 'Starting prodToDev');

  // Initialize Production DB
  const prodDB = knex({
    client: 'pg',
    connection: process.env.POSTGRES_DB_URL_PROD,
  });

  // Initialize Dev DB
  const devDB = knex({
    client: 'pg',
    connection: 'postgres://tripsit_api:P@ssw0rd@localhost:5432/tripsit',
  });

  // This needs to happen in a very specific order to resolve dependances
  const tableNames = [
    'users',
    'user_experience',
    // 'user_drug_doses',
    // 'user_reminders',
    // 'user_tickets',
    // 'user_actions',
    // 'discord_guilds',
    // 'rss',
    'personas',
    'rpg_inventory',
    // 'reaction_roles',
  ];

  for (const tableName of tableNames) { // eslint-disable-line
    const records = await prodDB(tableName).select(); // eslint-disable-line
    log.info(F, `Copying ${tableName} with ${records.length} records`);
    for (const record of records) { // eslint-disable-line
      if (tableName === 'users') {
        if (record.email) continue; // eslint-disable-line
        try {
          await devDB(tableName) // eslint-disable-line
            .insert(record)
            .onConflict(['discord_id'])
            .merge(['birthday', 'discord_bot_ban', 'discord_id', 'email', 'empathy_points', 'irc_id', 'joined_at', 'karma_given', 'karma_received', 'last_seen_at', 'last_seen_in', 'matrix_id', 'mindset_role', 'mindset_role_expires_at', 'move_points', 'password_hash', 'removed_at', 'roles', 'sparkle_points', 'ticket_ban', 'timezone', 'username']); // eslint-disable-line
        } catch (err:any) {
          log.error(F, err);
          log.info(F, `Copying user ${JSON.stringify(record, null, 2)}`);
        }
      } else if (tableName === 'user_experience') {
        try {
          await devDB(tableName) // eslint-disable-line
            .insert(record)
            .onConflict(['user_id', 'type', 'category'])
            .merge();
        } catch (err:any) {
          log.error(F, err);
          log.info(F, `Copying user ${JSON.stringify(record, null, 2)}`);
        }
      } else if (tableName === 'rpg_inventory') {
        try {
          await devDB(tableName) // eslint-disable-line
            .insert(record)
            .onConflict(['persona_id'])
            .merge();
        } catch (err:any) {
          log.error(F, err);
          log.info(F, `Copying user ${JSON.stringify(record, null, 2)}`);
        }
      } else {
        try {
          await devDB(tableName) // eslint-disable-line
            .insert(record)
            .onConflict(['id'])
            .merge();
        } catch (err:any) {
          log.error(F, err);
          log.error(F, `Copying ${tableName} ${JSON.stringify(record, null, 2)}`);
        }
      }
    }
  }

  log.info(F, 'Finished prodToDev');
  process.exit(200);
}

prodToDev().catch(err => {
  log.error(F, err);
  process.exit(200);
});
