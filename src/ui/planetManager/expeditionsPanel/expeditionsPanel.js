import _ from 'lodash';
import templateUrl from './expeditionsPanel.html';
import './expeditionsPanel.scss';
import SoundManager from 'sounds/SoundManager';
import GameStateInterface from 'GameStateInterface';

export default class expeditionsPanel {
    constructor() {
      'ngInject';
      this.controllerAs = 'panel';
      this.templateUrl = templateUrl;
      this.controller = expeditionsPanelController;
      this.bindings = {
        planet: '<',
        type: '@',
        gameTime: '<',
      };
    }
}

class expeditionsPanelController {
    constructor($timeout, $scope, $interval, $rootScope) {
      'ngInject';
    }
    
  }
