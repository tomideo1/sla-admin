<template>
  <d-container fluid class="main-content-container px-4">
    <d-row>
      <div class="col-12 col-lg-3 col-md-6" v-show="false">
        <d-card class="m-3">
          <d-card-header class="border-bottom text-center">
            <!-- User Avatar -->
            <div class="mb-3 mx-auto">
              <avatar
                size="100"
                :url="
                  'https://res.cloudinary.com/dwpu7jpku/image/upload/v1558709245/samples/ecommerce/leather-bag-gray.jpg'
                "
              />
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
              <router-link to="/scorecards/single">View Scorecard</router-link>
            </p>
          </d-card-header>
        </d-card>
      </div>
      <div class="col">
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
    avatar: () => import("@/components/avatar.vue"),
    Icon: () => import("@/components/SlaIcon.vue")
  }
};
</script>

<style scoped></style>
