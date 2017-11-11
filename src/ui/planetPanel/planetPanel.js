import templateUrl from './planetPanel.html';
import './planetPanel.scss';
import GameConstants from 'GameConstants';
import GameStateInterface from 'GameStateInterface';

export default class PlanetPanel {
    constructor() {
      'ngInject';
      this.controllerAs = 'planetPanel';
      this.templateUrl = templateUrl;
      this.controller = PlanetPanelController;
      this.bindings = {
        planetData: '<',
      };
    }
}

class PlanetPanelController {
    constructor() {
      'ngInject';
    }
    
    getPlanetClass() {
      return _.kebabCase(_.get(this.planetData, 'type'));
    }
    
    getSideAlign() {
      if (this.planetData) {
        return this.planetData.x > GameConstants.WIDTH / 2 ? 'align-left' : 'align-right';
      }
    }
    
    // TODO: add icon to colonize button
    isPlanetColonizable() {
      return planetPanel.planetData.state === 'uncolonized' 
      && planetPanel.planetData.isHabitable
      && GameStateInterface.getInstance().getState() === 'initial';
    }
  }