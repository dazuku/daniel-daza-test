import Router from 'vue-router';
import JoinView from '../views/Join';
import ChatView from '../views/Chat';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'join',
    component: JoinView,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
  },
];

const router = new Router({
  routes,
});

router.beforeEach((to, from, next) => {
  let nextRoute = true;
  const username = localStorage.getItem('username');

  if (to.name === 'join' && username) {
    nextRoute = {
      path: '/chat',
    };
  }

  if (to.name === 'chat' && !username) {
    nextRoute = {
      path: '/',
    };
  }

  if (username) {
    router.app.$socket.connect(username);
    store.dispatch('setUser', {
      username,
    });
  }

  return next(nextRoute);
});

export default router;
