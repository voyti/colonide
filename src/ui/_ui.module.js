import RootPanel from './rootPanel/rootPanel';
import PlanetPanel from './planetPanel/planetPanel';

export default angular
  .module('colonideUI.ui', [])
  .component('rootPanel', new RootPanel())
  .component('planetPanel', new PlanetPanel())
  .name;