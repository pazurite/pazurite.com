<template>
  <button v-ripple="{ color: 'white' }" v-on="on" class="base-button">
    <base-typography variant="paragraph" font-weight="medium" class="base-button__text">
      <slot />
    </base-typography>
  </button>
</template>

<script lang="ts">
import ripple from "@/directives/ripple";
import _debounce from "lodash/debounce";

export default {
  directives: {
    ripple,
  },

  computed: {
    on() {
      return {
        ...this.$listeners,
        click: _debounce(this.handleClickEvent, 100),
      };
    },
  },
  methods: {
    handleClickEvent(e) {
      if (this.isDisabled) return;

      if (this.to) this.$router.push(this.to, () => {});

      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-button {
  position: relative;

  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;

  width: fit-content;
  height: fit-content;
  min-width: 115px;

  padding: 10px 20px;

  border: 1px solid transparent;
  background-color: color(red);
  border-radius: 28px;
  box-shadow: 0 10px 10px -8px rgba(0, 0, 0, 0.3);
  outline: none;
  overflow: hidden;
  pointer-events: all;
  cursor: pointer;
  z-index: map-get($z-layers, content);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: color(white);
    border-radius: inherit;
    color: inherit;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  }

  &:hover:before {
    opacity: 0.08;
  }
}
</style>
