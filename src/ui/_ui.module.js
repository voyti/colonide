import RootPanel from './rootPanel/rootPanel';
import PlanetPanel from './planetPanel/planetPanel';
import TopBar from './topBar/topBar';

export default angular
  .module('colonideUI.ui', [])
  .component('rootPanel', new RootPanel())
  .component('planetPanel', new PlanetPanel())
  .component('topBar', new TopBar())
  .name;