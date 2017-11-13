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

// only component listening to global events and passing the data to underlaying components
// thus interfacing 
class RootPanelController {
    constructor($rootScope) {
      'ngInject';
      this.$rootScope = $rootScope;
      
      this.height = `${GameConstants.HEIGHT}px`;
      this.width = `${GameConstants.WIDTH}px`;
      
      EventDispatchInterface.on('planet-selected', ({ planet }) => {
        this.selectedPlanet = planet;
        this.onExternalDataUpdate();
      });      
      
      EventDispatchInterface.on('planet-colonized', ({ planet }) => {
        this.selectedPlanet = planet;
        this.onExternalDataUpdate();
      });
    }
    
    onExternalDataUpdate() {
      this.$rootScope.$apply();
    }
  }