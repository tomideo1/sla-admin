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
          { name: "Create Poll", path: "/polls/create" },
          { name: "View All Polls", path: "/polls/all" },
          { name: "View Saved Polls", path: "/polls/save" },
          { name: "View Scheduled Polls", path: "/polls/schedule" }
        ],
        actions: [
          { name: "create", path: "/polls/create" },
          { name: "view all", path: "/polls/all" },
          { name: "schedule", path: "/polls/schedule" },
          { name: "Save", path: "/polls/save" }
        ]
      }
    };
  },
  mounted() {},
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
