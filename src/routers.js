import Home from './components/Home.vue';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';
import QrScanner from './components/QrScanner.vue'
import LandingPage from './components/landingpage.vue'
import Sidebar from './components/Sidebar.vue'
import LakbayContent from './components/LakbayContent.vue'
import BeginLakbay from './components/BeginLakbay.vue'
import BucketList from './components/BucketList.vue'

import testing from './components/testing.vue'

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
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;