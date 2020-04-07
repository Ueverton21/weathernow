import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Detalhes from '@/pages/Detalhes';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/details',
            name: 'Detalhes',
            component: Detalhes,
        },
    ]
});