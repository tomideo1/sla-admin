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
        title: [
          { name: "Industry Create", path: "/industry/create" },
          { name: "View Industry", path: "/industry/all" }
        ],
        actions: [
          { name: "create", path: "/industry/create" },
          { name: "view all", path: "/industry/all" }
        ]
      }
    };
  },
  components: {
    NavMenu: () => import("@/components/NavMenu")
  }
};
</script>

<style scoped></style>
