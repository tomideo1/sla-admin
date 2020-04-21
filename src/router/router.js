import Vue from "vue";
import Router from "vue-router";

import UserProfileLite from "../views/common/UserProfileLite.vue";
import AddNewPost from "../views/common/AddNewPost.vue";
import Errors from "../views/common/Errors.vue";
import ComponentsOverview from "../views/common/ComponentsOverview.vue";
import Groups from "../views/common/Groups.vue";
import BlogPosts from "../views/common/BlogPosts.vue";
import auth from "./middleware/auth.js";
import middlewarePipeline from "./kernel/middlewarePipeline";
Vue.use(Router);

import store from "@/store/index";
import Welcome from "../views/static/welcome";
import Login from "../views/auth/login";
import PasswordCreate from "../views/auth/password-create";
import PasswordReset from "../views/auth/password-reset";
import forgotPassword from "../views/auth/forgotPassword";
import Dashboard from "@/views/Dashboard.vue";

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        middleware: [auth]
      }
    },
    {
      path: "/courses",
      component: () => import("@/views/courses/index.vue"),
      name: "courses",
      children: [
        {
          path: "all",
          name: "all-courses",
          component: () => import("@/views/courses/home.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "create",
          name: "create-course",
          component: () => import("@/views/courses/create.vue"),
          meta: {
            middleware: [auth]
          }
        }
      ]
    },
    {
      path: "/groups",
      meta: {
        middleware: [auth]
      },
      component: () => import("@/views/groups/index.vue"),
      children: [
        {
          path: "",
          name: "all-groups",
          component: () => import("@/views/groups/home.vue")
        },
        {
          path: "/",
          name: "all-groups",
          component: () => import("@/views/groups/home.vue")
        }
      ]
    },
    {
      path: "/announcements",
      meta: {
        middleware: [auth]
      },
      component: () => import("@/views/announcement/index.vue"),
      children: [
        {
          path: "",
          name: "all-announcements",
          component: () => import("@/views/announcement/home.vue")
        },
        {
          path: "create",
          name: "create-announcement",
          component: () => import("@/views/announcement/create.vue")
        },
        {
          path: "edit",
          name: "edit-announcement",
          component: () => import("@/views/announcement/edit.vue")
        }
      ]
    },
    {
      path: "/coaches",
      meta: {
        middleware: [auth]
      },
      component: () => import("@/views/coaches/index.vue"),
      children: [
        {
          path: "",
          name: "all-coaches",
          component: () => import("@/views/coaches/home.vue")
        },
        {
          path: "/",
          name: "all-coaches",
          component: () => import("@/views/coaches/home.vue")
        }
      ]
    },
    {
      path: "/messages",
      meta: {
        middleware: [auth]
      },
      component: () => import("@/views/messages/index.vue"),
      children: [
        {
          path: "/",
          name: "all-messages",
          component: () => import("@/views/messages/home.vue")
        }
      ]
    },
    {
      path: "/admin",
      component: () => import("@/views/admin/index.vue"),
      children: [
        {
          path: "/",
          name: "admin",
          component: () => import("@/views/admin/index.vue")
        },
        {
          path: "/all-admins",
          name: "all-admins",
          component: () => import("@/views/admin/all-admins.vue")
        },
        {
          path: "/profile",
          name: "edit-profile",
          component: () => import("@/views/admin/adminProfile.vue")
        },
        {
          path: "/create-admin",
          name: "create-admin",
          component: () => import("@/views/admin/createAdmin.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: "no-sidebar" },
      component: Login
    },
    {
      path: "/admin/password-create",
      name: "password-create",
      meta: { layout: "no-sidebar" },
      component: PasswordCreate
    },
    {
      path: "/admin/password-reset",
      name: "password-reset",
      meta: { layout: "no-sidebar" },
      component: PasswordReset
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      meta: { layout: "no-sidebar" },
      component: forgotPassword
    },
    {
      path: "/errors",
      name: "errors",
      meta: { layout: "no-sidebar" },
      component: Errors
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to);

  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    router,
    store
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

export default router;
