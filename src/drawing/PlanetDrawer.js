import Planet from 'mechanics/Planet';
import EventDispatchInterface from 'EventDispatchInterface';
import _ from 'lodash';

const TERRESTRIAL_IMGS = [
  {
    conditions: 'regular',
    name: 'terrestrial-1',
    backgrounds: ['red-planet_1.jpg', 'red-planet_2.jpg'],
    color: 'red',

  }, {
    conditions: 'regular',
    name: 'terrestrial-2',
    backgrounds: ['red-planet_2.jpg', 'red-planet_3.jpg'],
    color: 'red',
  }, {
    conditions: 'high temp',
    name: 'terrestrial-3',
    backgrounds: ['sand-planet_1.jpg', 'sand-planet_2.jpg'],
    color: 'yellow',
  }, {
    conditions: 'temp above 0',
    name: 'terrestrial-4',
    backgrounds: ['small_islands_1.jpg'],
    color: 'blue',
  }, {
    conditions: 'regular',
    name: 'terrestrial-5',
    backgrounds: ['red-planet_1.jpg', 'red-planet_2.jpg'],
    color: 'red',
  }, {
    conditions: 'high temp',
    name: 'terrestrial-6',
    backgrounds: ['red-planet_1.jpg', 'red-planet_2.jpg'],
  }, {
    conditions: 'regular',
    name: 'terrestrial-7',
    color: 'green',
    backgrounds: ['earth-like_1.jpg', 'earth-like_2.jpg'],
  }
];

const ICE_IMGS = [
  {
    name: 'ice-1',
    backgrounds: ['ice-planet_1.jpg'],
    color: 'light-blue',
  }, {
    name: 'ice-2',
    backgrounds: ['red-planet_1.jpg'],
    color: 'light-blue',
  }
];   

const GAS_IMGS = [
  {
    name: 'gas-1',
    backgrounds: ['orange_planet-1.jpg'],
    color: 'orange',
  }, {
    name: 'gas-2',
    backgrounds: ['storm_2.jpg'],
    color: 'grey',
  }, {
    name: 'gas-3',
    backgrounds: ['ice-planet_1.jpg'],
    color: 'cyan',
  }
];

const HELIUM_IMGS = [
  {
    name: 'helium-1',
    backgrounds:['grey-planet_1.jpg'],
    color: 'grey',
  }, {
    name: 'helium-2',
    backgrounds: ['white-planet_1.jpg'],
    color: 'white',
  }
];     
const OCEAN_IMGS = [
  {
    name: 'ocean-1',
    backgrounds: ['ocean-planet_1.jpg'],
    color: 'blue',
  }, {
    name: 'ocean-2',
    backgrounds: ['small_islands_1.jpg'],
    color: 'blue',
  }
]; 

export default class PlanetDrawer {
  constructor() {}
  
  static getAllBackgrounds() {
    return _([TERRESTRIAL_IMGS, ICE_IMGS, GAS_IMGS, HELIUM_IMGS, OCEAN_IMGS])
      .flatten()
      .flatMap('backgrounds')
      .uniq()
      .value();
  }
  
  _resolvePlanetImg(planet) {
    switch (planet.type) {
      case 'Terrestrial planet':
        return this._resolveTerrestrialPlanetImg(planet);
      case 'Helium planet':
        return _.sample(HELIUM_IMGS);
      case 'Gas giant':
        return _.sample(GAS_IMGS);
      case 'Ice giant':
        return _.sample(ICE_IMGS);
      case 'Ocean planet':
        return _.sample(OCEAN_IMGS);
    }
  }
  
  _resolveTerrestrialPlanetImg(planet) {
    let population = TERRESTRIAL_IMGS;
    
    if (planet.temperature < 0) {
      population = _.reject(TERRESTRIAL_IMGS, 
        (img) => _.includes(['temp above 0', 'high temp'], img.conditions));
    } else if (planet.temperature > Planet.MAX_TEMP * 0.5) {
      population = _.filter(TERRESTRIAL_IMGS, (img) => ['conditions', 'high temp']);
    }
    
    return _.sample(population);
  }
  
  drawPlanet(planet, game) {
    const SIZE_TO_SCALE = 100000 * 4;
    if (!planet.drawingData.boardImage) {
      const randomPlanetImg = _.get(planet, 'theme.name') || this._resolvePlanetImg(planet);
      planet.drawingData.boardImage = randomPlanetImg;
    } else {
      planet.drawingData.sprite.kill();
    }
    const planetImg = planet.drawingData.boardImage;
    const planetSprite = game.add.sprite(planet.x, planet.y, planetImg.name);
    
    planetSprite.anchor.set(0.5);
    planetSprite.scale.setTo(Math.sqrt(planet.size / SIZE_TO_SCALE), Math.sqrt(planet.size / SIZE_TO_SCALE));
    planetSprite.inputEnabled = true;
    planetSprite.events.onInputDown.add(() => this._onPlanetClicked(planet), this);
    
    planet.setDrawingData(planetImg, planetSprite);
  }
  
  _onPlanetClicked(planet) {
    EventDispatchInterface.emit('planet-selected', { planet });
  }
}