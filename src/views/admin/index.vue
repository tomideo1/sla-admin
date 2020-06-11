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
          { name: "Admin Create", path: "/admin/create" },
          { name: "View All Admins", path: "/admin/all" }
        ],
        actions: [
          { name: "create", path: "/admin/create" },
          { name: "view all", path: "/admin/all" }
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
