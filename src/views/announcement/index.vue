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
          { name: "Announcement Create", path: "/announcement/create" },
          { name: "View All Announcement", path: "/announcement/all" },
          { name: "Scheduled Announcement", path: "/announcement/schedule" },
          { name: "Saved Announcement", path: "/announcement/save" }
        ],
        actions: [
          { name: "create", path: "/announcement/create" },
          { name: "view all", path: "/announcement/all" },
          { name: "schedule", path: "/announcement/schedule" },
          { name: "saved", path: "/announcement/save" }
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
