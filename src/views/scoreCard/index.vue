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
        title: [
          { name: "Create New Scorecard ", path: "/scorecards/create" },
          { name: "View All  Scorecard", path: "/scorecards/all" }
        ],
        actions: [
          { name: "create", path: "/scorecards/create" },
          { name: "view all", path: "/scorecards/all" }
        ]
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
<style lang="scss" scoped></style>
