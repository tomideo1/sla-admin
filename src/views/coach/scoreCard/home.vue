<template>
  <div>
    <beat-loader
      class="loader m-3 centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <d-container fluid class="main-content-container px-4" v-if="isLoaded">
      <h4 class="font-poppins text-black p-4 mt-4">Scorecards</h4>

      <d-row>
        <div
          class=" col-12 col-lg-3 col-md-6"
          v-for="(user, index) in Users"
          :key="index"
        >
          <d-card class="m-3">
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
                class="mb-2  text-uppercase font-weight-bold"
                style="color: #0087DB; cursor:pointer"
                v-if="checkIfUserHasScoreCard(user._id) === true"
                @click="$router.push({ path: `single/${user._id}` })"
              >
                View Scorecard
              </p>
              <sla-button
                type="filled"
                size="sm"
                class="btn m-2"
                v-else
                text="Create Scorecard"
              />
            </d-card-header>
          </d-card>
        </div>
      </d-row>
    </d-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isLoaded: false
    };
  },
  components: {
    slaAvatar: () => import("@/components/avatar.vue"),
    Icon: () => import("@/components/SlaIcon.vue"),
    SlaButton: () => import("@/components/SlaButton.vue")
  },
  methods: {
    ...mapActions("app/", ["getUserScoreCards", "getAssignedUsers"]),

    checkIfUserHasScoreCard(id) {
      let status = this.scorecards.some(res => {
        return res._id === id;
      });
      return status;
    }
  },
  computed: {
    ...mapGetters({
      scorecards: "app/getUserScorecard",
      Users: "app/getAssignedUsers"
    })
  },
  async mounted() {
    await this.getUserScoreCards();
    await this.getAssignedUsers();
    this.isLoaded = true;
  }
};
</script>

<style scoped></style>
