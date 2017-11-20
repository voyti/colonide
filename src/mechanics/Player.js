import _ from 'lodash';
import GameStateInterface from 'GameStateInterface';

let instance = null;
export default class Player {
  
  constructor(inventory) {
    this.inventory = inventory || this._getDefaultInventory();
    this.GameStateInterface = GameStateInterface.getInstance();
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
  
  _getDefaultInventory() {
    return {
      items: {},
      ships: {},
    }
  }
 
}