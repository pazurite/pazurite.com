const CACHED_PROPERTY = '__documentReady__';

export default {
  bind(el, { value: fn }) {
    const isFunction = typeof fn === 'function';

    if (!isFunction) {
      throw new Error('v-document-ready: Binding value must be a function');
    }

    // Define handler and cache it on the element
    const handler = event => fn(event);

    window.addEventListener('load', handler);

    el[CACHED_PROPERTY] = {
      handler
    };
  },
  unbind(el) {
    const { handler } = el[CACHED_PROPERTY];

    window.removeEventListener('load', handler);

    delete el[CACHED_PROPERTY];
  }
};
