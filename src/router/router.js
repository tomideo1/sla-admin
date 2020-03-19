import Vue from 'vue';
import Router from 'vue-router';

import UserProfileLite from '../views/common/UserProfileLite.vue';
import AddNewPost from '../views/common/AddNewPost.vue';
import Errors from '../views/common/Errors.vue';
import ComponentsOverview from '../views/common/ComponentsOverview.vue';
import Groups from '../views/common/Groups.vue';
import BlogPosts from '../views/common/BlogPosts.vue';
import auth from './middleware/auth.js'
import middlewarePipeline from './kernel/middlewarePipeline'
Vue.use(Router);

import store from "@/store/app";
import Welcome from "../views/static/welcome";
import Login from "../views/auth/login";
import PasswordCreate from "../views/auth/password-create";
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
      name: 'dashboard',
      component: Dashboard,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: '/courses',
      meta: {
        middleware: [
          auth
        ]
      },
      component: () => import("@/views/courses/index.vue"),
      children: [
        {
          path: '',
          name: 'all-courses',
          component: () => import("@/views/courses/home.vue")
        }
      ],
    },
    {
      path: '/groups',
      meta: {
        middleware: [
          auth
        ]
      },
      component: () => import("@/views/groups/index.vue"),
      children: [
        {
          path: '',
          name: 'all-groups',
          component: () => import("@/views/groups/home.vue")
        },
        {
          path: '/',
          name: 'all-groups',
          component: () => import("@/views/groups/home.vue")
        }
      ]
    },
    {
      path: '/coaches',
      meta: {
        middleware: [
          auth
        ]
      },
      component: () => import("@/views/coaches/index.vue"),
      children: [
        {
          path: '',
          name: 'all-coaches',
          component: () => import("@/views/coaches/home.vue")
        },
        {
          path: '/',
          name: 'all-coaches',
          component: () => import("@/views/coaches/home.vue")
        }
      ]
    },
    {
      path: '/messages',
      meta: {
        middleware: [
          auth
        ]
      },
      component: () => import("@/views/messages/index.vue"),
      children: [
        {
          path: '/',
          name: 'all-messages',
          component: () => import("@/views/messages/home.vue")
        },
      ]
    },
    {
      path: '/admin',
      meta: {
        middleware: [
          auth
        ]
      },
      component: () => import("@/views/admin/index.vue"),
      children: [
        {
          path: '/',
          name: 'edit-profile',
          component: () => import("@/views/admin/adminProfile.vue")
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'no-sidebar' },
      component: Login,
    },
    {
      path: '/password-create',
      name: 'password-create',
      meta: { layout: 'no-sidebar' },
      component: PasswordCreate,
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      meta: { layout: 'no-sidebar' },
      component: forgotPassword,
    },
    {
      path: '/errors',
      name: 'errors',
      meta: { layout: 'no-sidebar' },
      component: Errors,
    },
    {
      path: '*',
      meta: { layout: 'no-sidebar' },
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
})


export default router;
