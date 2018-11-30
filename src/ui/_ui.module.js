/* global angular */
import RootPanel from './rootPanel/rootPanel';
import PlanetPanel from './planetPanel/planetPanel';
import TopBar from './topBar/topBar';
import PlanetActionsPanel from './planetActionsPanel/planetActionsPanel';
import EventRibbon from './eventRibbon/eventRibbon';
import PlanetManager from './planetManager/planetManager';
import IndustryPanel from './planetManager/industryPanel/industryPanel';
import ItemDetailsTooltip from './planetManager/itemDetailsTooltip/itemDetailsTooltip';
import ItemIcon from './planetManager/itemIcon/itemIcon';

export default angular
  .module('colonideUI.ui', [])
  .component('rootPanel', new RootPanel())
  .component('planetPanel', new PlanetPanel())
  .component('topBar', new TopBar())
  .component('planetActionsPanel', new PlanetActionsPanel())
  .component('eventRibbon', new EventRibbon())
  .component('planetManager', new PlanetManager())
  .component('industryPanel', new IndustryPanel())
  .component('itemDetailsTooltip', new ItemDetailsTooltip())
  .component('itemIcon', new ItemIcon())

  .name;