<template>
  <d-navbar-nav class="flex-row ">
    <li class="nav-item   dropdown notifications">
      <a class="nav-link mt-2 text-center" v-d-toggle.notifications>
        <icon size="xs" name="bell" />
      </a>
      <!--      <d-collapse id="notifications" class="dropdown-menu dropdown-menu-small">-->
      <!--        <d-dropdown-item>-->
      <!--          Notifications-->
      <!--        </d-dropdown-item>-->
      <!--        <d-dropdown-item class="notification__all text-center">-->
      <!--          <router-link to="/notification">-->
      <!--            View all Notifications-->
      <!--          </router-link>-->
      <!--        </d-dropdown-item>-->
      <!--      </d-collapse>-->
    </li>
    <li class="nav-item   dropdown messages">
      <router-link
        to="/notification"
        class="nav-link mt-2 text-center notification-icon"
        v-d-toggle.messages
      >
        <span class="notification-count">{{ Admin.notificationCounter }}</span>
        <icon size="xs" name="message" />
      </router-link>
      <!--      <d-collapse id="messages" class="dropdown-menu dropdown-menu-small">-->
      <!--        <d-dropdown-item>-->
      <!--          Messages-->
      <!--        </d-dropdown-item>-->
      <!--        <d-dropdown-item class="notification__all text-center"-->
      <!--          >View all Messages</d-dropdown-item-->
      <!--        >-->
      <!--      </d-collapse>-->
    </li>
    <li class="nav-item  ">
      <router-link :to="{ name: 'settings' }" class="nav-link mt-2 text-center">
        <icon size="xs" name="setting" />
      </router-link>
    </li>
    <li class="nav-item mr-2 dropdown border-left">
      <router-link
        class="nav-link  text-nowrap px-3 mt-2"
        :to="{ name: 'profile', params: { admin: Admin } }"
      >
        <b>{{ Admin.first_name + " " + Admin.last_name }}</b> &nbsp;
        <img
          class="user-avatar rounded-circle  "
          width="25px"
          src="@/assets/images/avatars/user.png"
          alt="User Avatar"
        />
      </router-link>
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
  },
  components: {
    Icon: () => import("@/components/SlaIcon.vue")
  }
};
</script>
<style lang="css" scoped>
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
.main-navbar .navbar .nav-link {
  min-width: 2.45rem;
}

.notification-icon {
  position: relative;
}
.notification-count {
  position: absolute;
  left: 55.02%;
  bottom: 45.04%;
  border-radius: 50% 50%;
  color: white;
  background: #fe4437;
  font-size: 10px;
  text-align: center;
  width: 15px;
  height: 15px;
}
</style>
