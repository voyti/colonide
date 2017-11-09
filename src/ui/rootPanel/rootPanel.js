import './rootPanel.scss';
import templateUrl from './rootPanel.html';
import EventDispatchInterface from 'EventDispatchInterface';
import GameConstants from 'GameConstants';

export default class RootPanel {
    constructor() {
      'ngInject';
      this.controllerAs = 'rootPanel';
      this.templateUrl = templateUrl;
      this.controller = RootPanelController;
      // this.bindings = {
      // };

    }
}

class RootPanelController {
    constructor($rootScope) {
      'ngInject';
      this.$rootScope = $rootScope;
      
      this.height = `${GameConstants.HEIGHT}px`;
      this.width = `${GameConstants.WIDTH}px`;
      
      EventDispatchInterface.on('planet-selected', (planetData) => {
        this.selectedPlanet = planetData;
        console.log(planetData);
        this.onExternalDataUpdate();
      });
    }
    
    onExternalDataUpdate() {
      this.$rootScope.$apply();
    }
  }