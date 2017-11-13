import RootPanel from './rootPanel/rootPanel';
import PlanetPanel from './planetPanel/planetPanel';
import TopBar from './topBar/topBar';
import PlanetActionsPanel from './planetActionsPanel/planetActionsPanel';

export default angular
  .module('colonideUI.ui', [])
  .component('rootPanel', new RootPanel())
  .component('planetPanel', new PlanetPanel())
  .component('topBar', new TopBar())
  .component('planetActionsPanel', new PlanetActionsPanel())
  .name;