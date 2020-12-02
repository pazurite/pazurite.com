<template>
  <component :is="component" v-bind="internalProps" v-on="$listeners">
    <slot>
      {{ value }}
    </slot>
  </component>
</template>

<script>
import enumProps from '@/utils/enumProps';

import excludeProps from '@/utils/excludeProps.ts';

export default {
  props: {
    variant: { type: String, default: 'paragraph' },
    component: excludeProps(['router-link'], 'div'),
    name: { type: String, default: '' },
    color: { type: String, default: 'white' },
    bgcolor: { type: String, default: 'transparent' },
    borderColor: { type: String, default: 'transparent' },
    fontWeight: { type: String, default: 'regular' },
    opacity: { type: Number, default: null },
    alignment: enumProps(['left', 'center', 'right']),
    whiteSpace: enumProps(
      ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'initial', 'inherit'],
      'normal'
    ),
    wordBreak: enumProps(
      ['normal', 'break-all', 'keep-all', 'break-word', 'initial', 'inherit'],
      'normal'
    ),
    lineHeight: { type: [String, Number], default: '' },
    letterSpacing: { type: [String, Number], default: '' },
    value: { type: [String, Number], default: '' },
    lines: { type: [String, Number], default: '' },
    disabled: Boolean,
    clickable: Boolean,
    ellipsis: Boolean,
    uppercase: Boolean,
    flex: Boolean,
    block: Boolean,
    underline: Boolean,
  },
  computed: {
    internalProps() {
      return {
        class: {
          'base-typography': true,
          [`color--${this.color}`]: true,
          [`bgcolor--${this.bgcolor}`]: true,
          [`border-color--${this.borderColor}`]: true,
          [`fs--${this.variant}`]: true,
          [`font-weight--${this.fontWeight}`]: true,
          [`white-space--${this.whiteSpace}`]: true,
          [`word-break--${this.wordBreak}`]: true,
          [`alignment--${this.alignment}`]: true,
          ellipsis: !!this.ellipsis,
          uppercase: !!this.uppercase,
          disabled: !!this.disabled,
          clickable: !!this.clickable,
          flex: !!this.flex,
          block: !!this.block,
          underline: !!this.underline,
        },
        style: {
          opacity: this.opacity,
          lineHeight: this.lineHeight,
          letterSpacing: this.letterSpacing,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.base-typography {
  transition: 200ms $ease-in-quad;
  text-decoration: none;
  text-transform: none;
  position: relative;
  z-index: map-get($z-layers, text);
  &.disabled {
    cursor: not-allowed;
  }
}
</style>
