const CACHED_PROPERTY = '__resizeSensor__';

export default {
  inserted(el, { value: fn }) {
    const isFunction = typeof fn === 'function';

    if (!isFunction) {
      throw new Error('v-resize-sensor: Binding value must be a function');
    }

    // Define handler and cache it on the element
    const handler = event => fn(event);

    window.addEventListener('resize', handler);

    el[CACHED_PROPERTY] = {
      handler
    };
  },
  unbind(el) {
    const { handler } = el[CACHED_PROPERTY];

    window.removeEventListener('resize', handler);

    delete el[CACHED_PROPERTY];
  }
};
