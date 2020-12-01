<template>
  <div>
    <router-link to="/">
      Home
    </router-link>
    |
    <router-link to="/medium">
      Medium
    </router-link>
    <router-view/>

    <app-banner />
  </div>
</template>

<script>
import AppBanner from "@/components/AppBanner";

export default {
  components: {AppBanner}
}
</script>
