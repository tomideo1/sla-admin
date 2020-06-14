<template>
  <div>
    <beat-loader
      class="loader m-3"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <d-container fluid class="main-content-container" v-if="isLoaded">
      <top :heading="user.coach.first_name" />
      <d-row>
        <div class="col-md-2 col-lg-2 col-12">
          <d-row class="m-3 text-center">
            <div
              class="mb-3 col-md-12 col-lg-12 col-12  align-items-center justify-content-center d-flex flex-column   "
            >
              <sla-avatar
                v-if="user.coach.image === null"
                size="xl"
                class="mb-3"
                :user="{ name: user.coach.first_name }"
              />
              <sla-avatar
                v-else
                size="xl"
                :user="{ image: user.coach.image }"
                class="mb-3"
              />
              <h6 class="font-weight-bold text-black   font-open-sans ">
                {{ user.coach.first_name + " " + user.coach.last_name }}
              </h6>
              <p class="text-grey font-open-sans">
                <span><icon size="sm" name="location"/></span>
                {{ user.coach.location }}
              </p>
              <div class="row">
                <sla-button
                  type="filled"
                  size="md"
                  text="ASSIGN PARTICIPANTS"
                  @click="
                    $router.push({
                      path: '/users/coaches/participants/' + user.coach._id
                    })
                  "
                  class="btn col-md-12 col-12 col-lg-12 text-center "
                />
              </div>
            </div>
          </d-row>
        </div>
        <div class="col-md-10 col-lg-10 col-10">
          <p class="font-poppins text-black " style="font-size:14px;">
            Mentees
          </p>
          <div class="d-flex flex-row flex-grow-1 " style="overflow-x:auto">
            <div v-for="(mentee, idx) in user.assignees" :key="idx">
              <div class="d-flex flex-row flex-grow-1 ml-4 mt-1">
                <sla-avatar
                  v-if="mentee.image === null"
                  size="lg"
                  :user="{ name: mentee.first_name }"
                />
                <sla-avatar v-else size="lg" :user="{ image: mentee.image }" />
                <span
                  class="m-2 font-open-sans  text-black"
                  style="font-size:16px;"
                >
                  {{ mentee.first_name + " " + mentee.last_name }}
                </span>
              </div>
            </div>
          </div>
        </div>
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
      isLoaded: false,
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
  methods: {},
  async mounted() {
    const userId = this.$route.params.id;
    const self = this;
    let res = axios
      .get(`${process.env.VUE_APP_API}/admin/coach/` + userId, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        self.user = res.data.data;
        self.isLoaded = true;
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
.overflow-y-auto {
  overflow-y: auto !important;
}

.overflow-x-auto {
  overflow-x: auto;
}

.overflow-hidden {
  overflow: hidden !important;
}
</style>
