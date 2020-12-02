<template>
  <div class="my-info">
    <div class="author-metadata">
      <div class="author-avatar">
        <base-img src="@/assets/images/avatar.jpg" resolution="square" circular width="180" />
      </div>

      <div class="author-details">
        <base-typography variant="title-0" font-weight="bold">
          {{ contactInfo.name }}
        </base-typography>

        <base-typography variant="subtitle-0" alignment="center">
          {{ contactInfo.position }}
        </base-typography>
      </div>
    </div>

    <a :href="cvUrl" download target="_blank" class="download-cv">
      <base-button>Download CV</base-button>
    </a>
  </div>
</template>

<script>
import PageContainer from "@s/components/PageContainer.vue";
import { contactInfo } from "@/constants";

export default {
  components: { PageContainer },
  data() {
    return {
      contactInfo,
      cvUrl: "https://srv-store5.gofile.io/download/soR4Ys/Hieu_Huynh_FE_CV.pdf",
    };
  },
};
</script>

<style lang="scss" scoped>
.my-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 70px 0;
  background-color: color(dark-2);
}

.author-avatar {
  position: relative;
  width: 180px;
  margin: 0 auto 30px;
  z-index: 1;
  &:after {
    position: absolute;
    opacity: 0.3;
    top: 7%;
    left: 7%;
    border-radius: 100%;
    content: "";
    height: calc(100% + 0px);
    width: calc(100% + 0px);
    background-image: repeating-radial-gradient(#fff, #fff 1px, transparent 0px, transparent 100%);
    background-size: 6px 6px;
    z-index: -1;
  }
}

.author-details {
  display: grid;
  gap: 12px;
  grid-auto-flow: row;
  justify-content: center;
}
</style>
