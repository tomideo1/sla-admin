<template>
  <div>
    <nav-menu :navs="navigation" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      navigation: {
        title: [{ name: "App Settings", path: "/app-settings/" }],
        actions: [{ name: "Update", path: "/app-settings/" }]
      }
    };
  },
  components: {
    NavMenu: () => import("@/components/NavMenu")
  }
};
</script>

<style scoped></style>
