<template>
  <div>
    <d-container fluid class="main-content-container px-4  ">
      <top :heading="user.first_name" />
      <d-row>
        <div class="col-md-3 col-lg-3 col-12">
          <d-row class="m-3">
            <div class="mb-3 col-md-12 col-lg-12 col-12    ">
              <div class="mb-3   ">
                <sla-avatar
                  v-if="user.image === null"
                  size="xl"
                  :user="{ name: user.first_name }"
                />
                <sla-avatar v-else size="xl" :user="{ image: user.image }" />
              </div>
              <h6 class="font-weight-bold text-black  font-open-sans ">
                {{ user.first_name + " " + user.last_name }}
              </h6>
              <p class="text-black font-open-sans">
                Design lover and a tech enthusiast
              </p>
              <p class="text-grey font-open-sans">
                <span><icon size="sm" name="location"/></span>
                Lagos, Nigeria
              </p>
              <div class="mt-24 ml-16">
                <span
                  class="font-poppins text-bold"
                  style="font-size: 12px mb-3"
                  >Leaderboard Position</span
                >
                <div class="user-rank d-flex m-3">
                  <div
                    class="rank  text-dark bg-white d-flex justify-content-center align-items-center text-align-center"
                  >
                    7th
                  </div>
                  <div
                    class="rank flip d-flex justify-content-center align-items-center text-align-center"
                  >
                    400XP
                  </div>
                </div>
              </div>
            </div>
          </d-row>
          <course />
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
    SlaAvatar: () => import("@/components/avatar.vue"),
    Icon: () => import("@/components/SlaIcon.vue"),
    Course: () => import("@/components/courseCard.vue")
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

<style scoped lang="scss">
$bv-primary: #0087db;
.rank {
  height: 26px;
  width: 45px;
  border: 1px solid $bv-primary;
  border-radius: 5px;
  font-size: 12px;
  padding: 20px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.flip {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 0;
  border: 1px solid $bv-primary;

  border-top-left-radius: 0;
  margin-left: -1px;
}

.greet {
  font-size: 24px;
}
.alert {
  margin-right: 22px;
  border-radius: 5px;
  font-size: 12px;
}

.x-flow {
  &::-webkit-scrollbar {
    display: none;
  }
  & > :not(:last-child) {
    margin-right: 12px !important;
  }
  & > *:last-child {
    padding-right: 12px !important;
  }
}
</style>
