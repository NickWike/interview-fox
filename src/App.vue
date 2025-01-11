<template>
  <AppHeader />
  <RouterView class="main-container">  </RouterView>
</template>

<script>
import AppHeader from '@/views/AppHeader.vue'
export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
#app {
  background-color: #f0f0f0; /* 设置淡灰色背景 */
  min-height: calc(100vh - 40px); /* 确保背景覆盖整个视口 */
}
</style>
