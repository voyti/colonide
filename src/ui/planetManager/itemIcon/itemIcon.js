import templateUrl from './itemIcon.html';
import './itemIcon.scss';
// import SoundManager from 'sounds/SoundManager';
// import GameStateInterface from 'GameStateInterface';

export default class ItemIcon {
    constructor() {
      'ngInject';
      this.controllerAs = 'icon';
      this.templateUrl = templateUrl;
      this.controller = ItemIconController;
      this.bindings = {
        item: '<',
        noBackground: '<',
        configuration: '@',
        upgradeOrBuildCallback: '&',
      };
    }
}

class ItemIconController {
    constructor($rootScope, $element) {
      'ngInject';
      this.itemHover = null;
      this.$element = $element;
      this.$rootScope = $rootScope;
    }
    
    $onChanges() {
      this.bottomLeftLabel = this.isBuildingConfig() ?
        this.item.name : this.item.amount;
      this.topRightLabel = this.isBuildingConfig() ? this.formatBuildingLevel(this.item) : '';
    }
    
    isBuildingConfig() {
      return this.configuration === 'building';
    }
    
    formatBuildingLevel(building) {
      return building.getBuildingLevelInRoman && building.getBuildingLevelInRoman(building);
    }
    
    setHover(isHover) {
      const event = isHover ? 'item-hover-in' : 'item-hover-out';
      this.$rootScope.$emit(event, this.$element, this.item);
    }
    
    upgradeOrBuild(item) {
      this.upgradeOrBuildCallback({ item }); 
    }
  }