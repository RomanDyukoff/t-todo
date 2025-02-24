<template>
  <form class="input-group" @submit.prevent="handelClick">
    <InputText v-model.trim="text" class="input-group__text" placeholder="Add new todo..." aria-label="Add new todo" />
    <transition name="fade">
      <CustomButton v-show="isButton" label="submit" type="submit" />
    </transition>
  </form>
</template>

<script lang="ts" setup>
import { CustomButton, InputText } from '@/components';
import { useTodoStore } from '@/stores';
import { generateId } from '@/utils';
import { computed, ref } from 'vue';

const text = ref<string>('');
const isButton = computed(() => text.value.length >= 2);
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
