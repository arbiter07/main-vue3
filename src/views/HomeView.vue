<template>
  <div>Home입니당</div>
  <p>{{ $route.path }}</p>
  <p>{{ $route.name }}</p>
  <p></p>
  <hr class="my-4" />
  <AppGrid :items="items" v-slot="{ item }">
    <AppCard> {{ item }}</AppCard>
  </AppGrid>
</template>

<script setup>
import { ref } from 'vue';

const items = ref(['사과', '바나나', '키위', '바나나']);
</script>

<style lang="scss" scoped></style>
