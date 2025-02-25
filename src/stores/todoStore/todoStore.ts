import type { ITodoItem } from '@/components/molecules/TodoItem/TodoItem.type';
import { ENDPOINTS } from '@/constants';
import { fetchData } from '@/utils';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const fetchTodoData = async <T>(
  url: string,
  method: HttpMethod = 'GET',
  body?: string
): Promise<T> => {
  const response = await fetchData<T>(url, {
    method: method,
    headers: {
      Prefer: 'return=representation',
    },
    body,
  });

  return response;
};

const useTodoStore = defineStore('todo-store', () => {
  const todos = ref<ITodoItem[]>([]);
  const currentTodos = ref<ITodoItem[]>([...todos.value]);

  const updateCurrentTodos = () => (currentTodos.value = [...todos.value]);

  watch(todos, updateCurrentTodos);
  // CRUD операции

  const fetchTodo = async () => {
    todos.value = await fetchTodoData<ITodoItem[]>(ENDPOINTS.BASE);
  };

  const addTodo = async (todo: ITodoItem) => {
    const strTodo = JSON.stringify(todo);
    const response = await fetchTodoData<ITodoItem[]>(
      ENDPOINTS.BASE,
      'POST',
      strTodo
    );

    todos.value = [...response, ...todos.value];
  };

  const removeTodo = async (id: string) => {
    fetchTodoData<ITodoItem[]>(
      `${ENDPOINTS.BASE}${ENDPOINTS.ID}${id}`,
      'DELETE'
    );
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const updateTodo = async (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    const strTodo = JSON.stringify({ [field]: value });
    await fetchTodoData<ITodoItem[]>(
      `${ENDPOINTS.BASE}${ENDPOINTS.ID}${id}`,
      'PATCH',
      strTodo
    );

    todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, [field]: value } : todo
    );
  };

  // Вспомогательные операции

  const checkedAllTodos = async () => {
    const strTodo = JSON.stringify({ checked: true });
    const response = await fetchTodoData<ITodoItem[]>(
      `${ENDPOINTS.BASE}${ENDPOINTS.CHECK}`,
      'PATCH',
      strTodo
    );

    todos.value = response;
  };

  const deleteCompleteTodo = async () => {
    await fetchTodoData<ITodoItem[]>(
      `${ENDPOINTS.BASE}${ENDPOINTS.CHECK}`,
      'DELETE'
    );

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
    checkedAllTodos,
    deleteCompleteTodo,
    showActiveTodos,
    showCompletedTodos,
    currentState,
  };
});

export { useTodoStore };
