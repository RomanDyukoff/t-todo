<template>
  <section class="content">
    <div class="content__wrapper">
      <header class="content-header">
        <CustomImage
          :src="todoImage"
          alt="todo-logo"
          width="180"
          height="180"
        />
        <h1 class="content-header__title">Today I need to</h1>
      </header>
      <InputGroup class="content__input" />
      <div
        v-if="currentState.length"
        class="content__actions"
      >
        <TodoList :todos="currentTodos" />
        <div class="content__status">
          <ProgressBoard
            title="Completed"
            :current="currentState.completed"
            :total="currentState.length"
          />
          <ProgressBoard
            title="To be finished"
            :current="currentState.unfinished"
            :total="currentState.length"
            color="pink"
          />
        </div>
        <ButtonGroup :buttons="buttonData" />
      </div>
      <footer
        v-if="!currentState.length"
        class="content-footer"
      >
        <SvgIcon
          name="done-grey"
          width="18"
          height="18"
        />
        <p>Congrat, you have no more tasks to do</p>
      </footer>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import todoImage from '@/assets/image/todo-logo.png';
  import {
    ButtonGroup,
    CustomImage,
    InputGroup,
    ProgressBoard,
    SvgIcon,
    TodoList,
  } from '@/components';
  import type { IExpansionCustomButton } from '@/components/molecules/ButtonGroup/ButtonGroup.type';
  import { useTodoStore } from '@/stores';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';

  const store = useTodoStore();
  const { currentState, currentTodos } = storeToRefs(store);

  const {
    markAllTodos,
    fetchTodo,
    showActiveTodos,
    showCompletedTodos,
    deleteCompleteTodo,
  } = store;

  const buttonData = computed<IExpansionCustomButton[]>(() => {
    const completed = currentState.value.completed > 0;
    const unfinished = currentState.value.unfinished > 0;
    return [
      {
        label: 'Check all',
        action: markAllTodos,
        visible: unfinished,
      },
      {
        label: 'All',
        action: fetchTodo,
        default: true,
        visible: true,
      },
      {
        label: 'Active',
        action: showActiveTodos,
        visible: completed && unfinished,
      },
      {
        label: 'Completed',
        action: showCompletedTodos,
        visible: completed && unfinished,
      },
      {
        label: 'Clear completed',
        action: deleteCompleteTodo,
        visible: completed,
      },
    ];
  });
</script>

<style scoped src="./styles.css" />
