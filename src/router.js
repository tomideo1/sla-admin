import Vue from 'vue';
import Router from 'vue-router';
import Welcome from './views/static/welcome.vue';
import Login from './views/auth/login.vue';
import forgotPassword from './views/auth/forgotPassword.vue';
import Dashboard from './views/dashboard.vue';
import UserProfileLite from './views/UserProfileLite.vue';
import AddNewPost from './views/AddNewPost.vue';
import Errors from './views/Errors.vue';
import ComponentsOverview from './views/ComponentsOverview.vue';
import Tables from './views/Tables.vue';
import BlogPosts from './views/BlogPosts.vue';

Vue.use(Router);

export default new Router({
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
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
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
      path: '/tables',
      name: 'tables',
      component: Tables,
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
