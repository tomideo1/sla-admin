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
          { name: "Course Create", path: "/courses/create" },
          { name: "Courses Library", path: "/courses/all" },
          { name: "Scheduled Courses", path: "/courses/schedule" },
          { name: "Saved Courses", path: "/courses/save" }
        ],
        actions: [
          { name: "create", path: "/courses/create" },
          { name: "view all", path: "/courses/all" },
          { name: "schedule", path: "/courses/schedule" },
          { name: "saved", path: "/courses/save" }
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
