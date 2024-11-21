<template>
  <div>About입니당</div>
  <p>{{ $route.path }}</p>
  <h2>store</h2>
  <p>counter : {{ counter }}</p>
  <p>counter : {{ doubleCount }}</p>
  <button @click="increment">click</button>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { counter, doubleCount } = storeToRefs(store);
const { increment } = store;
</script>

<style lang="scss" scoped></style>
