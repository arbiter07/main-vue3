<template>
  <p>{{ $route.path }} {{ $route.name }}</p>
  <p></p>
  <hr class="my-4" />
  <h2>store</h2>
  <p>counter : {{ counter }}</p>
  <p>counter : {{ doubleCount }}</p>
  <button @click="increment">click</button>
  <AppMap></AppMap>
</template>

<script setup>
import AppMap from '@/components/app/AppMap.vue';

import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { counter, doubleCount } = storeToRefs(store);
const { increment } = store;
</script>

<style lang="scss" scoped></style>
