<template>
  <Transition>
    <div v-if="modelValue">
      <div class="modal-backdrop fade show"></div>
      <div class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                <h1 class="modal-title fs-5">
                  {{ title }}
                </h1>
                <button
                  type="button"
                  d
                  class="btn-close"
                  data-bs-dismiss="modal"
                  @click="$emit('update:modelValue', false)"
                ></button>
              </slot>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <slot name="actions"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  title: String,
});
defineEmits(['close', 'update:modelValue']);
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-leave-active,
.v-enter-active {
  transition: all 0.5s ease;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
