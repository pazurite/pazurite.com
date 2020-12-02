export const isTouchScreen = () =>
  !!(
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      (window.DocumentTouch &&
        typeof document !== "undefined" &&
        document instanceof window.DocumentTouch))
  ) ||
  !!(typeof navigator !== "undefined" && (navigator.maxTouchPoints || navigator.msMaxTouchPoints));

//Returns true if it is a DOM element
export const isElement = (o) => {
  return typeof HTMLElement === "object"
    ? o instanceof HTMLElement //DOM2
    : o &&
        typeof o === "object" &&
        o !== null &&
        o.nodeType === Node.ELEMENT_NODE &&
        typeof o.nodeName === "string";
};
