import { isTouchScreen } from "@/utils/validator";
import { css, pixel } from "@/utils/common.ts";

const CACHED_PROPERTY = "__ripple__";

const RippleConfig = {
  color: "dark",
  radius: null,
  centered: false,
  boundary: false,
  duration: 450,
};

let previousElementStyles = {};

function getTriggerEvents() {
  const _triggerEvents = new Map();

  if (isTouchScreen()) {
    _triggerEvents.set("touchstart", showRipple);
  } else {
    _triggerEvents.set("mousedown", showRipple);
  }

  return _triggerEvents;
}

function setupTriggerEvents(el: HTMLElement) {
  const triggerEvents = getTriggerEvents();

  triggerEvents.forEach((fn, type) => {
    el.addEventListener(type, fn, { passive: true, useCapture: true });
  });
}

function removeTriggerEvents(el) {
  const triggerEvents = getTriggerEvents();

  triggerEvents.forEach((fn, event) => {
    el.removeEventListener(event, fn, { passive: true, useCapture: true });
  });
}

function showRipple(event: Event) {
  const { el, config, offsetX, offsetY, diameter, radius } = processTriggerEvent(event);

  const ripple = document.createElement("div");

  css(ripple, {
    position: `absolute`,
    left: pixel(offsetX - radius),
    top: pixel(offsetY - radius),
    height: pixel(diameter),
    width: pixel(diameter),
    borderRadius: `100%`,
    opacity: 0,
    pointerEvents: `none`,
    transform: `scale3d(.2,.2,1)`,
    transition: `transform, opacity 0 cubic-bezier(0.4, 0, 0.2, 1)`,
  });

  ripple.classList.add("base-ripple", `bgcolor--${config.color}`);

  el.appendChild(ripple);

  el[CACHED_PROPERTY].activeRipples.add(ripple);

  // By default the browser does not recalculate the styles of dynamically created
  // ripple elements. This is critical because then the `scale` would not animate properly.
  enforceStyleRecalculation(ripple);

  previousElementStyles = {};

  if (config.boundary) {
    const { position, overflow } = getComputedStyle(el);

    previousElementStyles = { position, overflow };

    css(el, {
      overflow: "hidden",
    });
  }

  css(ripple, {
    transitionDuration: `${config.duration}ms`,
    transform: `scale3d(1,1,1)`,
    opacity: 0.25,
  });

  setTimeout(() => {
    hideRipple(ripple);
  }, config.duration);
}

function hideRipple(ripple) {
  const el = ripple.parentNode;

  const wasActive = el[CACHED_PROPERTY].activeRipples.delete(ripple);

  const exitDuration = 250;

  // For ripples that are not active anymore, don't re-run the animate-out animation
  if (!wasActive) {
    return;
  }

  css(ripple, {
    transitionDuration: `${exitDuration}ms`,
    opacity: 0,
  });

  setTimeout(() => {
    el.removeChild(ripple);
    css(el, previousElementStyles);
  }, exitDuration);
}

function processTriggerEvent(event: MouseEvent) {
  const el = <Record<string, any>>event.currentTarget;

  const { config, activeRipples } = el[CACHED_PROPERTY];

  const containerRect = el.getBoundingClientRect();

  let x = event.clientX;

  let y = event.clientY;

  if (config.centered) {
    x = containerRect.left + containerRect.width / 2;
    y = containerRect.top + containerRect.height / 2;
  }

  const offsetX = x - containerRect.left;

  const offsetY = y - containerRect.top;

  const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);

  const diameter = radius * 2;

  return { el, config, activeRipples, containerRect, x, y, offsetX, offsetY, radius, diameter };
}

/**
 * Enforces a style recalculation of a DOM element by computing it's styles.
 */
function enforceStyleRecalculation(element: HTMLElement) {
  // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
  // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
  window.getComputedStyle(element).getPropertyValue("opacity");
}

/**
 * Returns the distance from the point (x, y) to the furthest corner of the rectangle.
 */
function distanceToFurthestCorner(x, y, rect) {
  const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.sqrt(distX * distX + distY * distY);
}

export default {
  bind(el: Record<string, any>, { value = {} }) {
    el[CACHED_PROPERTY] = {
      activeRipples: new Set(),
      config: {
        ...RippleConfig,
        ...value,
      },
    };

    setupTriggerEvents(el);
  },
  unbind(el: HTMLElement) {
    removeTriggerEvents(el);
  },
};
