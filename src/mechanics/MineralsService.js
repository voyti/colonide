/* global _, angular */

import GameConstants from 'GameConstants';
const YIELD_INCREASE_PER_MINE_LEVEL = 0.1;
const POSSIBLE_YIELD_PER_MINE_LEVEL = {
  1: ['iron', 'aluminium'],
  2: ['iron', 'aluminium', 'cobalt'],
  3: ['iron', 'aluminium', 'cobalt', 'titanium', 'iridium'],
  4: ['iron', 'aluminium', 'cobalt', 'titanium', 'iridium', 'gold', ],
  5: ['iron', 'aluminium', 'cobalt', 'titanium', 'iridium', 'platinium', 'rhodium'],
}

const ITEMS = [{
    id: 'iron',
    name: 'Iron',
    type: 'mineral',
    iconSrc: '/resources/minerals/iron.png',
    applications: ['building-material'],
    quality: 'common',
    minYield: 12,
    maxYield: 24,
    valueRange: [4, 6],
    description: 'Absolute cornerstone of any structure built in the colony. Can be melted to remove impurities, reduce carbon content and obtain steel. No building or ship would be complete without this resource.',
  }, {
    id: 'aluminium',
    name: 'Aluminium',
    type: 'mineral',
    iconSrc: '/resources/minerals/aluminium.png',
    applications: ['building-material', 'ship-material'],
    quality: 'common',
    minYield: 6,
    maxYield: 12,
    valueRange: [11, 19],
    description: 'With a third the weight of steel, aluminium has many uses in the space industry. Interestingly, unlike iron rusting, the aluminium oxide sticks to the original metal, shielding it from further decay rather than breaking apart. Not that oxidation is too much of a problem in space.',
  }, {
    id: 'titanium',
    name: 'Titanium',
    type: 'mineral',
    iconSrc: '/resources/minerals/titanium.png',
    applications: ['ship-material'],
    quality: 'rare',
    minYield: 3,
    maxYield: 7,
    valueRange: [75, 125],
    description: 'Only half as heavy as steel and twice as strong as aluminium, this metal is a very valuable building material. It has been tested for use in space from early days, and has proven very useful - parts made of titanium can take atmospheric reentry heat with no shielding.',
  }, {
    id: 'cobalt',
    name: 'Cobalt',
    type: 'mineral',
    iconSrc: '/resources/minerals/cobalt.png',
    quality: 'rare',
    maxYield: 9,
    valueRange: [45, 75],
    description: 'This blue metal has been historically used as pigment, but currently has many uses in high-tech, thanks to its magnetic and radioactive properties. It can retain its magnetism at over 1000 degrees centrigrade.',
  }, {
    id: 'iridium',
    name: 'Iridium',
    type: 'mineral',
    iconSrc: '/resources/minerals/iridium.png',
    quality: 'valuable',
    maxYield: 5,
    valueRange: [210, 350],
    description: 'Super resistant to harsh conditions, iridium has some specific use cases where it shines. Space is kind of famous of having harsh conditions, so hey.',
  }, {
    id: 'gold',
    name: 'Gold',
    type: 'mineral',
    iconSrc: '/resources/minerals/gold.png',
    quality: 'valuable',
    maxYield: 4,
    valueRange: [352, 587],
    description: 'Since most of the gold in Earth\'s crust came in the form of meteorites, it seems to make sense to look for it in space. It holds a significant value as a precious metal, but is now used heavily in the space industry - mainly for radiation shielding, thanks to its reflective qualities.',
  }, {
    id: 'platinium',
    name: 'Platinium',
    type: 'mineral',
    iconSrc: '/resources/minerals/platinium.png',
    quality: 'unique',
    maxYield: 3,
    valueRange: [615, 1025],
    description: 'This rare, extremely durable, malleable and non-reactable metal has many uses. It is turned into magnets, electrical contacts and catalytic converters. Platinum mixed with durable agents, such as Iridium, can make great alloys for every imaginable use.',
  },  {
    id: 'rhodium',
    name: 'Rhodium',
    type: 'mineral',
    iconSrc: '/resources/minerals/rhodium.png',
    quality: 'unique',
    maxYield: 2,
    valueRange: [1270.5, 2359.5],
    description: 'This highly reflective metal has higher melting point and density than platinium. Most importantly, it is vital for space travel, since nanocubes of rhodium are a great solar-powered catalyst for turning carbon dioxide into methane. In other words, rhodium makes space fuel cheap = rhodium expensive.',
  }];

export default class MineralsService {
  
  static getMineralItemById (id, amount) {
    const item = _.find(ITEMS, ['id', id]);
    if (!item) console.warn('No mineral found with id ', id);
    const resultItem = _.isNil(amount) ? item : _.assign(item, { amount });
    return angular.copy(item);
  }
  
  static getMineralsByApplication(application, amount) {
    const prototypes = _.filter(ITEMS, (item) => _.includes(item.applications, application));
    return _.map(_.map(prototypes, 'id'), (id) => this.getMineralItemById(id, amount));
  }
  
  static getYieldForLevelAndTool(level, tool) {
    const fullYield = _.map(POSSIBLE_YIELD_PER_MINE_LEVEL[level], (id) => {
      const item = this.getMineralItemById(id);
      const minYield = item.minYield || (item.maxYield * (YIELD_INCREASE_PER_MINE_LEVEL * level) +
        (tool ? item.maxYield * (tool.additionalChance) : 0));
      
      const receivedAmount = _.random(minYield, item.maxYield);
      return receivedAmount > 0 ? this.getMineralItemById(id, receivedAmount) : null;
    });
    return _.compact(fullYield);
  }
  
  // @debug
  static getAllItems() {
   return _.map(ITEMS, (item) => (item.amount = 100, item)); 
  }
}
