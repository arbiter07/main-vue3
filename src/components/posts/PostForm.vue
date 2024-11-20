<template>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        v-focus
        :value="title"
        @input="emit('update:title', $event.target.value)"
        type="text"
        class="form-control"
        id="title"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        :value="content"
        @input="emit('update:content', $event.target.value)"
        class="form-control"
        id="content"
        rows="3"
      ></textarea>
      <div class="d-flex gap-2 mt-4">
        <slot name="actions"></slot>
      </div>
    </div>
  </form>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
  title: String,
  content: String,
});
const emit = defineEmits(['update:title', 'update:content']);

watch(
  () => props,
  newValue => {
    console.log('props 데이터 변경:', newValue);
  },
  { deep: true },
);
</script>

<style lang="scss" scoped></style>
