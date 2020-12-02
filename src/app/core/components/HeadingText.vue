<template>
  <div class="heading-text">
    <base-typography variant="heading-0" font-weight="bold">
      <slot />
    </base-typography>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.heading-text {
  position: relative;

  display: inline-flex;
  &:before {
    content: "";
    background: url(~@/assets/backgrounds/dots-bg-light.svg);
    display: block;
    height: 37px;
    left: -14px;
    top: -14px;
    position: absolute;
    width: 37px;
  }
}
</style>
