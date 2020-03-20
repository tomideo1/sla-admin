<template>
  <d-navbar-nav class="flex-row">
    <li class="nav-item border-left border-right dropdown notifications">
      <a class="nav-link nav-link-icon text-center" v-d-toggle.notifications>
        <div class="nav-link-icon__wrapper">
          <i class="material-icons">&#xE7F4;</i>
          <d-badge pill theme="danger">0</d-badge>
        </div>
      </a>
      <d-collapse id="notifications" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item>

        </d-dropdown-item>
        <d-dropdown-item class="notification__all text-center">View all Notifications</d-dropdown-item>
      </d-collapse>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle text-nowrap px-3" v-d-toggle.user-actions>
        <img class="user-avatar rounded-circle mr-2" src="@/assets/images/avatars/user.png" alt="User Avatar"> <span class="d-none d-md-inline-block">
        Admin
      </span>
      </a>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item to="/"><i class="material-icons">dashboard</i> Dashboard</d-dropdown-item>
        <d-dropdown-item to="courses"><i class="material-icons">library_books</i> Courses</d-dropdown-item>
        <d-dropdown-item to="messages"><i class="material-icons">message</i> Messages</d-dropdown-item>
        <d-dropdown-item to="coaches"><i class="material-icons">school</i> Coaches</d-dropdown-item>
        <d-dropdown-item to="profile"><i class="material-icons">&#xE8B8;</i> Edit Profile</d-dropdown-item>

        <d-dropdown-divider />
        <d-dropdown-item to="login" class="text-danger">
          <i class="material-icons text-danger">&#xE879;</i> Logout
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>

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
