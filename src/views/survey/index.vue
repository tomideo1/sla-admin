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
          { name: "Survey Create", path: "/surveys/create" },
          { name: "View All Survey", path: "/surveys/all" },
          { name: "Scheduled Survey", path: "/surveys/schedule" },
          { name: "Saved Survey", path: "/surveys/save" }
        ],
        actions: [
          { name: "create", path: "/surveys/create" },
          { name: "view all", path: "/surveys/all" },
          { name: "schedule", path: "/surveys/schedule" },
          { name: "saved", path: "/surveys/save" }
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
