<template>
  <d-container fluid class="main-content-container px-4 py-4 mt-4">
    <h5 class="text-black font-poppings font-weight-bold">Notifications</h5>
    <p class="heading text-bold m-3 ">New</p>
    <noty :actions="'reply'" :icon="'like'" :time="'2d'">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
        purus sit
      </p>
    </noty>
  </d-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {
    Noty: () => import("@/components/slaNotyCard"),
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style></style>
