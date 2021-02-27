import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
import CoachDetail from "../components/coaches/CoachDetails.vue";
import CoachesList from "../components/coaches/CoachesList.vue";
import CoachRegistration from "../components/coaches/CoachRegistration.vue";
import ContactCoach from "../components/requests/ContactCoach.vue";
import RequestReceived from "../components/requests/RequestsReview.vue";
import NotFound from "../components/NotFound.vue";

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
    component: CoachesList,
  },
  {
    path: "/coaches/:id",
    props: true,
    component: CoachDetail,
    children: [
      {
        path: "/coaches/:id/contact",
        component: ContactCoach
      }
    ]
  },
  { path: "/register", component: CoachRegistration },
  { path: "/requests", component: RequestReceived },
  { path: "/:notFound(.*)", component: NotFound }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
