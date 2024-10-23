// networkStatus.js
export const isOnline = () => window.navigator.onLine;

// Add event listeners for connectivity changes
export const addNetworkListeners = (onOnline, onOffline) => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
};
