export default {
  setUser(state, user) {
    state.user = user;

    localStorage.setItem('username', user.username);
  },

  addMessage(state, message) {
    state.messages.push(message);
  },
};
