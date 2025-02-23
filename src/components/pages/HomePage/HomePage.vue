<template>
  <MainBox />
</template>

<script lang="ts" setup>
  import { MainBox } from '@/components';
  import { useTodoStore } from '@/stores';
  import { onMounted } from 'vue';

  const { fetchTodo } = useTodoStore();

  onMounted(() => {
    fetchTodo();
  });
</script>

<style scoped src="./styles.css" />
