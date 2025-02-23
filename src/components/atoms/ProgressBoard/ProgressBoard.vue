<template>
  <article class="progress-card">
    <header class="progress-card__header">
      <span class="progress-card__total">{{ current }} tasks</span>
      <h2 class="progress-card__title">{{ title }}</h2>
    </header>
    <progress
      class="progress-card__bar"
      :value="progress"
      max="100"
      :aria-label="`Progress: ${progress}%`"
      :style="{ '--progress-color': progressColor }"
    />
  </article>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { IProgressBoard } from './ProgressBoard.type';

  const props = defineProps<IProgressBoard>();

  // высчитываю прогресс выполнения
  const progress = computed(() =>
    props.current && props.total ? (props.current / props.total) * 100 : 0
  );

  // получаю цвет прогресс бара в зависимости от пропсы и записываю в css переменную
  const progressColor = computed(() => {
    return props.color === 'pink'
      ? 'rgba(239, 93, 168, 1)'
      : 'rgba(93, 95, 239, 1)';
  });
</script>

<style scoped src="./styles.css" />
