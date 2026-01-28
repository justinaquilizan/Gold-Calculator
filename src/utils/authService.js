const STORAGE_KEY = "gold_user_session";

// Mock Database
const USERS = [
  { username: "admin", password: "123", name: "Store Admin" },
  { username: "staff", password: "123", name: "Sales Staff" },
];

export default {
  login(username, password) {
    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      // Save safe data to storage
      const sessionData = {
        username: user.username,
        name: user.name,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      return { success: true, user: sessionData };
    }
    return { success: false, message: "Invalid Credentials" };
  },

  register(username, password, name) {
    const existingUser = USERS.find((u) => u.username === username);
    if (existingUser) {
      return { success: false, message: "Username already exists" };
    }
    const newUser = { username, password, name };
    USERS.push(newUser);
    // Auto-login after registration
    const sessionData = {
      username: newUser.username,
      name: newUser.name,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
    return { success: true, user: sessionData };
  },

  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },

  getUser() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },
};
