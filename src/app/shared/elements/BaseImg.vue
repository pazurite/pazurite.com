<template>
  <div v-aspect-ratio="aspectRatio" v-bind="wrapperProps" v-on="$listeners">
    <base-skeleton-loader
      v-if="isDisplayLoader"
      :variant="circular ? 'circle' : 'rect'"
      class="base-img__loader"
    />

    <img v-bind="sourceProps" />
  </div>
</template>

<script lang="ts">
import enumProps from '@/utils/enumProps';
import BaseSkeletonLoader from '@s/elements/BaseSkeletonLoader.vue';
import { pixel } from '@/utils/common';
import _values from 'lodash/values';
import aspectRatio from '@/directives/aspectRatio';
import { ScreenOrientation, ScreenResolution } from '@/constants/enums';
import { screenResolutionDictionary } from '@/helpers/dictionaries';

export default {
  components: { BaseSkeletonLoader },
  directives: { aspectRatio },
  props: {
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },

    bgcolor: {
      type: String,
      default: '',
    },
    fit: enumProps(['fill', 'contain', 'cover', 'none', 'scale-down'], 'fill'),
    position: { type: String, default: '' },
    name: { type: String, default: '' },
    placeholder: {
      type: String,
      default: '@/assets/images/image_placeholder.png',
    },
    orientation: enumProps(_values(ScreenOrientation), 'landscape'),
    resolution: enumProps(_values(ScreenResolution), ''),

    // Dimensions
    width: {
      type: [String, Number],
      default: '',
    },
    height: {
      type: [String, Number],
      default: '',
    },
    maxWidth: { type: [String, Number], default: '' },
    maxHeight: { type: [String, Number], default: '' },

    noLoader: Boolean,
    dense: Boolean,
    stretch: Boolean,
    rounded: Boolean,
    circular: Boolean,
    clickable: Boolean,
    elevated: Boolean,
    loading: Boolean,
  },

  data() {
    return {
      hasImageLoaded: false,
      hasPlaceholderProcessed: false,
    };
  },
  computed: {
    internalProps() {
      return {
        dense: this.dense,
        circular: this.circular,
        rounded: this.rounded,
        elevated: this.elevated,
        stretch: this.stretch,
        clickable: this.clickable,
        transparent: this.transparent,
        loading: this.isDisplayLoader,
      };
    },
    wrapperProps() {
      return {
        class: {
          'base-img': true,
          [`bgcolor--${this.bgcolor}`]: !!this.bgcolor,
        },
        style: this.measurableStyles,
        ...this.internalProps,
      };
    },
    sourceProps() {
      return {
        class: 'base-img-source',
        alt: this.alt,
        style: {
          objectFit: this.fit,
          objectPosition: this.position,
        },
        ...this.internalProps,
      };
    },
    measurableStyles() {
      return {
        width: pixel(this.width),
        height: pixel(this.height),
        maxHeight: pixel(this.maxHeight),
        maxWidth: pixel(this.maxWidth),
      };
    },
    aspectRatio() {
      let [aspectWidth = '', aspectHeight = ''] = screenResolutionDictionary[this.resolution] || [];

      if (aspectWidth && aspectHeight) {
        return this.orientation === ScreenOrientation.LANDSCAPE
          ? `${aspectWidth}:${aspectHeight}`
          : `${aspectHeight}:${aspectWidth}`;
      }

      return '';
    },
    isDisplayLoader() {
      return !this.noLoader && (!this.hasImageLoaded || this.loading);
    },
  },
  watch: {
    src: {
      immediate: true,
      async handler(src) {
        this.hasImageLoaded = false;
        this.hasPlaceholderProcessed = false;

        this.processImage(src);
      },
    },
  },
  created() {
    if (this.circular && !this.width && !this.height) {
      throw new Error('[base-img]: circular props required default width and height');
    }
  },
  mounted() {
    if (!this.hasImageLoaded) {
      this.processImage(this.src);
    }
  },
  methods: {
    processImage(src) {
      let preparedSrc = src;

      if (src && src.match(/@\/assets\//)) {
        const filepath = src.replace('@/assets/', '');
        let imgRequire = require.context(`@/assets/`, true, /\.(png|jpe?g|gif|webp)(\?.*)?$/);

        preparedSrc = imgRequire(`./${filepath}`);
      }

      this.preloadImage(preparedSrc);
    },
    preloadImage(src) {
      if (!src || !this.$el) return;

      const imageEl = this.$el.querySelector('.base-img-source');

      if (!imageEl) return;

      imageEl.onload = async () => {
        this.hasImageLoaded = true;

        this.$emit('load');
      };

      imageEl.onerror = () => {
        this.loadPlaceholder();

        this.$emit('error');
      };

      imageEl.src = src;
    },

    loadPlaceholder() {
      if (this.hasPlaceholderProcessed) return;

      this.hasPlaceholderProcessed = true;

      this.processImage(this.placeholder);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-img {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  z-index: map-get($z-layers, content);

  height: 100%;

  &__loader {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: map-get($z-layers, loader);
  }
  &[circular] {
    flex: 1 0 100%;
    border-radius: 100%;
  }
  &[rounded] {
    border-radius: 4px;
  }
  &[dense] {
    flex: 0 1 auto;
  }
  &[clickable] {
    cursor: pointer;
  }

  &[elevated] {
    box-shadow: 0 4px 16px 0 rgba(9, 32, 88, 0.06);
  }

  &[stretch] {
    width: 100%;
    height: 100%;
  }
}

.base-img-source {
  display: flex;
  width: 100%;
  height: 100%;
  animation: image-loading 0.4s linear;
  &[loading] {
    opacity: 0;
  }
  &[dense] {
    width: initial;
  }
  &[circular] {
    border-radius: 100%;
    overflow: hidden;
  }

  @include breakpoint-down(sm) {
    height: 100%;
    max-width: initial;
  }
}
@keyframes image-loading {
  0% {
    filter: grayscale(100%) opacity(0) blur(20px);
  }
  40% {
    filter: grayscale(80%) opacity(0.2) blur(15px);
  }
  60% {
    filter: grayscale(60%) opacity(0.4) blur(10px);
  }
  80% {
    filter: grayscale(40%) opacity(0.6) blur(5px);
  }
  100% {
    filter: grayscale(20%) opacity(0.8) blur(0px);
  }
}
</style>
