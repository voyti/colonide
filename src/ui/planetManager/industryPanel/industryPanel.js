import _ from 'lodash';
import templateUrl from './industryPanel.html';
import './industryPanel.scss';
import SoundManager from 'sounds/SoundManager';
import GameStateInterface from 'GameStateInterface';

const MAX_PROGRESS = 100;
const INDUSTRY_CLICK_TIMEOUT = 1000;
const INDUSTRY_CLICK_CONTRIBUTION = 2;

export default class IndustryPanel {
    constructor() {
      'ngInject';
      this.controllerAs = 'panel';
      this.templateUrl = templateUrl;
      this.controller = IndustryPanelController;
      this.bindings = {
        planet: '<',
        type: '@',
      };
    }
}

class IndustryPanelController {
    constructor($timeout, $scope, $interval) {
      'ngInject';
      this.$timeout = $timeout;
      this.$interval = $interval;
      this.GameStateInterface = GameStateInterface.getInstance();
      this.SoundManager = SoundManager.getInstance();
      this.lastTotalDays = 0;
      this.mineProgress = 0;
      this.farmProgress = 0;
      this.maxProgress = MAX_PROGRESS;
      // TODO OPTIMIZE
      this.$interval(() => {
        if (this.GameStateInterface.isInitialized()) {
          this.onDateCheck(this.GameStateInterface.getGameTimeElapsedDetails());
        }
      }, 500);
    }
    
    addEmployeeInIndustry(industry) {
      this.SoundManager.play('ui_click');
      this.planet.addEmployeeInIndustry(industry);
    }
    
    applyMinePlayerWork() {
      if (this.isMineLocked) return null;

      this.SoundManager.play('mine_action');
      this.isMineLocked = true;
      this.$timeout(() => (this.isMineLocked = false), INDUSTRY_CLICK_TIMEOUT);
      this.mineProgress = this.applyIndustryProgress('mine', this.mineProgress, INDUSTRY_CLICK_CONTRIBUTION);
    }
    
    applyFarmPlayerWork() {
      if (this.isFarmLocked) return null;
      
      this.SoundManager.play('farm_action');
      this.isFarmLocked = true;
      this.$timeout(() => (this.isFarmLocked = false), INDUSTRY_CLICK_TIMEOUT);
      this.farmProgress = this.applyIndustryProgress('farm', this.farmProgress, INDUSTRY_CLICK_CONTRIBUTION);
    }
    
    onDateCheck(gameTimeElapsedDetails) {

      if (gameTimeElapsedDetails.totalDaysElapsed > this.lastTotalDays) {
        this.lastTotalDays = gameTimeElapsedDetails.totalDaysElapsed;
        this.mineProgress = this.applyIndustryWork('mine', this.mineProgress);
        this.farmProgress = this.applyIndustryWork('farm', this.farmProgress);
      }
    }
    
    applyIndustryWork(industry, industryProgress) {
      const additionalWorkProgress = this.planet.getIndustryWorkProgressStepValue(industry);
      return this.applyIndustryProgress(industry, industryProgress, additionalWorkProgress);
    }
    
    applyIndustryProgress(industry, industryProgress, additionalProgress) {
      const cachedMineProgress = industryProgress + additionalProgress;
      
      if (cachedMineProgress > MAX_PROGRESS) {
        industryProgress = cachedMineProgress - MAX_PROGRESS;
        this.onIndustryProgressFinished(industry);
      } else {
        industryProgress = cachedMineProgress;
      }
      return industryProgress;
    }
    
    onIndustryProgressFinished(industry) {
      console.warn('GET RESOURCES FROM ', industry);
    }
    
    getToolInfo(industry) {
      return this.planet.getIndustryTool(industry);
    }
  }