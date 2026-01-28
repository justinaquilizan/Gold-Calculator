<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <GoldAuth v-if="!currentUser" @login-success="handleLogin" />
      <CalculatorHub v-else :user="currentUser" @logout="handleLogout" />
    </transition>
  </div>
</template>

<script>
import GoldAuth from './components/auth/GoldAuth.vue';
import CalculatorHub from './components/calculator/CalculatorHub.vue';
import authService from './utils/authService';
import './assets/styles/variables.css'; // Import global vars

export default {
  name: 'App',
  components: { GoldAuth, CalculatorHub },
  data() {
    return {
      currentUser: null
    };
  },
  mounted() {
    // Auto-login check
    const savedUser = authService.getUser();
    if (savedUser) {
      this.currentUser = savedUser;
    }
  },
  methods: {
    handleLogin(user) {
      this.currentUser = user;
    },
    handleLogout() {
      authService.logout();
      this.currentUser = null;
    }
  }
};
</script>

<style>
body {
  margin: 0;
  background-color: var(--bg-deep, #000);
  font-family: 'Helvetica Neue', sans-serif;
  color: white;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style>