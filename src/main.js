/* eslint-disable */
import Vue from "vue";
import ShardsVue from "shards-vue";
import "vue-trix";
import VueAnalytics from "vue-analytics";
import store from "@/store/";

import "bootstrap/dist/css/bootstrap.css";
import "shards-ui/dist/css/shards.css";
import "@/assets/shards-dashboard-pro/shards-dashboards.scss";
import "@/assets/scss/date-range.scss";

// Core
import App from "./App.vue";
import router from "./router/router";
import VueBootstrapToasts from "vue-bootstrap-toasts";

Vue.use(VueBootstrapToasts);

Vue.use(require("vue-moment"));
// Layouts
import Default from "@/layouts/Default.vue";
import noSideBar from "@/layouts/no-sidebar.vue";
import HeaderNavigation from "@/layouts/HeaderNavigation.vue";
import IconSidebar from "@/layouts/IconSidebar.vue";
import VueMasonry from "vue-masonry-css";

Vue.use(require("vue-chartist"), {
  messageNoData: "You have not enough data",
  classNoData: "empty"
});

Vue.use(VueMasonry);
const isProd = process.env.NODE_ENV === "production";

ShardsVue.install(Vue);

Vue.component("default-layout", Default);
Vue.component("header-navigation-layout", HeaderNavigation);
Vue.component("icon-sidebar-layout", IconSidebar);
Vue.component("no-sidebar", noSideBar);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
