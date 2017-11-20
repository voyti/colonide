/* global _ */
import SoundManager from 'sounds/SoundManager';

const subscribers = {};

export default class EventDispatchInterface {
  
  static on(eventName, callback) {
    const existingRegistry = (subscribers[eventName] || []);
    existingRegistry.push(callback);
    subscribers[eventName] = existingRegistry;
  }
  
  static emit(eventName, data) {
    EventDispatchInterface._defaultHandle(eventName, data);
    _.forEach(subscribers[eventName], (cb) => (cb || _.noop)(data));
  }
  
  // called before event is dispatched to external subscribers
  static _defaultHandle(eventName, data) {
    console.debug('EVENT EMITED: ', eventName, data);
    
    switch (eventName) {
      case 'planet-selected':
        SoundManager.getInstance().play('ui_click');
        break;
      case 'planet-colonized':
        data.planet && data.planet.setState('colonized');
        break;
      
      default:
        // code
    }
    
  }
}
