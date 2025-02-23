<template>
  <svg
    :class="`icon icon-${name}`"
    :width="width || 10"
    :height="height || 10"
    :viewBox="viewBox"
    aria-hidden="true"
  >
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { ISvgIcon } from './SvgIcon.type';

  const props = defineProps<ISvgIcon>();

  const viewBox = computed(
    () => `0 0 ${props.width || 10} ${props.height || 10}`
  );
</script>

<style scoped src="./styles.css" />
