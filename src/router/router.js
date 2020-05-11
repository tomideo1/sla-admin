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
import Logout from "../views/auth/logout";
import PasswordCreate from "../views/auth/password-create";
import PasswordReset from "../views/auth/password-reset";
import forgotPassword from "../views/auth/forgotPassword";
import Dashboard from "@/views/Dashboard.vue";
import LeaderBoard from "@/views/leaderboard.vue";
import Profile from "@/views/profile.vue";
import Asset from "@/views/asset.vue";

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
      name: "",
      meta: {
        middleware: [auth]
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        middleware: [auth]
      }
    },
    {
      path: "/users",
      component: () => import("@/views/users/index.vue"),
      name: "users",
      meta: {
        middleware: [auth]
      },
      children: [
        {
          path: "all",
          name: "all-users",
          component: () => import("@/views/users/home.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "create",
          name: "create-user",
          component: () => import("@/views/users/create.vue"),
          meta: {
            middleware: [auth]
          }
        }
      ]
    },
    {
      path: "/courses",
      component: () => import("@/views/courses/index.vue"),
      name: "courses",
      meta: {
        middleware: [auth]
      },
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
        },
        {
          path: "schedule",
          name: "schedule-courses",
          component: () => import("@/views/courses/scheduled.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "save",
          name: "saved-courses",
          component: () => import("@/views/courses/save.vue"),
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
      name: "groups",
      component: () => import("@/views/groups/index.vue"),
      children: [
        {
          path: "all",
          name: "all-groups",
          component: () => import("@/views/groups/home.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "create",
          name: "create-group",
          component: () => import("@/views/groups/create.vue"),
          meta: {
            middleware: [auth]
          }
        }
      ]
    },
    {
      path: "/announcements",
      meta: {
        middleware: [auth]
      },
      name: "announcements",
      component: () => import("@/views/announcement/index.vue"),
      children: [
        {
          path: "all",
          name: "all-announcements",
          component: () => import("@/views/announcement/home.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "create",
          name: "create-announcement",
          component: () => import("@/views/announcement/create.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "edit",
          name: "edit-announcement",
          component: () => import("@/views/announcement/edit.vue"),
          meta: {
            middleware: [auth]
          }
        }
      ]
    },
    {
      path: "/surveys",
      meta: {
        middleware: [auth]
      },
      name: "surveys",
      component: () => import("@/views/survey/index.vue"),
      children: [
        {
          path: "all",
          name: "all-surveys",
          component: () => import("@/views/survey/home.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "create",
          name: "create-survey",
          component: () => import("@/views/survey/create.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "edit",
          name: "edit-survey",
          component: () => import("@/views/survey/edit.vue"),
          meta: {
            middleware: [auth]
          }
        }
      ]
    },
    {
      path: "/polls",
      meta: {
        middleware: [auth]
      },
      name: "polls",
      component: () => import("@/views/poll/index.vue"),

      children: [
        {
          path: "",
          name: "all-polls",
          component: () => import("@/views/poll/home.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "create",
          name: "create-poll",
          component: () => import("@/views/poll/create.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "edit",
          name: "edit-polls",
          component: () => import("@/views/poll/edit.vue"),
          meta: {
            middleware: [auth]
          }
        }
      ]
    },
    {
      path: "/scorecards",
      meta: {
        middleware: [auth]
      },
      name: "scorecards",
      component: () => import("@/views/scoreCard/index.vue"),

      children: [
        {
          path: "all",
          name: "all-scorecards",
          component: () => import("@/views/scoreCard/home.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "create",
          name: "create-scorecard",
          component: () => import("@/views/scoreCard/create.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "single",
          name: "single-scorecard",
          component: () => import("@/views/scoreCard/single.vue"),
          meta: {
            middleware: [auth]
          }
        }
      ]
    },
    {
      path: "/resources",
      meta: {
        middleware: [auth]
      },
      name: "resources",
      component: () => import("@/views/resources/index.vue"),

      children: [
        {
          path: "all",
          name: "all-resources",
          component: () => import("@/views/resources/home.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "create",
          name: "create-resources",
          component: () => import("@/views/resources/create.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "schedule",
          name: "scheduled-resources",
          component: () => import("@/views/resources/scheduled.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "save",
          name: "saved-resources",
          component: () => import("@/views/resources/saved.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "single",
          name: "single-resources",
          component: () => import("@/views/resources/single.vue"),
          meta: {
            middleware: [auth]
          }
        }
      ]
    },
    {
      path: "/support",
      meta: {
        middleware: [auth]
      },
      name: "support",
      component: () => import("@/views/support/index.vue"),
      children: [
        {
          path: "all",
          name: "all-tickets",
          component: () => import("@/views/support/home.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "single",
          name: "single-ticket",
          component: () => import("@/views/support/single.vue"),
          meta: {
            middleware: [auth]
          }
        }
      ]
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: LeaderBoard,
      meta: {
        middleware: [auth]
      }
    },
    {
      path: "/assets",
      name: "assets",
      component: Asset,
      meta: {
        middleware: [auth]
      }
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
          component: () => import("@/views/coaches/home.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "/",
          name: "all-coaches",
          component: () => import("@/views/coaches/home.vue"),
          meta: {
            middleware: [auth]
          }
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
          component: () => import("@/views/messages/home.vue"),
          meta: {
            middleware: [auth]
          }
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
          component: () => import("@/views/admin/index.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "/all-admins",
          name: "all-admins",
          component: () => import("@/views/admin/all-admins.vue"),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "/create-admin",
          name: "create-admin",
          component: () => import("@/views/admin/createAdmin.vue"),
          meta: {
            middleware: [auth]
          }
        }
      ]
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        middleware: [auth]
      }
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: "no-sidebar" },
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
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
