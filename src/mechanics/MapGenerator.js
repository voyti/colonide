/* global _ */

import PlanetDrawer from '../drawing/PlanetDrawer';

export default class MapGenerator {
  
  constructor() {
    this.PlanetDrawer = new PlanetDrawer();
  }
  
  generateMap(planets, game) {
    _.forEach(planets, (planet) => {
      this.PlanetDrawer.drawPlanet(planet, game);
    });
  }
}
