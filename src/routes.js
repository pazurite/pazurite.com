import AppHome from '@/components/AppHome';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: AppHome
    },
    {
        path: '/medium',
        name: 'Medium',
        component: () => import('@/components/AppMedium')
    }
];

export default routes;
