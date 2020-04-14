<template>
  <d-form class="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
    <d-input-group class="ml-3" seamless>
      <d-input class="navbar-search" />
      <div class="input-group-text" style="border: none">
        <icon size="xs" name="search" />
      </div>
    </d-input-group>
  </d-form>
</template>
<script>
export default {
  components: {
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>
