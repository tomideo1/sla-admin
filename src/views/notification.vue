<template>
  <d-container fluid class="main-content-container px-4 py-4 mt-4">
    <h5 class="text-black font-poppings font-weight-bold">Notifications</h5>
    <p class="heading text-bold font-poppings text-dark ">New</p>
    <noty :time="'2d'">
      <p>
        <b>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit
        </b>
      </p>
    </noty>
    <div v-show="false" class="col">
      <icon name="empty" class="m-3" size="retain" />
      <span
        class="font-poppings text-dark justify-content-center d-flex"
        style="font-size: 16px;"
      >
        You don’t have any notification
      </span>
    </div>
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
