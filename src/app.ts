
import { requireFile, logger, BotConfig, Bot } from './resources';

let config: BotConfig = requireFile('./bot-config.json');

let bot = new Bot(config);

bot.connect()
    .then(() => {
        logger.debug('Bot Ready');
        console.log('Bot Online');
        bot.listen();
    })
    .catch(err => logger.error(err));
