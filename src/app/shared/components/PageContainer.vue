<template>
  <div class="page-container">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  props: {},
};
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  max-width: $max-page-width;
  margin: 0 auto;
  padding: 0 map-get($container-spacing, xl);

  &[vertical] {
    flex-direction: column;
  }
  &[center] {
    &[vertical] {
      align-items: center;
    }

    &:not([vertical]) {
      justify-content: center;
    }
  }
  &[dense] {
    flex: 0;
  }
}
</style>
