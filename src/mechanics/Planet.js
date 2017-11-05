/* global _ */
export default class Planet {
  
  constructor(name, isHabitable, potential, resourcesLevel, x, y) {
    this.name = name;
    this.isHabitable = isHabitable;
    this.potential = potential;
    this.resourcesLevel = resourcesLevel;
    this.x = x;
    this.y = y;
    
    this._generateInfo();
  }
  
  _generateInfo() {
    const MIN_TEMP = -234;
    const MIN_HABIT_TEMP = -23;
    const MAX_TEMP = 186;
    const MAX_HABIT_TEMP = 39;
    
    const MIN_DIST = 0.4;
    const MAX_DIST = 50;
    const tempRangle = (MAX_TEMP - MIN_TEMP);
    const distRange = (MAX_DIST - MIN_DIST);
    
    this.temperature = this.isHabitable ? _.random(MIN_HABIT_TEMP, MAX_HABIT_TEMP) : _.random(MIN_TEMP, MAX_TEMP);
    this.dist = (((this.temperature - MIN_TEMP) * distRange) / tempRangle) + MIN_DIST;
    this.type = this._generateType();
    this.color = this._generateColor();
    this.size = this._generateSize();
    
    console.warn('------------------------');
    console.warn('Planet ', this.name);
    console.warn('temperature ', this.temperature);
    console.warn('dist', this.dist);
    console.warn('type', this.type);
    console.warn('color', this.color);
    console.warn('size', this.size);
  }
  
  setX(x){
    this.x = x;
  }  
  
  setY(y){
    this.y = y;
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