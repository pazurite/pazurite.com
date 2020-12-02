import { pixel } from "@/utils/common.ts";

// Key which we use to store directive object on element
export const ASPECT_RATIO_CACHED_PROPERTY = "__aspectRatio__";

export default {
  bind(el: HTMLElement, { value }) {
    const pattern = /^\d+:\d+$/;

    if (!value) return;

    if (typeof value !== "string") {
      throw new Error(
        `Expected directive binding value type to be a string but found a ${typeof value} instead`
      );
    }

    if (!pattern.test(value)) {
      throw new Error(
        `Expected directive value to match pattern "[Integer]:[Integer]" but got a ${value}`
      );
    }

    // Define handler and cache it on the element
    const handler = computeDimension.bind(null, el, value);

    window.addEventListener("resize", handler);

    el[ASPECT_RATIO_CACHED_PROPERTY] = {
      handler,
    };
  },

  inserted(el: HTMLElement, { value }) {
    if (!value) return;

    computeDimension(el, value);
  },

  unbind(el: HTMLElement, { value }) {
    if (!value) return;

    const { handler } = el[ASPECT_RATIO_CACHED_PROPERTY];

    window.removeEventListener("resize", handler);

    delete el[ASPECT_RATIO_CACHED_PROPERTY];
  },
};

function computeDimension(el: HTMLElement, value) {
  if (!el) return;

  const [aspectWidth = 0, aspectHeight = 0] = value.split(":");

  const aspectRatio = (aspectHeight / aspectWidth) * 100;

  const { width: computedWidth = 0 } = el.getBoundingClientRect();

  const containerHeight = (computedWidth * aspectRatio) / 100;

  el.style.height = <string>pixel(containerHeight);
  el.style.maxHeight = <string>pixel(containerHeight);
}
