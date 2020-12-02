import Vue from 'vue';
import App from '@/App.vue';
import router from './routes';

import './styles/index.scss';

await import('./app/shared');

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
