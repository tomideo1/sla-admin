<template>
  <bar class="mt-5 ">
    <div
      class="truncate font-weight-bold font-poppings mt-2 mb-2"
      style="font-size:18px"
    >
      <div class="d-flex   align-items-center">
        <span @click="goBack"><icon size="lg" name="left" /> </span>
        <div class="text-align-center  w-100 ">
          <span>{{ heading }}</span>
        </div>
      </div>
    </div>
  </bar>
</template>
<script>
export default {
  props: ["heading"],
  components: {
    bar: () => import("@/components/SlaBar.vue"),
    Icon: () => import("@/components/SlaIcon")
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.font-poppings {
  font-family: "Poppins", serif !important;
}
</style>
