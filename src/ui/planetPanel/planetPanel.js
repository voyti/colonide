import _ from 'lodash';
import templateUrl from './planetPanel.html';
import habitableUrl from './panelPartials/habitable.html';
import nonHabitableUrl from './panelPartials/nonHabitable.html';
import colonizedUrl from './panelPartials/colonized.html';
import './planetPanel.scss';
import GameConstants from 'GameConstants';
import GameStateInterface from 'GameStateInterface';
import EventDispatchInterface from 'EventDispatchInterface';
import Player from 'mechanics/Player';
import PlanetDrawer from 'drawing/PlanetDrawer';
import SoundManager from 'sounds/SoundManager';

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
    constructor($timeout, $scope) {
      'ngInject';
      this.$timeout = $timeout;
      this.GameStateInterface = GameStateInterface.getInstance();
      this.Player = Player.getInstance();
      this.SoundManager = SoundManager.getInstance();
      this.colonizationStarted = false;
      this.debugMode = false;
      this.isOpening = false;
      this.isClosing = false;
      this.allBackgrounds = PlanetDrawer.getAllBackgrounds();
      
      this.habitableUrl = habitableUrl;
      this.nonHabitableUrl = nonHabitableUrl;
      this.colonizedUrl = colonizedUrl;
      
      $scope.$on('planet-selected', () => {
        this.isOpening = true;
        this.isClosing = false;
      });
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
      this.SoundManager.play('ui_click');
    }
    
    getPlanetClass() {
      return _.kebabCase(_.get(this.planet, 'type'));
    }
    
    getSideAlign() {
      if (this.planet) {
        return this.planet.x > GameConstants.WIDTH / 2 ? 'align-left' : 'align-right';
      }
    }
    
    onColonizationClick() {
      if (!this.isPlanetColonizable()) {
        this.SoundManager.play('ui_click_disabled');
      } else {
        this.SoundManager.play('ui_click');
        this.beginColonization();
      }
    }
    
    isPlanetColonizable() {
      return this.planet && this.planet.checkState('uncolonized') 
      && this.planet.isHabitable
      && this.Player.isPlayerEligibleToColonize();
    }
    
    isPlanetColonized() {
      return this.planet && this.planet.checkState('colonized');
    }
    
    onExtractionClick() {
      if (!this.isPlanetExtractable()) {
        this.SoundManager.play('ui_click_disabled');
      }
    }
    
    isPlanetExtractable() {
      return this.Player.isPlayerEligibleToExtract();
    }  
    
    isPlanetScanable() {
      return this.Player.isPlayerEligibleToScan();
    }
    
    onScanClick() {
      if (!this.isPlanetScanable()) {
        this.SoundManager.play('ui_click_disabled');
      }
    }

    checkGameState(stateChecked) {
      return this.GameStateInterface.checkState(stateChecked);
    }
    
    beginColonization() {
      EventDispatchInterface.emit('planet-colonization-started', { planet: this.planet });
      this.SoundManager.play('colonize_progress');
      this.colonizationStarted = true;
      
      this.$timeout(() => {
        if (this.checkGameState('initial')) {
          this.GameStateInterface.setState('regular');
        }
        EventDispatchInterface.emit('planet-colonized', { planet: this.planet });
        this.colonizationStarted = false;
      }, 5000);
    }
  }