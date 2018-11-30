import _ from 'lodash';
import GameStateInterface from 'GameStateInterface';

let instance = null;
export default class Player {
  
  constructor(inventory) {
    this.inventory = inventory || this._getDefaultInventory();
    this.GameStateInterface = GameStateInterface.getInstance();
    this.colonizedPlanets = [];
  }
  
  static getInstance() {
    return instance || (instance = new Player());
  }
  
  isPlayerEligibleToColonize() {
    return this.GameStateInterface.getState() === 'initial'
      || _.get(this.inventory.ships, 'colonizers.length');
  }
  
  isPlayerEligibleToExtract() {
    return _.get(this.inventory.ships, 'extractors.length');
  }  
  
  isPlayerEligibleToScan() {
    return _.get(this.inventory.buildings, ['id', 'long_range_scanner']);
  }
  
  onNewPlanetColonized(planet) {
    this.colonizedPlanets.push(planet);
  }
  
  // @debug
  addCompleteInventory() {
    _.forEach(this.colonizedPlanets, (planet) => planet.addCompleteInventory());
  }
  
  _getDefaultInventory() {
    return {
      items: {  },
      // ships: { colonizers: [1,2,3,4,5,6] },
      ships: {  },
    }
  }
 
}