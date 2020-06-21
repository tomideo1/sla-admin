<template>
  <d-container fluid class="main-content-container px-4">
    <h4 class="font-poppins text-black p-4 mt-4">Scorecards</h4>

    <d-row>
      <div
        class=" col-12 col-lg-3 col-md-6"
        v-if="true"
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
              class="mb-2  text-uppercase
             font-weight-bold"
              style="color: #0087DB;"
            >
              <router-link to="single">View Scorecard</router-link>
            </p>
            <sla-button
              type="filled"
              size="sm"
              v-if="checkIfUserHasScoreCard(user._id)"
              text="Create Scorecard"
            />
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
    Icon: () => import("@/components/SlaIcon.vue"),
    SlaButton: () => import("@/components/SlaButton.vue")
  },
  methods: {
    ...mapActions("app/", [
      "getUserScoreCards",
      "getAssignedUsers",
      "fetchUserScorecard"
    ]),
    compareUsers: (arr1, arr2) => {
      let valuesA = arr1.reduce(function(a, c) {
        a[c._id] = c._id;
        return a;
      }, {});
      let valuesB = arr2.reduce(function(a, c) {
        a[c._id] = c._id;
        return a;
      }, {});
      let result = arr1
        .filter(function(c) {
          return valuesB[c._id];
        })
        .concat(
          arr2.filter(function(c) {
            return valuesA[c._id];
          })
        );
      return result;
    },
    async checkIfUserHasScoreCard(id) {
      let res = await this.fetchUserScorecard({ id: id });
      console.log(res);
      if (res.status === 200 && res.data.scorecard.length > 0) {
        return true;
      }
      return false;
    }
  },
  computed: {
    ...mapGetters({
      scorecards: "app/getUserScorecard",
      Users: "app/getAssignedUsers"
    }),
    getCoachScoreCards() {
      return this.compareUsers(this.scorecards, this.Users);
    }
  },
  async mounted() {
    await this.getUserScoreCards();
    await this.getAssignedUsers();
  }
};
</script>

<style scoped></style>
