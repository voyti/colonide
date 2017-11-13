import templateUrl from './planetPanel.html';
import './planetPanel.scss';
import GameConstants from 'GameConstants';
import GameStateInterface from 'GameStateInterface';
import EventDispatchInterface from 'EventDispatchInterface';
import Player from 'mechanics/Player';

export default class PlanetPanel {
    constructor() {
      'ngInject';
      this.controllerAs = 'planetPanel';
      this.templateUrl = templateUrl;
      this.controller = PlanetPanelController;
      this.bindings = {
        planet: '<',
      };
    }
}

class PlanetPanelController {
    constructor($timeout) {
      'ngInject';
      this.$timeout = $timeout;
      this.GameStateInterface = GameStateInterface.getInstance();
      this.Player = Player.getInstance();
      this.colonizationStarted = false;
      this.debugMode = false;
      this.isOpening = false;
      this.isClosing = false;
    }
    
    $onChanges(changes) {
      console.warn(changes);
      // if a planet is selected first time or different planet is selected
      if (changes.planet && 
        (!changes.planet.previousValue ||
        _.get(changes.planet, 'previousValue.name') !== _.get(changes.planet, 'currentValue.name'))) {
        this.isOpening = true;
        this.isClosing = false;
      }
    }
    
    getPanelState() {
      if (this.isOpening) {
        return 'opening';
      } else if (this.isClosing) {
        return 'closing';
      }
    }
    
    closePanel() {
      this.isOpening = false;
      this.isClosing = true;
    }
    
    getPlanetClass() {
      return _.kebabCase(_.get(this.planet, 'type'));
    }
    
    getSideAlign() {
      if (this.planet) {
        return this.planet.x > GameConstants.WIDTH / 2 ? 'align-left' : 'align-right';
      }
    }
    
    isPlanetColonizable() {
      return this.planet.checkState('uncolonized') 
      && this.planet.isHabitable
      && this.Player.isPlayerEligibleToColonize();
    }
    
    isPlanetColonized() {
      return this.planet.checkState('colonized');
    }
    
    isPlanetExtractable() {
      return this.Player.isPlayerEligibleToExtract();
    }

    checkGameState(stateChecked) {
      return this.GameStateInterface.checkState(stateChecked);
    }
    
    beginColonization() {
      EventDispatchInterface.emit('planet-colonization-started', { planet: this.planet });
      this.colonizationStarted = true;
      
      this.$timeout(() => {
        if (this.checkGameState('initial')) {
          this.GameStateInterface.setState('regular');
        }
        EventDispatchInterface.emit('planet-colonized', { planet: this.planet });
      }, 5000);
    }
  }