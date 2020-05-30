export default {
  setUser({ commit }, user) {
    commit('setUser', user);
  },
  addMessage({ commit }, message) {
    commit('addMessage', message);
  },
};
