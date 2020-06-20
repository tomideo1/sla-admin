<template>
  <d-container fluid class="main-content-container px-4">
    <d-row>
      <div class="col-12 col-lg-3 col-md-6" v-if="scorecards.length > 0">
        <d-card class="m-3" v-for="(user, index) in scorecards" :key="index">
          <d-card-header class="border-bottom text-center">
            <!-- User Avatar -->
            <div class="mb-3 mx-auto">
              <sla-avatar
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
              />
            </div>

            <!-- User Name -->
            <h5 class="mb-0">{{ user.first_name }}</h5>

            <!-- User Job Title -->
            <!--          <span class="text-muted d-block mb-2">{{ userDetails.jobTitle }}</span>-->

            <!-- User Follow -->
            <p
              class="mb-2  text-uppercase
             font-weight-bold"
              style="color: #0087DB;"
            >
              <router-link to="coaches/scorecards/single"
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
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    slaAvatar: () => import("@/components/avatar.vue"),
    Icon: () => import("@/components/SlaIcon.vue")
  },
  methods: {
    ...mapActions("app/", ["getUserScoreCards"])
  },
  computed: {
    ...mapGetters({
      scorecards: "app/getUserScorecard"
    })
  },
  async mounted() {
    await this.getUserScoreCards();
  }
};
</script>

<style scoped></style>
