<template>
  <footer class="main-footer d-flex p-2 px-3 bg-white border-top">
    <div :class="[contained ? 'container' : 'container-fluid']">
      <div class="row">
        <ul class="nav">
          <li v-for="(item, idx) in menuItems" :key="idx" class="nav-item">
            <router-link class="nav-link" :to="item.to">{{
              item.title
            }}</router-link>
          </li>
        </ul>
        <span class="copyright ml-auto my-auto mr-2 mt-4">{{ copyright }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "main-footer",
  props: {
    /**
     * The footer menu items.
     */
    menuItems: {
      type: Object,
      default() {
        return {};
      }
    },

    /**
     * The copyright information.
     */
    copyright: {
      type: String,
      default: "Copyright © " + new Date().getFullYear() + " SheLeads Africa"
    },

    /**
     * Whether the footer should be wrapped in a container, or not.
     */
    contained: {
      type: Boolean,
      default: false
    }
  }
};
</script>
