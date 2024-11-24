<template>
  <p>{{ $route.path }} {{ $route.name }}</p>
  <p></p>
  <hr class="my-4" />
  <AppMap></AppMap>
</template>

<script setup>
import AppMap from '@/components/app/AppMap.vue';
</script>

<style lang="scss" scoped></style>
