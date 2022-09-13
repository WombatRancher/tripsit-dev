import {Guild} from 'discord.js';
import logger from '../../global/utils/logger';
import * as path from 'path';
const PREFIX = path.parse(__filename).name;

module.exports = {
  name: 'guildDelete',

  async execute(guild: Guild) {
  // logger.debug(`[${PREFIX}] starting!`);
    logger.info(`[${PREFIX}] Left guild: ${guild.name} (id: ${guild.id})`);
  // logger.debug(`[${PREFIX}] finished!`);
  },
};
