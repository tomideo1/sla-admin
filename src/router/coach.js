import Errors from "../views/common/Errors.vue";
import auth from "./middleware/auth.js";
import Login from "../views/auth/login";
import Logout from "../views/auth/logout";
import PasswordCreate from "../views/auth/password-create";
import PasswordReset from "../views/auth/password-reset";
import SettingsPasswordReset from "../views/auth/settings-password-reset";
import forgotPassword from "../views/auth/forgotPassword";

export default [
  {
    path: "/coach",
    name: "coach-dashboard",
    component: () => import("@/views/coach/Dashboard.vue"),
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/coach/announcement",
    name: "coach-announcement-home",
    meta: {
      middleware: [auth]
    },
    component: () => import("@/views/coach/announcement/index"),
    children: [
      {
        path: "all",
        name: "coach-announcement-all",
        component: () => import("@/views/coach/announcement/home.vue")
      },
      {
        path: "single/:id",
        name: "coach-single-announcement",
        component: () => import("@/views/coach/announcement/single.vue")
      }
    ]
  },
  {
    path: "/coach/resources",
    name: "coach-resource-home",
    component: () => import("@/views/coach/resources/home")
  },
  {
    path: "/coach/users",
    component: () => import("@/views/coach/users/index.vue"),
    name: "coach-users-home",
    meta: {
      middleware: [auth]
    },
    children: [
      {
        path: "all",
        name: "coach-users-all",
        component: () => import("@/views/coach/users/home.vue")
      },
      {
        path: "single/:id",
        name: "coach-single-user",
        component: () => import("@/views/coach/users/single.vue"),
        meta: {
          middleware: [auth]
        }
      }
    ]
  },
  {
    path: "/coach/help",
    component: () => import("@/views/coach/support/index.vue"),
    name: "coach-help-home",
    meta: {
      middleware: [auth]
    },
    children: [
      {
        path: "all",
        name: "coach-help-all",
        component: () => import("@/views/coach/support/home.vue")
      },
      {
        path: "single/:id",
        name: "coach-single-user",
        component: () => import("@/views/coach/users/single.vue"),
        meta: {
          middleware: [auth]
        }
      }
    ]
  },
  {
    path: "/coach/survey",
    component: () => import("@/views/coach/survey/index.vue"),
    name: "coach-help-home",
    meta: {
      middleware: [auth]
    },
    children: [
      {
        path: "all",
        name: "coach-survey-all",
        component: () => import("@/views/coach/survey/home.vue")
      },
      {
        path: "single/:id",
        name: "coach-single-user",
        component: () => import("@/views/coach/survey/single.vue"),
        meta: {
          middleware: [auth]
        }
      }
    ]
  },
  {
    path: "/coach/scorecards",
    meta: {
      middleware: [auth]
    },
    name: "coach-scorecards",
    component: () => import("@/views/coach/scoreCard/index.vue"),

    children: [
      {
        path: "all",
        name: "all-coach-scorecards",
        component: () => import("@/views/coach/scoreCard/home.vue"),
        meta: {
          middleware: [auth]
        }
      },

      {
        path: "single/:id",
        name: "single-user-scorecard",
        component: () => import("@/views/coach/scoreCard/single.vue"),
        meta: {
          middleware: [auth]
        }
      },

      {
        path: "create/:id",
        name: "create-user-scorecard",
        component: () => import("@/views/coach/scoreCard/create.vue"),
        meta: {
          middleware: [auth]
        }
      }
    ]
  },
  {
    path: "/profile",
    name: "coach-profile",
    component: () => import("@/views/coach/profile.vue"),
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
    path: "/admin/settings/password-reset",
    name: "settings-password-resetsettings-password-reset",
    meta: { layout: "no-sidebar" },
    component: SettingsPasswordReset
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
];
