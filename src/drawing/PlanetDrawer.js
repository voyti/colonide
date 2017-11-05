export default class PlanetDrawer {
  
  constructor() {
  }
  
  drawPlanet(planet, graphics) {
    graphics.lineStyle(2, 0x499FD3, 1);
    graphics.beginFill(planet.color, 1);
    graphics.drawCircle(planet.x, planet.y, planet.size / 1000);
  }
  
}
