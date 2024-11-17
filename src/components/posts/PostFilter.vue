<template>
  <form @submit.prevent>
    <div class="row g-3">
      <div class="col">
        <input
          :vakye="title"
          @input="$emit('update:title', $event.target.value)"
          type="text"
          class="form-control"
        />
      </div>
      <div class="col-3">
        <select
          :vakye="limit"
          @input="$emit('update:limit', $event.target.value)"
          class="form-select"
        >
          <option value="3">3개씩보기</option>
          <option value="6">6개씩보기</option>
          <option value="9">9개씩보기</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
defineProps({
  title: String,
  limit: Number,
});
defineEmits(['update:title', 'update:limit']);
</script>

<style lang="scss" scoped></style>
