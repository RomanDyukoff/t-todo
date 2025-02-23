<template>
  <picture>
    <source
      v-for="(src, index) in sources"
      :key="index"
      :srcset="src.srcset"
      :media="src.media"
    />
    <img
      :src="src"
      :alt="alt"
      :loading="loading || 'lazy'"
      :width="width"
      :height="height"
    />
  </picture>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { ICustomImage, ISource } from './CustomImage.type';

  const props = defineProps<ICustomImage>();

  const sources = computed<ISource[]>(() => {
    return (
      props.sizes?.map((size) => ({
        srcset: size.srcset,
        media: size.media,
      })) || []
    );
  });
</script>

<style></style>
