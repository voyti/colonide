/* global _, angular */

import GameConstants from 'GameConstants';
const YIELD_INCREASE_PER_MINE_LEVEL = 0.1;

const VEHICLES = [
  {
    id: 'scoutRover',
    name: 'Scout Rover',
    type: 'vehicle',
    iconSrc: '/resources/vehicles/scout_rover.png',
    description: 'This vehicle allows launching expeditions into unexplored areas of your planet, uncovering hidden treasures and dangers.',
    levelTools: [{
      id: 'buildCost',
      valueGetter: () => [['20', 'iron'], ['10', 'aluminium']],
    }],
    maxLevel: 1,
}];

export default class VehiclesService {
  
  static _getVehicleById (id, amount) {
    const item = _.find(VEHICLES, ['id', id]);
    if (!item) console.warn('No vehicle found with id ', id);
    const resultItem = _.isNil(amount) ? item : _.assign(item, { amount });
    return angular.copy(item);
  }
  
  static getAvailableVehicles(builtVehicles) {
    const builtIds = _.map(builtVehicles, 'id');
    const availablePrototypes = _.reject(VEHICLES, (vehicles) => _.includes(builtIds, vehicles.id));
    const availableIds = _.map(availablePrototypes, 'id');
    return _.map(availableIds, (buildingId) => this._getVehicleById(buildingId));
  }
}
