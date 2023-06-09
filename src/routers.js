import Home from './components/Home.vue';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';
import QrScanner from './components/QrScanner.vue'
import LandingPage from './components/landingpage.vue'
import Sidebar from './components/Sidebar.vue'
import LakbayContent from './components/LakbayContent.vue'
import BeginLakbay from './components/BeginLakbay.vue'
import BucketList from './components/BucketList.vue'
import landingpageVue from './components/landingpage.vue';

import testing from './components/testing.vue'


import { createRouter, createWebHistory } from 'vue-router';

export const SERVER_ADDRESS = 'http://localhost:7000';

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
        path: '/login' 
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
    },
    {
        name: 'Sidebar',
        component: Sidebar,
        path: '/sidebar'
    },
    {
        name: 'LakbayContent',
        component: LakbayContent,
        path: '/LakbayContent/:landmark_id'
    },
    {
        name: 'BeginLakbay',
        component: BeginLakbay,
        path: '/BeginLakbay'
    },
    {
        name: 'BucketList',
        component: BucketList,
        path: '/BucketList/:bucketlist_id'
    },
    {
        name: 'testing',
        component: testing,
        path: '/testing'
    },
    {
        name: 'landing',
        component: landingpageVue,
        path: '/'
    },

];



const router = createRouter({
    history: createWebHistory(),
    routes,
});



export default router;