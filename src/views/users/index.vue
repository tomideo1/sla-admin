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
          { name: "Create New Participant ", path: "/users/create" },
          { name: "View All  Participant", path: "/users/all" },
          {
            name: "Create New Coach  Paricipant",
            path: "/users/coaches/create"
          },
          { name: "View All  Coaches", path: "/users/coaches/all" }
        ],
        actions: [
          { name: "Create New Participant", path: "/users/create" },
          { name: "View all Participants", path: "/users/all" },
          { name: "Create New coach", path: "/users/coaches/create" },
          { name: "view all Coaches", path: "/users/coaches/all" }
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
