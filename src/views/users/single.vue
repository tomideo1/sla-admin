<template>
  <div>
    <d-container fluid class="main-content-container px-4  ">
      <top :heading="user.first_name" />
      <d-row>
        <div class="col-md-2 col-lg-2 col-12">
          <d-row class="m-3">
            <div class="mb-3 col-md-12 col-lg-12 col-12  ">
              <div class="mb-3  ">
                <sla-avatar
                  v-if="user.image === null"
                  size="xl"
                  :user="{ name: user.first_name }"
                />
                <sla-avatar v-else size="xl" :user="{ image: user.image }" />
              </div>
              <h6 class="text-bold text-black font-open-sans ">
                {{ user.first_name + " " + user.last_name }}
              </h6>
            </div>
          </d-row>
        </div>
        <div class="col-md-6 col-lg-6 col-12"></div>
      </d-row>
    </d-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
const token = store.state.auth.token;
export default {
  name: "single",
  data() {
    return {
      user: null
    };
  },
  components: {
    top: () => import("@/components/top"),
    avatar: () => import("@/components/avatar.vue"),
    SlaButton: () => import("@/components/SlaButton.vue"),
    SlaAvatar: () => import("@/components/avatar.vue")
  },
  async mounted() {
    const userId = this.$route.params.userId;
    let res = axios
      .get(`${process.env.VUE_APP_API}/admin/user/` + userId, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        this.user = res.data.data.user;
      })
      .catch();
  }
};
</script>

<style scoped></style>
