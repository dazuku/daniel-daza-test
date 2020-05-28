import io from 'socket.io-client';

const SocketPlugin = () => ({
  connect(username) {
    this.socket = io(`https://pager-hiring.herokuapp.com/?username=${username}`);
  },
  on(event, callback) {
    this.socket.on(event, callback);
  },
  off(event) {
    this.socket.off(event);
  },
  emit(event, params) {
    this.socket.emit(event, params);
  },
});

export default {
  install(VueInstance) {
    const currentInstance = VueInstance;
    currentInstance.prototype.$socket = SocketPlugin();
  },
};
