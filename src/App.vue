<template>
  <component class="font-open-sans " :is="layout">
    <router-view />
  </component>
</template>

<script>
export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || "default"}-layout`;
    }
  }
};
</script>

<style>
.font-open-sans {
  font-family: "Open Sans", serif !important;
  font-style: normal;
}
.font-poppings {
  font-family: "Poppins", serif !important;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
