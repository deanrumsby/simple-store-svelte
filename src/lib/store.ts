function writable<T>(initialState: T) {

  type SubscriptionCallback = (state: T) => void;
  type Updater = (prevState: T) => T;

  let state = initialState;
  let subscribers: SubscriptionCallback[] = [];
  
  function get() {
    return state;
  }

  function set(newState: T) {
    state = newState;
    notifySubscribers();
  }

  function update(updater: Updater) {
    state = updater(state);
    notifySubscribers();
  }
  
  function subscribe(callback: SubscriptionCallback) {
    callback(state);
    subscribers.push(callback);
    return unsubscriber(callback);
  }

  function unsubscriber(callback: SubscriptionCallback) {
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    }
  }

  function notifySubscribers() {
    subscribers.forEach((callback) => callback(state));
  }

  return { get, set, update, subscribe }
}

export { writable };