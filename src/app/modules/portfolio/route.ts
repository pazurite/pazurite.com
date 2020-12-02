const routes = [
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('@/app/modules/portfolio/Portfolio.vue'),
  },
];

export default routes;
