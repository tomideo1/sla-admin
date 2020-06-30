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
          { name: "Create Resource", path: "/resources/create" },
          { name: "View All  Resource", path: "/resources/all" },
          { name: "Scheduled Resources", path: "/resources/schedule" },
          { name: "Saved Resources", path: "/resources/save" }
        ],
        actions: [
          { name: "create", path: "/resources/create" },
          { name: "view all", path: "/resources/all" },
          { name: "schedule", path: "/resources/schedule" },
          { name: "saved", path: "/resources/save" }
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
<style lang="scss" scoped>
.btn-primary {
  background: #0087db;
  border-color: #0087db;
  :focus {
    color: #0087db;
  }
}
</style>
