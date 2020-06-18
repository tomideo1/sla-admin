<template>
  <d-container fluid class="main-content-container px-4">
    <d-row>
      <div class="col-12 col-lg-3 col-md-6" v-if="true">
        <h4 class="font-poppins text-black p-4 mt-4">Scorecards</h4>
        <d-card class="m-3">
          <d-card-header class="border-bottom text-center">
            <!-- User Avatar -->
            <div class="mb-3 mx-auto">
              <sla-avatar
                class="avatar"
                size="xl"
                :user="{ name: 'Kesha Mbatswe' }"
              />
              <!-- <sla-avatar
                class="avatar"
                v-if="user.image === null"
                size="xl"
                :user="{ name: user.first_name }"
              />
              <sla-avatar
                class="avatar"
                v-else
                size="xl"
                :user="{ image: user.image }"
              /> -->
            </div>

            <!-- User Name -->
            <h5 class="mb-0">{{ "Kesha Mbatswe" }}</h5>

            <!-- User Job Title -->
            <!--          <span class="text-muted d-block mb-2">{{ userDetails.jobTitle }}</span>-->

            <!-- User Follow -->
            <p
              class="mb-2  text-uppercase
             font-weight-bold"
              style="color: #0087DB;"
            >
              <router-link style="color: #0087DB;" to="single"
                >View Scorecard</router-link
              >
            </p>
          </d-card-header>
        </d-card>
      </div>
      <div class="col" v-else>
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any Scorecards</span
        >
      </div>
    </d-row>
  </d-container>
</template>
<script>
export default {
  components: {
    SlaAvatar: () => import("@/components/avatar.vue"),
    Icon: () => import("@/components/SlaIcon.vue")
  }
};
</script>

<style scoped></style>
