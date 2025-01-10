<template>
  <header class="app-header">
    <div class="logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>
    <nav>
        <ul>
            <li><router-link to="/problem">问题</router-link></li>
        </ul>
    </nav>
    <div class="user-info">
      <img src="@/assets/logo.png" alt="User Avatar" class="avatar" />
      <span class="username">user. xxxx</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff; /* Header background color */

}

.logo {
  height: 40px; /* Logo height */
}

nav ul {
    list-style: none;
    display: flex;
    gap: 20px; /* Space between items */
}

nav a {
    text-decoration: none;
    color: #000; /* Adjust color as needed */
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px; /* Avatar width */
  height: 40px; /* Avatar height */
  border-radius: 50%; /* Make it circular */
  margin-right: 10px; /* Space between avatar and username */
}

.username {
  font-weight: bold; /* Bold username */
}
</style>
