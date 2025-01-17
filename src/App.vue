<template>
  <div class="app-container">
    <AppHeader class="app-header"/>
    <RouterView class="body-container"/>
    <FloatingButton class="app-footer"/>
  </div>
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
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
  background-color: #e4e7ed;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app-header {
  height: 50px;
  flex-shrink: 0;
}

.body-container {
  flex: 1;
  overflow: auto;
  min-height: 0;
}

.app-footer {
  flex-shrink: 0;
}
</style>
