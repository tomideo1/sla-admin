import Vue from 'vue';
import Router from 'vue-router';

import UserProfileLite from '../views/UserProfileLite.vue';
import AddNewPost from '../views/AddNewPost.vue';
import Errors from '../views/Errors.vue';
import ComponentsOverview from '../views/ComponentsOverview.vue';
import Groups from '../views/Groups.vue';
import BlogPosts from '../views/BlogPosts.vue';
import auth from './middleware/auth.js'
import middlewarePipeline from './kernel/middlewarePipeline'
Vue.use(Router);

import store from "@/store/app";
import Welcome from "../views/static/welcome";
import Login from "../views/auth/login";
import forgotPassword from "../views/auth/forgotPassword";
import Dashboard from "@/views/Dashboard.vue";

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: '',
      meta: { layout: 'no-sidebar' },
      component: Welcome,
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'no-sidebar' },
      component: Login,
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      meta: { layout: 'no-sidebar' },
      component: forgotPassword,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,

    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: '/add-new-post',
      name: 'add-new-post',
      component: AddNewPost,
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/components-overview',
      name: 'components-overview',
      component: ComponentsOverview,
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups,
    },
    {
      path: '/blog-posts',
      name: 'blog-posts',
      component: BlogPosts,
    }, {
      path: '*',
      redirect: '/errors',
    },
  ],
});




router.beforeEach((to, from, next) => {
  if(!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    router,
    store
  }

  return middleware[0]({...context, next: middlewarePipeline(context, middleware, 1)})
  // next();
})


export default router;
