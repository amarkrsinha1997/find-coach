import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
import CoachDetail from "../components/coaches/CoachDetails.vue";
import CoachesList from "../components/coaches/CoachesList.vue";
import CoachRegistration from "../components/coaches/CoachRegistration.vue";
import ContactCoach from "../components/requests/ContactCoach.vue";
import RequestReceived from "../components/requests/RequestsReview.vue";
import NotFound from "../components/NotFound.vue";
import UserAuth from "../components/auth/UserAuth.vue";
import store from '../store';

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
