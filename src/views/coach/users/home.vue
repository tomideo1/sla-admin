<template>
  <d-container fluid>
    <div class="mt-4">
      <h6 class="text-dark title text-capitalize m-1">
        Assigned Users
      </h6>
    </div>
    <d-row>
      <div
        v-if="Users.length > 0"
        class="col-12 col-lg-3 col-md-6"
        v-for="(user, idx) in Users"
        :key="idx"
      >
        <d-card class="m-3 text-center">
          <d-card-header class="border-bottom  mx-auto">
            <!-- User Avatar -->
            <div class="mb-3  ">
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
            <h5 class="mb-0">{{ user.first_name + " " + user.last_name }}</h5>

            <!-- User Job Title -->
            <!--          <span class="text-muted d-block mb-2">{{ userDetails.jobTitle }}</span>-->

            <!-- User Follow -->
            <p
              style="cursor: pointer"
              class="mb-2 text-primary font-weight-bold"
              @click="
                $router.push({
                  name: 'coach-single-user',
                  params: { id: user._id }
                })
              "
            >
              View Profile
            </p>
          </d-card-header>
        </d-card>
      </div>
      <div v-else class="col">
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any assigned users</span
        >
      </div>
    </d-row>
  </d-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters({
      Users: "app/getAssignedUsers"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", ["getAssignedUsers"])

    //vuex call to get all courses
  },
  async mounted() {
    await this.getAssignedUsers();
  },
  components: {
    SlaAvatar: () => import("@/components/avatar")
  }
};
</script>

<style scoped>
.avatar {
  display: inline-block !important;
}
</style>
