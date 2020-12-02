import { isElement } from "@/utils/validator";

export const isDevelopment = () => {
  return process.env.NODE_ENV === "development";
};

export const css = (element: HTMLElement, css: object) => {
  if (!isElement(element)) return;

  Object.entries(css).forEach(([prop, value]) => {
    element.style[prop] = value;
  });
};

export const pixel = (v: number) => (!isNaN(v) ? v + "px" : v || "");
