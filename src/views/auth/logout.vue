<template> </template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "logout",
  methods: {
    ...mapActions("auth/", ["Logout"])
  },
  async mounted() {
    await this.Logout();
    this.$router.push({ path: "/login" });
  }
};
</script>

<style scoped></style>
