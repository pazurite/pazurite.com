<template>
  <div class="default-layout">
    <page-container>
      <main class="main">
        <my-info />

        <slot />
      </main>
    </page-container>
  </div>
</template>

<script>
import PageContainer from "@s/components/PageContainer.vue";
import MyInfo from "@c/views/MyInfo.vue";

export default {
  components: { MyInfo, PageContainer },
};
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  height: 100%;
  max-height: 100vh;

  padding: 10vh 0;

  background: linear-gradient(color(secondary), color(primary));
}

.main {
  display: grid;
  grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr);

  height: 100%;



  background-color: color(dark);
  border-radius: 32px;
  overflow: hidden;
}
</style>
