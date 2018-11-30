import _ from 'lodash';
import templateUrl from './itemDetailsTooltip.html';
import './itemDetailsTooltip.scss';
// import SoundManager from 'sounds/SoundManager';
// import GameStateInterface from 'GameStateInterface';
import GameConstants from 'GameConstants';

const PANEL_WIDTH = 300;
const PANEL_HEIGHT = 350;

export default class ItemDetailsTooltip {
    constructor() {
      'ngInject';
      this.controllerAs = 'tooltip';
      this.templateUrl = templateUrl;
      this.controller = ItemDetailsTooltipController;
      this.bindings = {
        item: '<',
        iconElement: '<',
      };
    }
}

class ItemDetailsTooltipController {
    constructor($document, $rootScope, $timeout) {
      'ngInject';
      this.$document = $document;
      this.$rootScope = $rootScope;
      this.$timeout = $timeout;
    }
    
    $onInit() {
      this.$rootScope.$on('item-hover-in', (event, element, item) => {
        if (this.closeTimer) this.$timeout.cancel(this.closeTimer);
        this.referenceElement = element;
        this.item = item;
        this.setRect();
      });
      
      this.$rootScope.$on('item-hover-out', () => {
        this.closeTimer = this.$timeout(() => {
          this.referenceElement = null;
          this.item = null;
        }, 200);
      });
    }
    
    setRect() {
      if (this.referenceElement) {
        const referenceElementRect = this.referenceElement[0].getBoundingClientRect();
        if (this.$document[0].body.contains(this.referenceElement[0])) {
          const blockElement = this.referenceElement[0].querySelector('div');
          const top = referenceElementRect.top + window.scrollY - (blockElement.offsetHeight / 2);
          const left = referenceElementRect.left + window.scrollX - PANEL_WIDTH;

          const boundedTop = ((top + PANEL_HEIGHT) - GameConstants.HEIGHT > 0) ? GameConstants.HEIGHT - PANEL_HEIGHT : top;
          const boundedLeft = ((left + PANEL_WIDTH) - GameConstants.TOTAL_WIDTH > 0) ? GameConstants.TOTAL_WIDTH - PANEL_WIDTH : left;
          
          this.referenceRect = { 
            topPosition: `${boundedTop}px`,
            leftPosition: `${boundedLeft}px`,
          };
        }
      }
    }
  }