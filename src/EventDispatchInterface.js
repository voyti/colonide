const subscribers = {};

export default class EventDispatchInterface {
  
  static on(eventName, callback) {
    const existingRegistry = (subscribers[eventName] || []);
    existingRegistry.push(callback);
    subscribers[eventName] = existingRegistry;
  }
  
  static emit(eventName, data) {
    _.forEach(subscribers[eventName], (cb) => (cb || _noop)(data));
  }
}
