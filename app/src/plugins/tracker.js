const sendEvent = (data) => {
  const url = 'https://localhost:3000/api/events';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export default {
  install(Vue, options) {
    if (!options.APP_ID) {
      throw new Error('Please provide the APP_ID');
    }
    const configData = {
      APP_ID: options.APP_ID,
      service: options.service || 'frontend',
      // id visitor, uniq and generated fingerprintjs
      // id session d'analitycs timestamp
      // api endpoint
    };
    const eventListeners = {};
    console.log('configData', configData);
    Vue.directive('track', {
      mounted(el, binding) {
        eventListeners[binding.arg] = () => {
          sendEvent({
            ...configData,
            event: binding.modifiers,
            tag: binding.arg,
            modifier: binding.modifiers,
          });
          console.log('binding', binding);
        };
        for (const modifier in binding.modifiers) {
          el.addEventListener(modifier, eventListeners[binding.arg]);
        }
        // el.addEventListener('click', eventListeners[binding.arg]);
      },
      unmounted(el, binding) {
        for (const modifier in binding.modifiers) {
          el.removeEventListener(modifier, eventListeners[binding.arg]);
        }
        delete eventListeners[binding.arg];
        // el.removeEventListener('click', eventListeners[binding.arg]);
      },
    });
  },
};

export { sendEvent };