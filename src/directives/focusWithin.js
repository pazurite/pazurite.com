import { isTouchScreen } from '@/utils/validator';

const CACHED_PROPERTY = '__focusWithin__';

export default {
  inserted(el, { value: fn }) {
    const isFunction = typeof fn === 'function';
    const event = isTouchScreen() ? 'touchstart' : 'click';

    if (!isFunction) {
      throw new Error('v-focus-within: Binding value must be a function');
    }

    // Define handler and cache it on the element
    const handler = event => {
      const path = event.path || (event.composedPath && event.composedPath());

      // Note: composedPath is not supported on IE and Edge so we use el.contains for those browsers

      if (path.indexOf(el) >= 0 || el.contains(event.target)) fn(event);
    };

    document.addEventListener(event, handler);

    el[CACHED_PROPERTY] = {
      event,
      handler
    };
  },
  unbind(el) {
    const { event, handler } = el[CACHED_PROPERTY];

    document.removeEventListener(event, handler);

    delete el[CACHED_PROPERTY];
  }
};
