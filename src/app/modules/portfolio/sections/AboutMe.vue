<template>
  <div class="about-me">
    <base-typography>
      {{ contactInfo.biography }}
    </base-typography>

    <div class="personal-info">
      <div class="info-item">
        <base-typography color="primary" font-weight="semi-bold">Email:</base-typography>
        <base-typography>{{ contactInfo.email }}</base-typography>
      </div>

      <div class="info-item">
        <base-typography color="primary" font-weight="semi-bold">Phone:</base-typography>
        <base-typography>{{ contactInfo.phone }}</base-typography>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { contactInfo } from "@/constants";

export default {
  data() {
    return {
      contactInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.personal-info {
  display: grid;
  gap: 8px;
  grid-auto-flow: row;

  margin-top: 30px;
}

.info-item {
  display: grid;
  gap: 8px;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr);
}
</style>
