export const AddUrl = (
  'Please, send me the url of the search results page from onliner site'
);

export const NeverMind = (
  'Ok, as you with. I can\'t work with this'
);

export const UrlParsingError = (
  'Sorry, we had a problem parsing the url you provided. Please, double-check ' +
  'everything and try again'
);

export const makeWatcherStarted = watcherId => (
  `Ok, got it. Starting scraping for new apartments. Your request id is \`${watcherId}\`, ` +
  'you may use it later to refer to this specific watcher task'
);

export const makeUpdateError = watcherId => (
  `Sorry, we had a problem fetching the updates for the watcher of \`${watcherId}\`, ` +
  'we will continue trying, as the problem may go away.'
);

export const makeUpdate = (watcherId, updates) => {
  const addedKeys = Object.keys(updates.added);
  const removedKeys = Object.keys(updates.removed);
  const lines = [
    `Hey, I've accidentally found some updates for \`${watcherId}\`:`,
    ...(updates.haveAdded ? (
      addedKeys.map((key, index) => (
        `${index + 1}. added, ${updates.added[key].url}`
      ))
    ) : []),
    ...(updates.haveAdded ? (
      removedKeys.map((key, index) => (
        `${index + 1 + addedKeys.length}. removed, ${updates.removed[key].url}`
      ))
    ) : []),
  ];
  return lines.join('\n');
};

export const makeStatus = watchers => (
  watchers.length === 0 ? (
    'You have no watchers. Start one with /watch command'
  ) : (
    `Here are all your watchers:\n${watchers.map(watcher => (
      `\`${watcher.id}\` - running since ${new Date(watcher.startTime)}, ` +
      `${watcher.stats.successCount} checks successful out of ${watcher.stats.iterationCount}, ` +
      `tracking ${Object.keys(watcher.knownApartments).length} apartments`
    )).join('\n')}`
  )
);

export const makeFinished = watcherId => (
  `Ok, I've stopped this watcher task \`${watcherId}\` for you. Thanks for flying our botnetworks!`
);
