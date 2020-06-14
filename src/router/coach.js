import Errors from "../views/common/Errors.vue";
import auth from "./middleware/auth.js";
import Login from "../views/auth/login";
import Logout from "../views/auth/logout";
import PasswordCreate from "../views/auth/password-create";
import PasswordReset from "../views/auth/password-reset";
import SettingsPasswordReset from "../views/auth/settings-password-reset";
import forgotPassword from "../views/auth/forgotPassword";
import Dashboard from "@/views/Dashboard.vue";

export default [
  {
    path: "/coach",
    name: "coach-dashboard",
    component: Dashboard,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: "/announcement/coach",
    name: "coach-announcement-home",
    meta: {
      middleware: [auth]
    },
    component: () => import("@/views/coach/announcement/index"),
    children: [
      {
        path: "",
        name: "announcement-all",
        component: () => import("@/views/coach/announcement/home.vue")
      },
      {
        path: "/single/:id",
        name: "coach-single-announcement",
        component: () => import("@/views/coach/announcement/single.vue")
      }
    ]
  },
  {
    path: "/resources/coach",
    name: "coach-resource-home",
    component: () => import("@/views/coach/resources/home")
  },
  {
    path: "/users/coach",
    component: () => import("@/views/coach/users/index.vue"),
    name: "coach-users-home",
    meta: {
      middleware: [auth]
    },
    children: [
      {
        path: "",
        name: "coach-users-all",
        component: () => import("@/views/coach/users/home.vue")
      },
      {
        path: "/single/:id",
        name: "coach-single-user",
        component: () => import("@/views/coach/users/single.vue"),
        meta: {
          middleware: [auth]
        }
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
