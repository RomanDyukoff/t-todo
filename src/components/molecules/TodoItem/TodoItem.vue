<template>
  <li
    :id="id"
    :class="['item', { dragging: isDragging }]"
    draggable="true"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <SvgIcon
      class="item__grab"
      name="drag"
      width="10"
      height="13"
    />
    <label class="label">
      <input
        v-model="isCheck"
        class="label__input"
        type="checkbox"
        :checked="checked"
        :aria-checked="checked"
        aria-labelledby="task-label-{{ id }}"
      />
      <span
        v-if="!isEditing"
        class="label__name"
        >{{ content }}</span
      >
      <input
        v-else
        v-model="newContent"
        class="label__name-edit"
        @keyup.enter="saveEdit"
      />
    </label>
    <div class="item__actions">
      <SvgIcon
        class="item__edit"
        name="pencil"
        width="16"
        height="16"
        @click="combine"
      />
      <SvgIcon
        class="item__delete"
        name="bin"
        width="16"
        height="16"
        @click="removeTodo(id)"
      />
    </div>
  </li>
</template>

<script lang="ts" setup>
  import { useTodoStore } from '@/stores';
  import { reactive, toRefs, watch } from 'vue';
  import { SvgIcon } from '../../atoms';
  import type { ITodoItem } from './TodoItem.type';

  const { id, content, checked } = defineProps<ITodoItem>();

  const { removeTodo, moveTodo, updateTodo } = useTodoStore();

  const stateComponent = reactive({
    isEditing: false,
    isDragging: false,
    isCheck: checked,
    newContent: '',
  });

  const { isEditing, isCheck, isDragging, newContent } = toRefs(stateComponent);

  // обработка обновления контента в тудушке
  const editTodo = () => {
    isEditing.value = true;
    newContent.value = content;
  };

  const saveEdit = () => {
    if (newContent.value.trim()) {
      updateTodo(id, 'content', newContent.value);
      isEditing.value = false;
    }
  };

  const combine = () => {
    if (isEditing.value) {
      saveEdit();
    } else {
      editTodo();
    }
  };

  // обработка drag drop

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: DragEvent) => {
    isDragging.value = true;
    const draggedId = (e.target as HTMLElement).closest('li')?.id;
    e.dataTransfer?.setData('text/plain', draggedId || '');
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;
    const targetElement = e.target as HTMLElement;
    const targetId = targetElement.closest('li')?.id;
    const draggedId = e.dataTransfer?.getData('text/plain');

    if (draggedId && targetId && draggedId !== targetId) {
      moveTodo(draggedId, targetId);
    }
  };

  const handleDragEnd = () => {
    isDragging.value = false;
  };

  watch(isCheck, (newVal) => {
    updateTodo(id, 'checked', newVal);
  });
</script>

<style scoped src="./styles.css" />
