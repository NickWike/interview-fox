<template>
  <AppHeader />
  <RouterView class="main-container">  </RouterView>
  <FloatingButton />
</template>

<script>
import AppHeader from '@/views/AppHeader.vue'
import FloatingButton from '@/components/FloatingButton.vue'
export default {
  name: 'App',
  components: {
    AppHeader,
    FloatingButton
  }
}
</script>

<style>
#app {
  background-color: #f0f0f0; /* 设置淡灰色背景 */
  min-height: calc(100vh - 40px); /* 确保背景覆盖整个视口 */
}
</style>
