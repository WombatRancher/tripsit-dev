import logger from '../../global/utils/logger';
import * as path from 'path';
const PREFIX = path.parse(__filename).name;

/**
 *
 * @return {Promise<void>}
 */
module.exports = {
  async execute() {
    global.ircClient.addListener('onRaw', (message:any) => {
      logger.debug(`[${PREFIX}] ${JSON.stringify(message, null, 2)}`);
    });
  },
};
