import _ from 'lodash';
import './eventRibbon.scss';
import templateUrl from './eventRibbon.html';
import SoundManager from 'sounds/SoundManager';
import LoadingManager from 'loader/LoadingManager';

export default class EventRibbon {
    constructor() {
      'ngInject';
      this.controllerAs = 'ribbon';
      this.templateUrl = templateUrl;
      this.controller = EventRibbonController;
      this.bindings = {
        eventData: '<',
      };
    }
}

class EventRibbonController {
    constructor($timeout, $scope) {
      'ngInject';
      this.$timeout = $timeout;
      this.SoundManager = SoundManager.getInstance();
    }
    
    $onChanges(changes) {
      if (changes.eventData.currentValue) {
        this.planet = this.eventData.planet;
        this.planetUrl = LoadingManager.getPlanetImageUrl(this.planet.drawingData.theme.name);
        this.SoundManager.play('colonize_done');
        this.isDuringAnimation = true;
        this.$timeout(() => (this.isDuringAnimation = false), 5000);
      }
    }
  }