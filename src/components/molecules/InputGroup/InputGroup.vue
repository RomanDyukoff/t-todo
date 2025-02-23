<template>
  <div class="input-group">
    <InputText
      class="input-group__text"
      placeholder="Add new todo..."
      v-model.trim="text"
      @keyup.enter="handelClick"
    />
    <CustomButton
      v-show="isButton"
      label="submit"
      type="button"
      @click="handelClick"
    />
  </div>
</template>

<script lang="ts" setup>
  import { CustomButton, InputText } from '@/components';
  import { useTodoStore } from '@/stores';
  import { generateId } from '@/utils';
  import { computed, ref } from 'vue';

  const text = ref<string>('');
  const isButton = computed(() => text.value.length >= 3);
  const { addTodo } = useTodoStore();

  const handelClick = () => {
    addTodo({
      id: generateId(),
      content: text.value,
      checked: false,
    });
    text.value = '';
  };
</script>

<style scoped src="./styles.css" />
