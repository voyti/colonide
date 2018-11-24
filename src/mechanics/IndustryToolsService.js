/* global _ */

import GameConstants from 'GameConstants';


const EMPTY_TOOL = {
  name: 'None',
  id: 'none',
  quality: 'none',
  iconSrc: '/resources/icons/empty_icon.svg',
};

export default class IndustryToolsService {
  
  static getDefaultIndustryTool() {
    return EMPTY_TOOL;
  }
}
