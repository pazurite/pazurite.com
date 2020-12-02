<template>
  <div v-bind="skeletonProps">
    <div v-for="bone in bones" :key="bone" class="skeleton-loader__bone">&#8203;</div>
  </div>
</template>

<script lang="ts">
import enumProps from '@/utils/enumProps';
import { pixel } from '@/utils/common';

export default {
  props: {
    variant: enumProps(
      [
        'rect',
        'square',
        'widescreen',
        'button',
        'text',
        'paragraph',
        'sentences',
        'circle',
        'input',
        'info-viewer',
        'tabs',
      ],
      'text'
    ),
    rounded: Boolean,
    width: {
      type: [String, Number],
      default: '',
    },
    height: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      bones: 1,
    };
  },
  computed: {
    skeletonProps() {
      return {
        class: {
          'skeleton-loader': true,
          [`variant--${this.variant}`]: true,
        },
        style: {
          width: pixel(this.width),
          minHeight: pixel(this.height),
        },
      };
    },
  },
  watch: {
    variant: {
      immediate: true,
      handler(variant) {
        this.bones = this.getBones(variant);
      },
    },
  },
  methods: {
    getBones(variant) {
      switch (variant) {
        case 'sentences':
        case 'info-viewer':
          return 2;
        case 'paragraph':
        case 'tabs':
          return 3;
        default:
          return 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.skeleton-loader {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__bone {
    display: flex;
    flex: 1 0 100%;
    position: relative;
    background-color: rgba(black, 0.12);
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);

      animation: skeleton-loading 1.5s infinite;
    }
  }
}

.variant {
  &--widescreen {
    .skeleton-loader__bone {
      padding-top: 56.25%;
    }
  }

  &--rect {
    .skeleton-loader__bone {
      width: 100%;
      height: 100%;
    }
  }

  &--square {
    width: 80px;
    height: 80px;
  }

  &--button {
    .skeleton-loader__bone {
      min-height: 50px;
      border-radius: 23px;
    }
  }

  &--tabs {
    display: grid;
    gap: 24px;
    grid-auto-flow: column;
    grid-auto-rows: minmax(0, min-content);
    flex: 0;
    .skeleton-loader__bone {
      min-height: 40px;
    }
  }
  &--info-viewer {
    display: grid;
    gap: 16px;
    grid-template-columns: minmax(0, 0.3fr) minmax(0, 0.7fr);

    flex: 0;
    .skeleton-loader__bone {
      min-height: 24px;
    }
  }
  &--input {
    .skeleton-loader__bone {
      width: 100%;
      min-height: 40px;
    }
  }

  &--circle {
    border-radius: 100%;
    overflow: hidden;
    .skeleton-loader__bone {
      padding-top: 100%;
    }
  }
  &--text {
    height: 20px;
  }
  &--paragraph,
  &--sentences {
    display: grid;
    gap: 8px;
    grid-auto-flow: row;
    grid-auto-rows: minmax(0, min-content);
    flex: 0;
    .skeleton-loader__bone {
      min-height: 20px;
      &:nth-child(2) {
        width: 70%;
      }
      &:nth-child(3) {
        width: 30%;
      }
    }
  }
}

@keyframes skeleton-loading {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
