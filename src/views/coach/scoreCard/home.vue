<template>
  <div>
    <div class="mt-4">
      <h4 class="text-dark title text-capitalize m-1">
        Scorecard
      </h4>
    </div>
    <beat-loader
      class="loader m-3 centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <d-container fluid class="main-content-container px-4" v-if="isLoaded">
      <sla-button
        type="filled"
        text="Create User Scorecard"
        class="btn m-3"
        @click="showUsers = true"
      />
      <d-row>
        <div
          class=" col-12 col-lg-3 col-md-6"
          v-for="(card, index) in scorecards"
          :key="index"
        >
          <d-card class="m-3">
            <d-card-header class="border-bottom text-center">
              <!-- User Avatar -->
              <div class="mb-3 mx-auto">
                <sla-avatar
                  class="avatar"
                  v-if="card.user.image === null"
                  size="xl"
                  :user="{ name: card.user.first_name }"
                />
                <sla-avatar
                  class="avatar"
                  v-else
                  size="xl"
                  :user="{ image: card.user.image }"
                />
              </div>

              <!-- User Name -->
              <h5 class="mb-0">{{ card.user.first_name }}</h5>

              <!-- User Job Title -->
              <!--          <span class="text-muted d-block mb-2">{{ userDetails.jobTitle }}</span>-->

              <!-- User Follow -->
              <p
                class="mb-2  text-uppercase font-weight-bold"
                style="color: #0087DB; cursor:pointer"
                @click="
                  $router.push({ path: `single/${card.user._id}/${card._id}` })
                "
              >
                View Scorecard
              </p>
            </d-card-header>
          </d-card>
        </div>
      </d-row>
    </d-container>

    <d-modal v-if="showUsers" @close="showUsers = false" size="lg">
      <d-modal-header>
        <d-modal-title>Assign Coach</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <d-row class="text-center">
          <div
            v-for="(user, idx) in Users"
            :key="idx"
            class="col-lg-12 col-md-12 col-12 p-2 "
          >
            <d-row class="col-md-12 col-lg-12 col-12 mx-auto">
              <div class="d-flex flex-row flex-grow-1 align-content-center">
                <sla-avatar
                  v-if="user.image === null"
                  size="lg"
                  :user="{ name: user.first_name }"
                />
                <sla-avatar v-else size="lg" :user="{ image: user.image }" />
                <span class="m-3">
                  {{ user.first_name + " " + user.last_name }}
                </span>
              </div>
              <d-col md="6">
                <sla-button
                  type="filled"
                  size="sm"
                  class="btn m-2"
                  text="Create Scorecard"
                  @click="$router.push({ path: `create/${user._id}` })"
                />
              </d-col>
            </d-row>
          </div>
        </d-row>
      </d-modal-body>
      <d-modal-footer> </d-modal-footer>
    </d-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isLoaded: false,
      showUsers: false
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
