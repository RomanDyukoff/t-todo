import type { ITodoItem } from '@/components/molecules/TodoItem/TodoItem.type';
import { fetchData } from '@/utils';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const useTodoStore = defineStore('todo-store', () => {
  const todos = ref<ITodoItem[]>([]);
  const currentTodos = ref<ITodoItem[]>([...todos.value]);

  const updateCurrentTodos = () => (currentTodos.value = [...todos.value]);

  watch(todos, updateCurrentTodos);
  // CRUD операции

  const fetchTodo = async () => {
    const response = await fetchData<ITodoItem[]>('/todos');

    todos.value = response;
  };

  const addTodo = async (todo: ITodoItem) => {
    const response = await fetchData<ITodoItem[]>('/todos', {
      method: 'POST',
      headers: {
        Prefer: 'return=representation',
      },
      body: JSON.stringify(todo),
    });

    todos.value = [...response, ...todos.value];
  };

  const removeTodo = async (id: string) => {
    await fetchData<ITodoItem[]>(`/todos?id=eq.${id}`, {
      method: 'DELETE',
      headers: { Prefer: 'return=representation' },
    });

    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const updateTodo = async (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    await fetchData<ITodoItem>(`/todos?id=eq.${id}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ [field]: value }),
    });

    todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, [field]: value } : todo
    );
  };

  // Вспомогательные операции

  const markAllTodos = async () => {
    const response = await fetchData<ITodoItem[]>('/todos?id=not.is.null', {
      method: 'PATCH',
      headers: {
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ checked: true }),
    });

    todos.value = response;
  };

  const deleteCompleteTodo = async () => {
    await fetchData<ITodoItem[]>('/todos?checked=eq.true', {
      method: 'DELETE',
      headers: {
        Prefer: 'return=representation',
      },
    });

    todos.value = todos.value.filter((todo) => !todo.checked);
  };

  // Фильтрация

  const showActiveTodos = () => {
    currentTodos.value = todos.value.filter(({ checked }) => !checked);
  };

  const showCompletedTodos = () => {
    currentTodos.value = todos.value.filter(({ checked }) => checked);
  };

  // Смена позиции индексов для Drag and Drop

  const moveTodo = (draggedId: string, targetId: string) => {
    const draggedIndex = currentTodos.value.findIndex(
      (todo) => todo.id === draggedId
    );
    const targetIndex = currentTodos.value.findIndex(
      (todo) => todo.id === targetId
    );

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedItem] = currentTodos.value.splice(draggedIndex, 1);
      currentTodos.value.splice(targetIndex, 0, draggedItem);
    }
  };

  // Текущее состояние тудушек

  const currentState = computed(() => ({
    length: todos.value.length,
    completed: todos.value.filter((todo) => todo.checked).length,
    unfinished: todos.value.filter((todo) => !todo.checked).length,
  }));

  return {
    todos,
    currentTodos,
    fetchTodo,
    addTodo,
    removeTodo,
    moveTodo,
    updateTodo,
    markAllTodos,
    deleteCompleteTodo,
    showActiveTodos,
    showCompletedTodos,
    currentState,
  };
});

export { useTodoStore };
