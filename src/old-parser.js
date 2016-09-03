import { parse as parseUrl } from 'url';

import fetch from 'node-fetch';
import TelegramBot from 'node-telegram-bot-api';
import qs from 'qs';

import { delay } from './utils/promise';

const fetchData = url => (
  fetch(url, {
    type: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => (
    response.json()
  ))
);

const fetchApartments = options => (
  fetchData(`https://ak.api.onliner.by/search/apartments?${qs.stringify(options)}`)
);

const apCache = {};

const worker = async (bot, userId, options) => {
  while (true) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { apartments, total, page } = await fetchApartments(options);
      const currentCache = {};
      for (const ap of apartments) {
        currentCache[ap.id] = ap;
        if (apCache[ap.id]) {
          continue;
        }

        bot.sendMessage(userId, `Yay, we've got a new thing: ${ap.url}`);
        apCache[ap.id] = ap;
      }
      for (const id of Object.keys(apCache)) {
        if (currentCache[id]) {
          continue;
        }

        bot.sendMessage(userId, `A known flat was removed =( ${apCache[id].url}`);
        delete apCache[id];
      }
      await delay(60000 + (Math.random() * 1e4));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Request failed', error);
      bot.sendMessage(userId, 'Request failed');
      await delay(60000 + (Math.random() * 1e4));
    }
  }
};

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/start (.*)/, (msg, match) => {
  const { from: { id: userId } } = msg;
  // eslint-disable-next-line no-unused-vars
  const [ command, url ] = match;
  const parsedUrl = parseUrl(url);
  // eslint-disable-next-line no-console
  console.log('p', parsedUrl);
  const options = {
    ...qs.parse(parsedUrl.query),
    ...qs.parse(parsedUrl.hash.slice(1)),
    // TODO: Search results pagination
    page: 1,
  };
  // eslint-disable-next-line no-console
  console.log('options', options);
  bot.sendMessage(userId, 'Starting scraping for flats');
  worker(bot, userId, options).then(() => {
    bot.sendMessage(userId, 'We are surprisingly done scraping...');
  }).catch(error => {
    bot.sendMessage(userId, `Everything failed: ${error.message}`);
  });
});
