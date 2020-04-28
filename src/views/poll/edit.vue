<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title text-dark">
          <span style="position:relative; left: -10px">
            <icon size="lg" name="left" />
          </span>
          Edit Announcement
        </h3>
      </d-col>
    </d-row>
    <d-row no-gutters class="py-4">
      <d-form class="col-md-6">
        <d-input size="lg" class="mb-3" placeholder=" Title" />
        <div class="form-group">
          <d-select :value="null" class="col-md-3">
            <option :value="null">To Everyone</option>
            <option>Participant</option>
            <option>Admins</option>
            <option>Coaches</option>
          </d-select>
        </div>
        <d-button class=" btn-outline-primary col-md-5 m-2" outline
          >SCHEDULE</d-button
        >
        <d-button class="btn-primary col-md-5 m-2">SAVE CHANGES</d-button>
      </d-form>
    </d-row>
  </d-container>
</template>

<script>
export default {
  name: "edit",
  components: {
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped>
.btn-primary {
  background-color: #0087db !important;
}
.btn-outline-primary {
  border-color: #0087db !important;
}
</style>
