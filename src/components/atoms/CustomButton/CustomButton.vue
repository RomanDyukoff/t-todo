<template>
  <button
    :class="['button', color || 'prime']"
    :type="type || 'button'"
    :disabled="disabled"
  >
    <span class="button__label">{{ label }}</span>
  </button>
</template>

<script lang="ts" setup>
  import type { ICustomButton } from './CustomButton.type';

  defineProps<ICustomButton>();
</script>

<style scoped src="./styles.css" />
