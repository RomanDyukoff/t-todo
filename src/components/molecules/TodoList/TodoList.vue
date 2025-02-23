<template>
  <ul class="list">
    <TodoItem
      v-for="todo in todos.todos"
      :key="todo.id"
      v-bind="todo"
    />
  </ul>
</template>

<script lang="ts" setup>
  import { TodoItem } from '@/components';
  import { useTodoStore } from '@/stores';

  const todos = useTodoStore();
</script>

<style scoped src="./styles.css" />
