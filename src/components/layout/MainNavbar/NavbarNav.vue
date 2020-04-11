<template>
  <d-navbar-nav class="flex-row ">
    <li class="nav-item mr-5 dropdown border-left">
      <a class="nav-link  text-nowrap px-3 mt-2" v-d-toggle.user-actions>
        <b>{{ Admin.first_name + " " + Admin.last_name }}</b> &nbsp;
        <img
          class="user-avatar rounded-circle mr-2 "
          width="25px"
          src="@/assets/images/avatars/user.png"
          alt="User Avatar"
        />
      </a>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item to="/"
          ><i class="material-icons">dashboard</i> Dashboard</d-dropdown-item
        >
        <d-dropdown-item to="courses"
          ><i class="material-icons">library_books</i> Courses</d-dropdown-item
        >
        <d-dropdown-item to="messages"
          ><i class="material-icons">message</i> Messages</d-dropdown-item
        >
        <d-dropdown-item to="coaches"
          ><i class="material-icons">school</i> Coaches</d-dropdown-item
        >
        <d-dropdown-item to="profile"
          ><i class="material-icons">&#xE8B8;</i> Edit Profile</d-dropdown-item
        >

        <d-dropdown-divider />
        <d-dropdown-item to="login" class="text-danger">
          <i class="material-icons text-danger">&#xE879;</i> Logout
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      Admin: "auth/getAdmin"
    })
  }
};
</script>
<style>
.nav-link:hover {
  cursor: pointer;
}

/* IE11 Navbar flex fix. */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .navbar-nav {
    align-items: stretch !important;
    flex: 1 1 100%;
    flex-flow: row wrap;
  }

  .nav-item.notifications {
    margin-left: auto !important;
  }
}
</style>
