import Planet from 'mechanics/Planet';

export default class PlanetDrawer {
  
  constructor() {
    this.TERRESTRIAL_IMGS = [
      {
        conditions: 'regular',
        name: 'terrestrial-1',
      }, {
        conditions: 'regular',
        name: 'terrestrial-2',
      }, {
        conditions: 'high temp',
        name: 'terrestrial-3',
        color: 'yellow',
      }, {
        conditions: 'temp above 0',
        name: 'terrestrial-4',
      }, {
        conditions: 'regular',
        name: 'terrestrial-5',
      }, {
        conditions: 'high temp',
        name: 'terrestrial-6',
      }, {
        conditions: 'regular',
        name: 'terrestrial-7',
      }
    ];
    
    this.ICE_IMGS = [
      {
        name: 'ice-1',
      }, {
        name: 'ice-2',
      }
    ];   
    
    this.GAS_IMGS = [
      {
        name: 'gas-1',
        color: 'yellow',
      }, {
        name: 'gas-2',
      }, {
        name: 'gas-3',
      }
    ];
    
    this.HELIUM_IMGS = [
      {
        name: 'helium-1',
      }, {
        name: 'helium-2',
        color: 'white',
      }
    ];     
    this.OCEAN_IMGS = [
      {
        name: 'ocean-1',
      }, {
        name: 'ocean-2',
      }
    ]; 
  }
  
  _resolvePlanetImg(planet) {
    switch (planet.type) {
      case 'Terrestrial planet':
        return this._resolveTerrestrialPlanetImg(planet);
      case 'Helium planet':
        return _.sample(this.HELIUM_IMGS);
      case 'Gas giant':
        return _.sample(this.GAS_IMGS);
      case 'Ice giant':
        return _.sample(this.ICE_IMGS);
      case 'Ocean planet':
        return _.sample(this.OCEAN_IMGS);
    }
  }
  
  _resolveTerrestrialPlanetImg(planet) {
    let population = this.TERRESTRIAL_IMGS;
    
    if (planet.temperature < 0) {
      population = _.reject(this.TERRESTRIAL_IMGS, 
        (img) => _.includes(['temp above 0', 'high temp'], img.conditions));
    } else if (planet.temperature > Planet.MAX_TEMP * 0.5) {
      population = _.filter(this.TERRESTRIAL_IMGS, (img) => ['conditions', 'high temp']);
    }
    
    return _.sample(population);
  }
  
  drawPlanet(planet, game) {
    const SIZE_TO_SCALE = 100000 * 4;
    const planetImg = _.get(planet, 'img.name') || this._resolvePlanetImg(planet);
    const planetSprite = game.add.sprite(planet.x, planet.y, planetImg.name);
    
    planetSprite.anchor.set(0.5);
    planetSprite.scale.setTo(Math.sqrt(planet.size / SIZE_TO_SCALE), Math.sqrt(planet.size / SIZE_TO_SCALE));
    planetSprite.inputEnabled = true;
    
    planet.setDrawingData(planetImg, planetSprite);
  }
}
