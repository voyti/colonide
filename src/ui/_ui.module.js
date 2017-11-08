import PlanetPanel from './planetPanel/planetPanel';

export default angular
  .module('colonideUI.ui', [])
  .component('planetPanel', PlanetPanel)
  .name;
  
console.warn(PlanetPanel);