<template>
  <aside
    :class="[
      'main-sidebar',
      'col-12',
      'col-md-3',
      'col-lg-2',
      'px-0',
      sidebarVisible ? 'open' : ''
    ]"
  >
    <div class="main-navbar">
      <nav
        class="navbar align-items-stretch navbar-light bg-primary flex-md-nowrap border-bottom p-0"
      >
        <a class="navbar-brand w-100 mr-0" href="#" style="line-height: 25px; ">
          <div class="d-table m-auto">
            <img
              id="main-logo"
              class=""
              style="max-height:23px;max-width: 59.99px;"
              src="https://res.cloudinary.com/sla-sheleadsafrica/image/upload/v1594840037/SLA_Logo_Color_3_ew0uba.png"
              alt="Shards Dashboard"
            />
            <span v-if="!hideLogoText" class="d-none d-md-inline ml-1"></span>
          </div>
        </a>
        <a
          class="toggle-sidebar d-sm-inline text-white d-md-none d-lg-none"
          @click="handleToggleSidebar()"
          style="border-left:none!important; "
        >
          <i class="material-icons">&#xE5C4;</i>
        </a>
      </nav>
    </div>

    <form
      action="#"
      class="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none"
    >
      <div class="input-group input-group-seamless ml-3">
        <input
          class="navbar-search form-control"
          type="text"
          aria-label="Search"
        />
        <div class="input-group-append">
          <div class="input-group-text">
            <i class="fas fa-search"></i>
          </div>
        </div>
      </div>
    </form>

    <div class="nav-wrapper bg-primary text shadow " style="overflow-y: auto">
      <div v-if="items" v-for="(nav, navIdx) in items" :key="navIdx">
        <d-nav
          v-if="typeof nav.items !== 'undefined' && nav.items.length"
          class="nav--no-borders flex-column"
          style="cursor: pointer;"
        >
          <li
            v-for="(item, navItemIdx) in nav.items"
            :key="navItemIdx"
            class="nav-item dropdown"
          >
            <router-link
              :class="[
                'nav-link',
                item.items && item.items.length ? 'dropdown-toggle' : ''
              ]"
              :to="item.to"
              v-d-toggle="`snc-${navIdx}-${navItemIdx}`"
            >
              <div class="d-flex flex-row " v-if="item.htmlBefore">
                <icon
                  class="mr-2"
                  size="xs"
                  v-if="item.htmlBefore"
                  :name="item.htmlBefore"
                  style="opacity: 1"
                />
                <span v-if="item.title">{{ item.title }}</span>
              </div>
              <div
                class="item-icon-wrapper"
                v-if="item.htmlAfter"
                v-html="item.htmlAfter"
              >
                <icon
                  class="m-2"
                  size="xs"
                  v-if="item.htmlAfter"
                  :name="item.htmlAfter"
                />
              </div>
            </router-link>
            <d-collapse
              v-if="item.items && item.items.length"
              :id="`snc-${navIdx}-${navItemIdx}`"
              class="dropdown-menu dropdown-menu-small"
              accordion="sidebar-items-accordion"
            >
              <d-dropdown-item
                v-for="(subItem, subItemIdx) in item.items"
                :key="subItemIdx"
                :href="subItem.href"
                :to="subItem.to"
                :class="['bg-primary', 'text-white']"
              >
                {{ subItem.title }}
              </d-dropdown-item>
            </d-collapse>
          </li>
        </d-nav>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "main-sidebar",
  props: {
    /**
     * Whether to hide the logo text, or not.
     */
    hideLogoText: {
      type: Boolean,
      default: false
    },
    /**
     * The menu items.
     */
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sidebarVisible: false
    };
  },
  created() {
    this.$eventHub.$on("toggle-sidebar", this.handleToggleSidebar);
  },
  beforeDestroy() {
    this.$eventHub.$off("toggle-sidebar");
  },
  components: {
    Icon: () => import("@/components/SlaIcon.vue")
  },
  methods: {
    handleToggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-sidebar {
  .item-icon-wrapper {
    display: inline-block;
  }
  .dropdown-menu {
    display: block;
  }
}

.bg-primary {
  background: #0087db !important;
}
* {
  border: none !important;
}

.nav .nav-item {
  .nav-link {
    color: #ffffff !important;
    background: #0087db !important;
  }
  .nav-link:hover {
    background: #186bb4 !important;
    box-shadow: inset 0.1875rem 0 0 #e1e5eb;
  }
  .nav-link.active {
    background: #186bb4 !important;
    box-shadow: inset 0.1875rem 0 0 #e1e5eb;
    i {
      color: #ffffff !important;
    }
  }
  .active {
    box-shadow: inset 0.1875rem 0 0 #e1e5eb;
  }
}
</style>
