import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView';
import FriendsList from '../views/FriendsList'; 
import UserDynamics from "../views/UserDynamics";
import LoginView from "../views/LoginView";
import EnrollView from "../views/EnrollView";
import NotFound from "../views/NotFound";

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/friendslist/',
    name: 'FriendsList',
    component:FriendsList
  },
  {
    path: '/userdynamics/:userId/',
    name: 'UserDynamics',
    component: UserDynamics
  },
  {
    path: '/loginview/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/enrollview/',
    name: 'EnrollView',
    component: EnrollView
  },
  {
    path: '/404/',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    redirect:"/404/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
