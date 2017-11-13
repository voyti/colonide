/* global _ */
export default class Planet {
  
  constructor(name, isHabitable, potential, resourcesLevel, x, y, isColonized = false) {
    this.name = name;
    this.isHabitable = isHabitable;
    this.potential = potential;
    this.resourcesLevel = resourcesLevel;
    this.drawingData = {};
    this.x = x;
    this.y = y;
    this.state = 'uncolonized';

    this._generateInfo();
  }
  
  static get MAX_HABIT_TEMP() {
    return 39;
  }  
  static get MIN_HABIT_TEMP() {
    return -23;
  }  
  static get MAX_TEMP() {
    return 186;
  }  
  static get MIN_TEMP() {
    return -234;
  }
  
  setDrawingData(planetTheme, planetSprite) {
    this.drawingData.theme = planetTheme;
    this.drawingData.theme.background = _.sample(planetTheme.backgrounds);
    this.drawingData.sprite = planetSprite;
  }
  
  _generateInfo() {
    const MIN_DIST = 0.4;
    const MAX_DIST = 50;
    const tempRangle = (Planet.MAX_TEMP - Planet.MIN_TEMP);
    const distRange = (MAX_DIST - MIN_DIST);
    
    this.temperature = this.isHabitable ? _.random(Planet.MIN_HABIT_TEMP, Planet.MAX_HABIT_TEMP) : _.random(Planet.MIN_TEMP, Planet.MAX_TEMP);
    this.dist = (((this.temperature - Planet.MIN_TEMP) * distRange) / tempRangle) + MIN_DIST;
    this.dist = _.round(this.dist, 2);
    this.type = this._generateType();
    this.color = this._generateColor();
    this.size = this._generateSize();

  }
  
  setX(x){
    this.x = x;
  }  
  
  setY(y){
    this.y = y;
  }
  
  setState(state) {
    this.state = state;
  }
  
  checkState(checkedState) {
    return this.state === checkedState;
  }
  
  _generateType() {
    if (this.isHabitable) {
      return 'Terrestrial planet';
    } else {
      if (this.resourcesLevel > 7) {
        return 'Helium planet';
      } else if (this.resourcesLevel > 2) {
        return 'Gas giant';
      } else if (this.temperature < 0) {
        return 'Ice giant';
      } else {
         return 'Ocean planet';
      }
    }

  }  
  _generateColor() {
    if (this.type === 'Ice giant') {
      return '0xc3e6e5';
    } else if (this.type === 'Helium planet') {
      return '0x999999';
    } else if (this.type === 'Gas giant') {
      return '0xfbf8b6';
    } else if (this.type === 'Ocean planet') {
      return '0x00a9e7';
    } else {
      return _.sample(['0x77b7c9', '0x79b039', '0xc34141']);
    }
  }
  
  _generateSize() {
    const MIN_SIZE = 23600;
    const MAX_SIZE = 63000;
    if (this.isHabitable) {
      return _.random(MIN_SIZE, MAX_SIZE / 2);
    } else if (this.type === 'Gas giant' || this.type === 'Ice giant') {
       return _.random((MAX_SIZE * 0.7), MAX_SIZE);
    } else {
      return _.random(Math.min(MIN_SIZE * 2, MAX_SIZE / 2), MAX_SIZE);
    }
  }
}
