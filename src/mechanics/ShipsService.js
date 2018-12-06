/* global _, angular */

import GameConstants from 'GameConstants';

const SHIPS = [
  {
    id: 'extraxtor',
    name: 'Extractor',
    type: 'ship',
    iconSrc: '/resources/ships/extractor_ship.png',
    description: 'Extractors can be sent to other planets to collect resources and bring them home.',
    levelTools: [{
      id: 'buildCost',
      valueGetter: (buildingLevel) => [['100', 'aluminium'], ['60', 'titanium']],
    }, {
      id: 'capacity',
      valueGetter: () => 1000,
    }],
    maxLevel: 1,
}, {
    id: 'colonizer',
    name: 'Colonizer',
    type: 'ship',
    iconSrc: '/resources/ships/colonizer_ship.png',
    description: 'Send this ship to a habitable planet to start a new colony there.',
      levelTools: [{
      id: 'buildCost',
      valueGetter: (buildingLevel) => [['400', 'aluminium'], ['200', 'titanium']],
    }],
    maxLevel: 1,
}];

export default class ShipsService {
  
  static _getShipById (id, amount) {
    const item = _.find(SHIPS, ['id', id]);
    if (!item) console.warn('No vehicle found with id ', id);
    const resultItem = _.isNil(amount) ? item : _.assign(item, { amount });
    return angular.copy(item);
  }
  
  static getAvailableShips(builtShips) {
    const builtIds = _.map(builtShips, 'id');
    const availablePrototypes = _.reject(SHIPS, (vehicles) => _.includes(builtIds, vehicles.id));
    const availableIds = _.map(availablePrototypes, 'id');
    return _.map(availableIds, (buildingId) => this._getShipById(buildingId));
  }
}
