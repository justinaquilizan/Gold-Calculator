<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1>{{ isRegistering ? 'Member Registration' : 'Member Login' }}</h1>
        <p class="subtitle">Gold Valuation App</p>
      </div>

      <form @submit.prevent="isRegistering ? handleRegister() : handleLogin()" class="auth-form">
        <div v-if="error" class="error-alert">
          {{ error }}
        </div>

        <div v-if="isRegistering" class="input-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="John Doe"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            :placeholder="isRegistering ? 'johndoe' : 'admin'"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="••••••"
            required
            :disabled="isLoading"
          />
        </div>

        <button type="submit" class="gold-btn" :disabled="isLoading">
          {{ isLoading ? (isRegistering ? 'Registering...' : 'Authenticating...') : (isRegistering ? 'Register' : 'Login') }}
        </button>
      </form>

      <div class="auth-spacer"></div>

      <div class="auth-toggle">
        <button
          type="button"
          @click="toggleMode"
          class="toggle-btn"
          :disabled="isLoading"
        >
          {{ isRegistering ? 'Already have an account? Login' : 'Need an account? Register' }}
        </button>
      </div>

      <div class="auth-footer">
        <p>Welcome to the Gold Valuation App</p>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '../../utils/authService';

export default {
  name: 'GoldAuth',
  data() {
    return {
      isLoading: false,
      error: '',
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    toggleMode() {
      this.isRegistering = !this.isRegistering;
      this.error = '';
      this.form = { username: '', password: '', name: '' };
    },
    handleLogin() {
      this.isLoading = true;
      this.error = '';

      // Simulate a small network delay for realism (optional)
      setTimeout(() => {
        const result = authService.login(this.form.username, this.form.password);

        if (result.success) {
          // Emit the 'login-success' event that App.vue is listening for
          this.$emit('login-success', result.user);
        } else {
          this.error = result.message;
          this.isLoading = false;
        }
      }, 800);
    },
    handleRegister() {
      if (!this.form.name.trim()) {
        this.error = 'Full name is required';
        return;
      }
      if (this.form.username.length < 3) {
        this.error = 'Username must be at least 3 characters';
        return;
      }
      if (this.form.password.length < 3) {
        this.error = 'Password must be at least 3 characters';
        return;
      }

      this.isLoading = true;
      this.error = '';

      // Simulate a small network delay for realism (optional)
      setTimeout(() => {
        const result = authService.register(this.form.username, this.form.password, this.form.name);

        if (result.success) {
          // Emit the 'login-success' event that App.vue is listening for
          this.$emit('login-success', result.user);
        } else {
          this.error = result.message;
          this.isLoading = false;
        }
      }, 800);
    }
  }
};
</script>

<style scoped>
/* Reuse the existing styles, but add the error alert style */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--bg-deep);
  background-image: radial-gradient(circle at center, #1f1f1f 0%, #000000 100%);
  color: white;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: var(--bg-card);
  padding: 3rem 2.5rem;
  border: 1px solid #333;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.auth-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 4px;
  background: linear-gradient(90deg, var(--gold-dark), var(--gold-primary), var(--gold-light));
}

h1 { color: var(--gold-primary); font-weight: 300; margin-bottom: 0.5rem; }
.subtitle { color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; }

.input-group { margin-bottom: 1.5rem; text-align: left; }
label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem; }

input {
  width: 100%; padding: 12px;
  background-color: var(--bg-input);
  border: 1px solid #333;
  border-radius: 6px;
  color: #fff; font-size: 1rem; outline: none;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

input:focus { border-color: var(--gold-primary); box-shadow: 0 0 8px var(--gold-glow); }

.gold-btn {
  width: 100%; padding: 14px; margin-top: 1rem;
  background: linear-gradient(135deg, var(--gold-dark), var(--gold-primary));
  border: none; border-radius: 6px;
  color: #000; font-weight: bold; font-size: 1rem; text-transform: uppercase;
  cursor: pointer; transition: 0.2s;
}
.gold-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 15px var(--gold-glow); }
.gold-btn:disabled { opacity: 0.7; cursor: not-allowed; filter: grayscale(1); }

.error-alert {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff6b6b;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.auth-spacer {
  height: 1rem;
}

.auth-toggle {
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--gold-primary);
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;
}

.toggle-btn:hover:not(:disabled) {
  color: var(--gold-light);
}

.toggle-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.auth-footer { margin-top: 2rem; font-size: 0.8rem; color: #444; }
</style>