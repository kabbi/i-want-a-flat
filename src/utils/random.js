import Chance from 'chance';

const chance = new Chance();

export const randomReadableId = (syllables = 3) => (
  chance.word({ syllables })
);
