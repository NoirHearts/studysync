console.log('This is the background page.');
console.log('Put the background scripts here.');
import { initialData } from '../../constants';

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.storage.sync.get('initialized', ({ initialized }) => {
  if (!initialized) {
    chrome.storage.sync.set({
      ...initialData,
      initialized: true,
    });
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${JSON.stringify(
        oldValue
      )}", new value is "${JSON.stringify(newValue)}".`
    );
  }
});
