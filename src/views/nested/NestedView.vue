<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink class="nav-link" active-class="active" to="/nested/one"
            >nested 1</RouterLink
          >
          <RouterLink class="nav-link" active-class="active" to="/nested/two"
            >nested 2</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
  <hr class="my-4" />
  <RouterView></RouterView>
</template>

<script setup></script>

<style lang="scss" scoped></style>
