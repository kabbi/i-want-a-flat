import store from './store';
import bot from './sagas/telegram';

store.run(bot);
