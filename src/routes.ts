import Vue from 'vue';
import VueRouter from 'vue-router';
import PortfolioRoute from '@m/portfolio/route';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'portfolio' },
  },
  ...PortfolioRoute,
];

Vue.use(VueRouter);


const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
