<template>
  <input
    class="input-text"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput"
  />
</template>

<script lang="ts" setup>
  import type { IInputText } from './InputText.type';

  defineProps<IInputText>();
  const emit = defineEmits<{
    (e: 'update:model-value', value: string): void;
  }>();

  const onInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    emit('update:model-value', value);
  };
</script>

<style scoped src="./styles.css" />
