<template>
  <div class="buttons">
    <CustomButton
      v-for="({ label, action, visible }, i) in buttons"
      v-show="visible"
      :key="i"
      class="buttons__button"
      :label="label"
      :color="isActive(i) ? 'prime' : 'transparent'"
      @click="setActive(i, action)"
    />
  </div>
</template>

<script lang="ts" setup>
  import { CustomButton } from '@/components';
  import { onMounted, ref } from 'vue';
  import type { IButtonGroup } from './ButtonGroup.type';

  const { buttons } = defineProps<IButtonGroup>();

  const activeIndex = ref<number | null>(null);

  // фунция принимает индекс и проверяет равен ли он активному, выполняется в шаблоне
  const isActive = (index: number) => {
    return activeIndex.value === index;
  };

  // при нажатии на кноаку делаем её активной и выполняем переданный колбэк
  const setActive = (index: number, action?: () => void) => {
    activeIndex.value = index;

    action?.();
  };

  // проверяем поля проасов на наличие дефолтной кнопки и устанавливаем нудный индекс чтобы подсветить кнопку
  onMounted(() => {
    const defaultButton = buttons.findIndex((button) => button.default);
    if (defaultButton !== -1) {
      activeIndex.value = defaultButton;
    }
  });
</script>

<style scoped src="./styles.css" />
