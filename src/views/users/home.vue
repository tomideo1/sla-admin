<template>
  <d-container fluid>
    <d-row>
      <div class="col-12 col-lg-3 col-md-6" v-for="i in 20">
        <d-card class="m-3">
          <d-card-header class="border-bottom text-center">
            <!-- User Avatar -->
            <div class="mb-3 mx-auto">
              <img
                class="rounded-circle"
                src="@/assets/images/user-profile/leader.png"
                width="110"
              />
            </div>

            <!-- User Name -->
            <h5 class="mb-0">{{ "Kesha Mbatswe" }}</h5>

            <!-- User Job Title -->
            <!--          <span class="text-muted d-block mb-2">{{ userDetails.jobTitle }}</span>-->

            <!-- User Follow -->
            <p class="mb-2 text-primary font-weight-bold">View Profile</p>
          </d-card-header>
        </d-card>
      </div>
    </d-row>
  </d-container>
</template>
<script>
export default {
  name: "home"
};
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  width: 100px !important;
  height: 100px !important;
}
</style>
