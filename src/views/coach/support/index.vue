<template>
  <div>
    <nav-menu :navs="navigation" />
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      navigation: {
        title: [{ name: "View All Support Ticket", path: "/support/all" }],
        actions: [{ name: "View All Support Ticket", path: "/support/all" }]
      }
    };
  },
  mounted() {
    console.log(this.navigation);
  },
  components: {
    NavMenu: () => import("@/components/NavMenu")
  }
};
</script>
<style lang="scss" scoped>
.btn-primary {
  background: #0087db;
  border-color: #0087db;
  :focus {
    color: #0087db;
  }
}
</style>
