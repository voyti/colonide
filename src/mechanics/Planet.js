/* global _ */

/* Planet class. Should keep planet state and simple mechanics. 
 * Advanced mechanics should be calculated using stateless PlanetService 
 */
import PlanetService from './PlanetService';
import FoodService from './FoodService';
import IndustryToolsService from './IndustryToolsService';

const COLONIZED_PLANET_START_BUILDINGS = [
  {
    id: 'livingQuarters',
    name: 'Living Quarters',
    level: 1,
  }, {
    id: 'mine',
    name: 'Mine',
    level: 1,
  }, {
    id: 'farm',
    name: 'Farm',
    level: 1,
  },
];

const OPPOSITE_INDUSTRY_MAP = {
  mine: 'farm',
  farm: 'mine',
};

const MINER_CONTRIBUTION_VALUE = 1;
const FOOD_DEMAND_PER_EMPLOYEE = 30;
const MINIMAL_EMPLOYEES_COUNT = 0;
const EMPLOYEES_PER_QUARTERS_LEVEL_COUNT = 
  { 1: 10, 2: 30, 3: 50, 4: 70, 5: 90,};
  
const EMPLOYEES_PER_BUILDING_LEVEL_COUNT = {
  mine: { 1: 9, 2: 18, 3: 27, 4: 36, 5: 45 },
  farm: { 1: 9, 2: 18, 3: 27, 4: 36, 5: 45 },
};

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
    
    this.workers = 0;
    this.employedWorkers = 0;
    this.buildings = isHabitable ? COLONIZED_PLANET_START_BUILDINGS : [];
    this.inventory = isHabitable ? FoodService.getStartFoodInventory() : [];
    this.industries = {
      mine: { employed: 0, tool: IndustryToolsService.getDefaultIndustryTool() },
      farm: { employed: 0, tool: IndustryToolsService.getDefaultIndustryTool() },
    };

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
  
  getAllEmployeesCount() {
    const quarters = _.find(this.buildings, ['id', 'livingQuarters']);
    if (quarters) {
      return EMPLOYEES_PER_QUARTERS_LEVEL_COUNT[quarters.level];
    } else {
      return MINIMAL_EMPLOYEES_COUNT;
    }
  }  
  
  getIdleEmployeesCount() {
    const allEmployeesCount = this.getAllEmployeesCount();
    const allEmployed = this.industries.mine.employed + this.industries.farm.employed;
    return allEmployeesCount - allEmployed;
  } 
  
  getAllEdibleFoodCount() {
    return FoodService.getAllEdibleFoodAsNutritionUnits(this.inventory);
  }
  
  getFoodReserves() {
    const allEmployeesCount = this.getAllEmployeesCount();
    const demand = FOOD_DEMAND_PER_EMPLOYEE * allEmployeesCount;
    return (this.getAllEdibleFoodCount() / demand).toFixed(1);
  }
  
  getEmployedCountInIndustry(industry) {
    const relevantIndustry = this._getIndustry(industry);
    return relevantIndustry.employed;
  }
  
  getEmployableCountInIndustry(industry) {
    const indestryBuildingsMap = {
      mine: () => _.find(this.buildings, ['id', 'mine']),
      farm: () => _.find(this.buildings, ['id', 'farm']),
    };
    const building = indestryBuildingsMap[industry]();
    if (!building) {
      console.warn('No buildings for industry :', industry);
      return 0;
    }

    return EMPLOYEES_PER_BUILDING_LEVEL_COUNT[industry][building.level];
  }
  
  _getIndustry(industry) {
    const relevantIndustry = this.industries[industry];
    if (!relevantIndustry) {
      console.warn('Unknown industry :', industry);
      return null;
    } else {
      return relevantIndustry;
    }
  }
  
  addEmployeeInIndustry(industry) {
    const relevantIndustry = this._getIndustry(industry);
    const max = this.getEmployableCountInIndustry(industry);
    const available = this.getIdleEmployeesCount();
    if (relevantIndustry.employed < max) {
      if (available === 0) {
        const removalResult = this.removeEmployeeFromIndustry(OPPOSITE_INDUSTRY_MAP[industry]);
        if (removalResult) relevantIndustry.employed++;
      } else {
        relevantIndustry.employed++;
      }
    }
  }
  
  removeEmployeeFromIndustry(industry) {
    const relevantIndustry = this._getIndustry(industry);
    const available = this.getEmployedCountInIndustry(industry);
    if (available > 0) {
      relevantIndustry.employed--;
      return true;
    }
    return false;
  }
  
  getIndustryWorkProgressStepValue(industry) {
    const workers = this.getEmployedCountInIndustry(industry);
    return MINER_CONTRIBUTION_VALUE * workers;
  }
  
  getIndustryTool(industry) {
    const relevantIndustry = this._getIndustry(industry);
    return relevantIndustry.tool;
  }

}
