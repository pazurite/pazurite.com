import { isTouchScreen } from '@/utils/validator';

const CACHED_PROPERTY = '__clickOutside__';

export default {
  bind(el, { value: fn }) {
    const isFunction = typeof fn === 'function';
    const isObject = typeof fn === 'object';
    const event = isTouchScreen() ? 'touchstart' : 'click';

    if (!isFunction && !isObject) {
      throw new Error('v-click-outside: Binding value must be a function or object');
    }

    // Define handler and cache it on the element
    const handler = event => {
      const path = event.path || (event.composedPath && event.composedPath());

      // Note: composedPath is not supported on IE and Edge so we use el.contains for those browsers

      if (path.indexOf(el) >= 0 || el.contains(event.target)) return;

      fn(event);
    };

    document.addEventListener(event, handler, true);

    el[CACHED_PROPERTY] = {
      event,
      handler
    };
  },
  unbind(el) {
    const { event, handler } = el[CACHED_PROPERTY];

    document.removeEventListener(event, handler, true);

    delete el[CACHED_PROPERTY];
  }
};
