import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';
import App from './App.vue';
import SocketPlugin from './plugins/socket';
import './styles/global.scss';

Vue.use(VueRouter);
Vue.use(SocketPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
