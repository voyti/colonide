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
      const ARABIC_TO_ROMAN = {
        1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X',
      };
      
      if (building.maxLevel > 1) {
        return ARABIC_TO_ROMAN[building.level];
      }
      return '';
    }
    
    setHover(isHover) {
      const event = isHover ? 'item-hover-in' : 'item-hover-out';
      this.$rootScope.$emit(event, this.$element, this.item);
    }
  }