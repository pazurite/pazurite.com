<template>
  <default-layout>
    <router-view />
  </default-layout>
</template>

<script lang="ts">
import DefaultLayout from '@c/layouts/DefaultLayout.vue';

export default {
  components: { DefaultLayout },
};
</script>
