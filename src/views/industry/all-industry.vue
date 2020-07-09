<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <d-alert
      :theme="error.type"
      @alert-dismissed="error.show = false"
      :show="error.show"
      dismissible
    >
      {{ error.message }}
    </d-alert>
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
                  size="lg"
                  :user="{ name: user.name }"
                />
              </div>

              <!-- User Name -->
              <h5 class="mb-0">{{ user.name }}</h5>

              <p
                style="cursor: pointer"
                class="mb-2 text-danger font-weight-bold"
                @click="deleteEntry(user._id)"
              >
                Delete
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
import store from "@/store/index";
import state from "../../store/auth/state";
import axios from "axios";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SlaAvatar: () => import("@/components/avatar"),
    Icon: () => import("@/components/SlaIcon")
  },
  data() {
    return {
      isLoading: false,
      error: {
        message: null,
        type: null,
        show: false
      }
    };
  },
  computed: {
    ...mapGetters({
      tableData: "app/getIndustry"
    })
  },
  methods: {
    handleActionClick(type, id) {
      alert(`You have ${type} item ${id}`); // eslint-disable-line no-alert
    },
    ...mapActions("app/", ["getAllIndustry"]),
    async deleteEntry(id) {
      let token = store.state.auth.token;
      try {
        let res = await axios.delete(
          `${process.env.VUE_APP_API}/industry/admin/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        );
        this.isLoading = false;
        console.log({ res });
        this.error.message = "Industry Deleted successfuly";
        this.error.type = "success";
        this.error.show = true;
        this.getAllIndustry();
      } catch (e) {
        console.log({ e });
        this.isLoading = false;
        this.error.message = e.response.data.message;
        this.error.type = "danger";
        this.error.show = true;
      }
    }
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
