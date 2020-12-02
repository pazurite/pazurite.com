const CACHED_PROPERTY = '__clamp__';

export default {
  bind(el, { value: maxLines }) {
    if (isNaN(+maxLines)) {
      throw new Error('v-clamp: Binding value must be a string or number');
    }
  },
  inserted(el, { value: maxLines }, vnode) {
    if (maxLines) {
      vnode.context.$on('hook:mounted', async () => {
        await vnode.context.$nextTick();

        const { textEl, originalText } = init(el);

        const ellipsis = '...';

        el[CACHED_PROPERTY] = { originalText, textEl, ellipsis };

        applyChange(vnode.context.$el, maxLines);
      });
    }
  },
  async update(el, { value: maxLines }, vnode) {
    if (maxLines) {
      await vnode.context.$nextTick();

      applyChange(vnode.context.$el, maxLines);
    }
  },
  unbind(el) {
    delete el[CACHED_PROPERTY];
  }
};

const applyChange = (el, maxLines) => {
  const { originalText, textEl, ellipsis } = el[CACHED_PROPERTY];

  const lines = getLines(el, textEl);

  let offset = originalText.length;

  if (+lines > maxLines) {
    offset = Math.floor(originalText.length / +lines) * maxLines - ellipsis.length;

    textEl.textContent = clampAt(originalText, offset) + ellipsis;
  }
};

const init = el => {
  if (!el) return '';

  let textEl = getTextElement(el);

  return {
    textEl,
    originalText: textEl.cloneNode(true).wholeText
  };
};

const getLines = (el, textEl) => {
  /*
   * <span> element will have multiple ClientRects when they are wrapped into multiple lines. We can leverage this behavior to get the number of lines in the given text
   **/
  const spanEl = document.createElement('span');

  let lines;

  spanEl.appendChild(textEl);

  el.appendChild(spanEl);

  lines = spanEl.getClientRects().length;

  el.appendChild(textEl);

  spanEl.remove();

  return lines;
};

// Look for the first non-empty text node
const getTextElement = el => {
  let textEl;
  [...el.childNodes].forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      textEl = node;
    }
  });

  return textEl;
};

const clampAt = (text, offset) => {
  return text.slice(0, offset).trim();
};
