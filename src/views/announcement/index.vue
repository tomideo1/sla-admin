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
          { name: "Announcement Create", path: "/announcements/create" },
          { name: "View All Announcement", path: "/announcements/all" },
          { name: "Scheduled Announcement", path: "/announcements/schedule" },
          { name: "Saved Announcement", path: "/announcements/save" }
        ],
        actions: [
          { name: "create", path: "/announcements/create" },
          { name: "view all", path: "/announcements/all" },
          { name: "schedule", path: "/announcements/schedule" },
          { name: "saved", path: "/announcements/save" }
        ]
      }
    };
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
