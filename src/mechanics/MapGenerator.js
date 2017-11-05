/* global _ */

import PlanetDrawer from '../drawing/PlanetDrawer';

export default class MapGenerator {
  
  constructor() {
    this.PlanetDrawer = new PlanetDrawer();
  }
  
  generateMap(planets, graphics) {
    _.forEach(planets, (planet) => {
      graphics.lineStyle(2, 0x499FD3, 1);
      graphics.beginFill(planet.color, 1);
      graphics.drawCircle(planet.x, planet.y, planet.size / 1000);
      this.PlanetDrawer.drawPlanet(planet, graphics);
    });
  }
}
