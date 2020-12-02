<template>
  <main class="default-layout">
    <page-container>
      <my-info />

      <slot />
    </page-container>
  </main>
</template>

<script>
import PageContainer from '@s/components/PageContainer.vue';
import MyInfo from '@c/views/MyInfo.vue';

export default {
  components: { MyInfo, PageContainer },
};
</script>

<style lang="css" scoped>
.default-layout {
  display: flex;
  height: 100%;
  min-height: 100vh;

  padding: 10vh 0;

  background: linear-gradient(color(secondary), color(primary));
}

p {
  color: red;
}
</style>
