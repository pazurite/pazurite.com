<template>
  <div class="app">
    <default-layout>
      <router-view />
    </default-layout>
  </div>
</template>

<script lang="ts">
import DefaultLayout from '@c/layouts/DefaultLayout.vue';

export default {
  components: { DefaultLayout },
};
</script>

<style lang="scss" scoped>
.app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
