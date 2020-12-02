<template>
  <div class="my-info">
    <base-img />
  </div>
</template>

<script>
import PageContainer from '@s/components/PageContainer.vue';

export default {
  components: {PageContainer },
};
</script>

<style lang="css" scoped>
.my-info {
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
