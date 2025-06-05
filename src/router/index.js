import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.component.vue')
    },
    {
        path: '/devices',
        name: 'devices',
        component: () => import('../views/DevicesView.component.vue')
    },
    {
        path: '/subscriptions',
        name: 'subscriptions',
        component: () => import('../views/PlansView.component.vue')
    },
    {
        path: '/guides',
        name: 'guides',
        component: () => import('../views/GuidesView.component.vue')
    },
    {
        path: '/companies',
        name: 'companies',
        component: () => import('../views/CompaniesView.component.vue')
    },
    {
        path: '/electricians',
        name: 'electricians',
        component: () => import('../views/ElectriciansView.component.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
