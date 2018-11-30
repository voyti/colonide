/* global _ */
import Planet from './Planet';
import GameConstants from 'GameConstants';


export default class PlanetGenerator {
  
  constructor() {
    this.BASE_NAMES = ['Uru', 'Reio', 'Herangi', 'Ahera', 'Teira', 'Waiara', 'Wihone',
    'Rawiri', 'Pihopa', 'Rawiri', 'Taimona', 'Urepo', 'Petera', 'Waiara', 'Tipene', 
    'Rongo', 'Nepe', 'Tahiwai', 'Raharuhi', 'Eraka', 'Tipene'];
    
    this.PLANET_BOX_MARGIN = 50; // the closer to half of box size, the more orderly the planets will be organized
  }
  
  generate(number) {
    const planets = [];
    const existingNames = [];
    const surelyHabitableIdx = _.random(0, number); // ensure at least one habitable

    _.times(number, (i) => {
      const name = this._getName(existingNames);
      const isHabitable = (i === surelyHabitableIdx) || _.random(0, 5) >= 4;
      
      planets.push(this._getSingle(name, isHabitable, ...this._getPlanetCoords(number, i)));
      existingNames.push(name);
    });
    return planets;
  }
  
  _getSingle(name, isHabitable, x, y) {
    const potential = _.random(0, 10);
    const resourcesLevel = _.random(0, 10);
    
    return new Planet(name, isHabitable, potential, resourcesLevel, x, y);
  }
  
  _getName(existingNames = []) {
    const nameCandidate = `${_.sample(this.BASE_NAMES)}-${_.random(1,9)}`; 
    return _.includes(existingNames, nameCandidate) ? this._getName(existingNames) : nameCandidate;
  }
  
  _getPlanetCoords(totalCount, i) {
    const primeFactor = _.primeFactor(totalCount);
    const complFactor = (totalCount / primeFactor);
    const numOfRows = complFactor > primeFactor ? primeFactor : complFactor;
    const numOfColumns = numOfRows === primeFactor ? complFactor : primeFactor;
    
    const boxingHelper = (separations, total) => _.times(separations, 
      (i) => (i + 1) * (total / separations) - (total / separations / 2));
      
    const xBoxes = boxingHelper(numOfColumns, GameConstants.BOARD_WIDTH);
    const yBoxes = boxingHelper(numOfRows, GameConstants.HEIGHT);
    const boxWidth = GameConstants.BOARD_WIDTH / numOfColumns;
    const boxHeight = GameConstants.HEIGHT / numOfRows;
    const margin = this.PLANET_BOX_MARGIN;

    const curCol = i % numOfColumns;
    const curRow = _.findIndex(_.times(numOfRows, (i) => numOfColumns * (i + 1)), (edg) => i < edg);
    
    const centerX = xBoxes[curCol];
    const centerY = yBoxes[curRow];
    
    const resultX = _.random(centerX - (boxWidth / 2) + margin, centerX + (boxWidth / 2) - margin);
    const resultY = _.random(centerY - (boxHeight / 2) + margin, centerY + (boxHeight / 2) - margin);
    
    return [resultX, resultY];
  }
}
