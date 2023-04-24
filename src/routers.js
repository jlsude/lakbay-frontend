import Home from './components/Home.vue';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';
import QrScanner from './components/QrScanner.vue'
import LandingPage from './components/landingpage.vue'
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/home',
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up',
    },
    {
        name: 'Login',
        component: Login,
        path: '/' //temporarily, supposed to be the landing page
    },
    {
        name: 'QrScanner',
        component: QrScanner,
        path: '/qrscan'
    },
    {
        name: 'LandingPage',
        component: LandingPage,
        path: '/landing'
    }


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;