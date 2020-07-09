<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboards</span>
        <h3 class="page-title">All Industry</h3>
      </d-col>

      <!-- Page Header - Datepicker -->
    </d-row>
    <d-container fluid>
      <d-row>
        <div
          class="col-12 col-lg-3 col-md-6"
          v-for="(user, idx) in tableData"
          :key="idx"
        >
          <d-card class="m-3 text-center">
            <d-card-header class="border-bottom  mx-auto">
              <!-- User Avatar -->
              <div class="mb-3  ">
                <sla-avatar
                  class="avatar"
                  size="xl"
                  :user="{ name: user.name }"
                />
              </div>

              <!-- User Name -->
              <h5 class="mb-0">{{ user.name }}</h5>

              <!-- User Job Title -->
              <!--          <span class="text-muted d-block mb-2">{{ userDetails.jobTitle }}</span>-->

              <!-- User Follow -->
              <p
                style="cursor: pointer"
                class="mb-2 text-primary font-weight-bold"
                @click="
                  $router.push({
                    path: 'single/' + user._id
                  })
                "
              >
                View Profile
              </p>
            </d-card-header>
          </d-card>
        </div>
      </d-row>
    </d-container>
  </d-container>
</template>

<script>
import Vue from "vue";
import { ClientTable } from "vue-tables-2";
import "@/assets/scss/vue-tables.scss";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SlaAvatar: () => import("@/components/avatar"),
    Icon: () => import("@/components/SlaIcon")
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapGetters({
      tableData: "app/getIndustry"
    }),
    fetchAdmins() {
      return this.tableData;
    }
  },
  methods: {
    handleActionClick(type, id) {
      alert(`You have ${type} item ${id}`); // eslint-disable-line no-alert
    },
    ...mapActions("app/", ["getAllIndustry"])
  },

  async mounted() {
    await this.getAllIndustry();
  }
};
</script>

<style scoped>
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #007cff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
