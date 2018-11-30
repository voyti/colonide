/* global _ angular */

import GameConstants from 'GameConstants';

const COST_PER_BUILDING_LEVEL = {
  livingQuarters: {
      1: [['50', 'iron'], ['20', 'aluminium']],
      2: [['70', 'iron'], ['30', 'aluminium']],
      3: [['90', 'iron'], ['40', 'aluminium']],
      4: [['110', 'iron'], ['50', 'aluminium']],
      5: [['130', 'iron'], ['60', 'aluminium']],
      6: [['150', 'iron'], ['70', 'aluminium']],
      7: [['170', 'iron'], ['80', 'aluminium']],
      8: [['190', 'iron'], ['90', 'aluminium']],
      9: [['210', 'iron'], ['100', 'aluminium']],
      10: [['230', 'iron'], ['110', 'aluminium']],
    },
};

const EMPLOYEES_PER_QUARTERS_LEVEL_COUNT = 
  { 1: 10, 2: 30, 3: 50, 4: 70, 5: 90,};

const BUILDINGS = [
  {
    id: 'livingQuarters',
    name: 'Living Quarters',
    iconSrc: '/resources/buildings/living_quarters.png',
    description: 'Basic colony structure, that determines how many workers you can employ - provided you have free slots in your industries. A key indication of your colony development level.',
    levelInfo: [{
      label: 'Build Cost: ',
      valueGetter: (buildingLevel) => COST_PER_BUILDING_LEVEL['livingQuarters'][buildingLevel],
    }, {
      id: 'capacity',
      label: 'Capacity: ',
      valueGetter: (buildingLevel) => EMPLOYEES_PER_QUARTERS_LEVEL_COUNT[buildingLevel],
      valueSuffix: 'employees',
    }],
    costPerLevel: COST_PER_BUILDING_LEVEL['livingQuarters'],
    maxLevel: 10,
  }, {
    id: 'mine',
    name: 'Mine',
    description: 'Provides your colony with minerals, as long as it\'s staffed. Higher levels grant more minerals and can extract more valuable ones.',
    iconSrc: '/resources/buildings/mine.png',
    maxLevel: 5,
    levelInfo: [{
      label: 'Build Cost: ',
      valueGetter: (buildingLevel) => COST_PER_BUILDING_LEVEL['mine'][buildingLevel],
    }],
  }, {
    id: 'farm',
    name: 'Farm',
    description: 'A heart of the colony, providing your colonists with food. If developed enough, it will also yield valuable plants.',
    iconSrc: '/resources/buildings/farm.png',
    maxLevel: 5,
    levelInfo: [{
      label: 'Build Cost: ',
      valueGetter: (buildingLevel) => COST_PER_BUILDING_LEVEL['farm'][buildingLevel],
    }],
  }, {
    id: 'longRangeScanner',
    name: 'Long Range Scanner',
    description: 'Grants you access to planet scanning and trade network. Essential for your expansion.',
    iconSrc: '/resources/buildings/long_range_scanner.png',
    maxLevel: 1,
    levelInfo: [{
      label: 'Build Cost: ',
      valueGetter: () => [['120', 'iron'], ['60', 'aluminium']],
    }],
  }, {
    id: 'shipFactory',
    name: 'Ship Factory',
    description: 'This facility is able to build spaceships using raw matrials, such as aluminium and titanium.',
    iconSrc: '/resources/buildings/ship_factory.png',
    maxLevel: 1,
    levelInfo: [{
      label: 'Build Cost: ',
      valueGetter: () => [['120', 'iron'], ['60', 'aluminium']],
    }],
  }, {
    id: 'scienceLab',
    name: 'Science Lab',
    description: 'A node in your science network, adding progress to reseach on improving various aspects of the technologies you use.',
    iconSrc: '/resources/buildings/science_lab.png',
    maxLevel: 1,
    levelInfo: [{
      label: 'Build Cost: ',
      valueGetter: () => [['200', 'iron'], ['200', 'aluminium']],
    }],
  },
];

export default class BuildingsService {
  
  static getStartBuildings() {
    return [
      this.getBuildingById('livingQuarters', 1),
      this.getBuildingById('mine', 1),
      this.getBuildingById('farm', 1),
    ];
  }
  
  static getAvailableBuildings(builtBuildings) {
    const builtIds = _.map(builtBuildings, 'id');
    const availablePrototypes = _.reject(BUILDINGS, (building) => _.includes(builtIds, building.id));
    const availableIds = _.map(availablePrototypes, 'id');
    return _.map(availableIds, (buildingId) => this.getBuildingById(buildingId));
  }
  
  static getBuildingById (id, level) {
    const building = _.find(BUILDINGS, ['id', id]);
    if (!building) console.warn('No building found with id ', id);
    const resultBuilding = _.isNil(level) ? building : _.assign(building, { level });
    return angular.copy(resultBuilding);
  }
  
  // @debug
  static getAllBuildings() {
   return _.map(BUILDINGS, (item) => (item.amount = 4, item)); 
  }
}
