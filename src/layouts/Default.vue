<template>
  <d-container fluid>
    <d-row class="bg-white">
      <!-- Main Sidebar -->
      <main-sidebar :items="sidebarItems" />

      <d-col class="main-content " tag="main">
        <!-- Main Navbar -->
        <!--        <main-navbar />-->

        <!-- Content -->
        <div class="offset-lg-1 offset-md-1">
          <slot />
        </div>

        <!-- Main Footer -->
        <!--        <main-footer />-->
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import getSidebarItems from "@/data/sidebar-nav-items";

// Main layout components
import MainNavbar from "@/components/layout/MainNavbar/MainNavbar.vue";
import MainSidebar from "@/layouts/IconSidebar.vue";
// import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';
import MainFooter from "@/components/layout/MainFooter/MainFooter.vue";

export default {
  name: "analytics",
  components: {
    MainNavbar,
    MainSidebar,
    MainFooter
  },
  data() {
    return {
      sidebarItems: getSidebarItems()
    };
  }
};
</script>
<style lang="scss">
body {
  background: #ffffff !important;
}
</style>
