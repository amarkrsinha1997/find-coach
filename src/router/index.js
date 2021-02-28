import { createRouter, createWebHistory } from "vue-router";
import {defineAsyncComponent } from 'vue';

import CoachesList from "../components/coaches/CoachesList.vue";
import NotFound from "../components/NotFound.vue";
import store from '../store';

const CoachDetail = () => import("../components/coaches/CoachDetails.vue")
const CoachRegistration = () => import("../components/coaches/CoachRegistration.vue")
const ContactCoach = () => import("../components/requests/ContactCoach.vue")
const RequestReceived = () => import("../components/requests/RequestsReview.vue")
const UserAuth = () => import("../components/auth/UserAuth.vue")

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  { path: "/", redirect: "/coaches" },
  {
    path: "/coaches",
    component: CoachesList
  },
  {
    path: "/coaches/:id",
    props: true,
    component: CoachDetail,
    children: [
      {
        path: "contact",
        component: ContactCoach,
        props: true
      }
    ]
  },
  { path: "/register", meta: { requiresAuth: true }, component: CoachRegistration },
  { path: "/requests", meta: { requiresAuth: true }, component: RequestReceived },
  { path: "/auth", meta: { requiresUnAuth: true }, component: UserAuth },
  { path: "/:notFound(.*)", component: NotFound }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(function(to, from, next) {
  const { requiresAuth, requiresUnAuth } = to.meta;
  if (requiresAuth && store.getters.isAuthenticated) {
    next();
  } else if ( requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
});

export default router;
