<template>
  <d-container fluid class="main-content-container px-4">
    <h4 class="font-poppins text-black p-4 mt-4">Scorecards</h4>
    <d-row>
      <div
        v-if="scorecards.length > 0"
        class="col-lg-3 col-md-6 col-12"
        v-for="(data, index) in scorecards"
        :key="index"
      >
        <d-card class="m-3 ">
          <d-card-header class="border-bottom text-center">
            <!-- User Avatar -->
            <div class="mb-3 mx-auto">
              <sla-avatar
                class="avatar"
                v-if="data.user.image === null"
                size="xl"
                :user="{ name: data.user.first_name }"
              />
              <sla-avatar
                class="avatar"
                v-else
                size="xl"
                :user="{ image: data.user.image }"
              />
            </div>

            <!-- User Name -->
            <h5 class="mb-0">{{ data.user.first_name }}</h5>

            <!-- User Job Title -->
            <!--          <span class="text-muted d-block mb-2">{{ userDetails.jobTitle }}</span>-->

            <!-- User Follow -->
            <p
              class="mb-2  text-uppercase font-weight-bold"
              style="color: #0087DB; cursor:pointer"
              @click="
                $router.push({ path: `user/${data.user._id}/${data._id}` })
              "
            >
              view ScoreCard
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
