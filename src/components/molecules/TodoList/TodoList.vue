<template>
  <transition-group name="todo-list" tag="ul" class="todo-list" aria-label="Список задач">
    <TodoItem v-for="todo in todos" :key="todo.id" v-bind="todo" />
  </transition-group>
</template>

<script lang="ts" setup>
import { TodoItem } from '@/components';
import type { ITodoList } from './TodoList.type';

defineProps<ITodoList>();

</script>

<style scoped src="./styles.css" />
