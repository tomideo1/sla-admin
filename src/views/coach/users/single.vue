<template>
  <div>
    <beat-loader
      class="loader m-3 centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <d-container fluid class="main-content-container" v-if="isLoaded">
      <top :heading="user.user.first_name" />
      <d-row>
        <div class="col-md-2 col-lg-2 col-12">
          <d-row class="m-3 text-center">
            <div
              class="mb-3 col-md-12 col-lg-12 col-12  align-items-center justify-content-center d-flex flex-column   "
            >
              <sla-avatar
                v-if="user.user.image === null"
                size="xl"
                class="mb-3"
                :user="{ name: user.user.first_name }"
              />
              <sla-avatar
                v-else
                size="xl"
                :user="{ image: user.user.image }"
                class="mb-3"
              />
              <h6 class="font-weight-bold text-black   font-open-sans ">
                {{ user.user.first_name + " " + user.user.last_name }}
              </h6>
              <p class="text-black  font-open-sans">
                {{ JSON.parse(user.user.intrests.toString()) }}
              </p>
              <p class="text-grey font-open-sans">
                <span><icon size="sm" name="location"/></span>
                {{ user.user.location }}
              </p>
              <div class="">
                <span
                  class="font-poppins text-bold  text-dark mb-3 text-bold"
                  style="font-size: 12px "
                  >Leaderboard Position</span
                >
                <div class="user-rank   d-flex justify-content-center mt-3">
                  <div
                    class="rank  text-dark bg-white d-flex justify-content-center align-items-center text-align-center"
                  >
                    {{
                      user.leaderboard.length > 0
                        ? getUserPosition(user.leaderboard[0].position)
                        : "Last"
                    }}
                  </div>
                  <div
                    class="rank flip d-flex justify-content-center align-items-center text-align-center"
                  >
                    {{
                      user.leaderboard.length > 0
                        ? user.leaderboard[0].total
                        : "0" + "XP"
                    }}
                  </div>
                </div>
              </div>
            </div>
          </d-row>
        </div>
        <div class="col-md-10 col-lg-10 col-12 ">
          <div class="d-flex flex-row" style="overflow-x:auto">
            <course
              class=" courses "
              v-for="(iter, idx) in user.courses"
              :key="idx"
              :title="iter.course.title"
              :image="iter.course.cover_image"
              :id="iter.course.cover_image"
              :percentage="iter.progress"
            />
          </div>
          <p class="font-poppins m-4 text-bold text-black">Activity</p>
          <div
            class="d-flex flex-row m-4"
            v-for="(activity, idx) in user.activity"
            :key="idx"
          >
            <p class="font-open-sans">{{ activity.content }}y</p>
            <span class="ml-5">{{ activity.createdAt | fromNow }}</span>
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
  methods: {
    getUserPosition(value) {
      switch (value) {
        case 0:
          value = "Last";
          break;
        case 1:
          value = value + "st";
          break;
        case 2:
          value = value + "nd";
          break;
        case 3:
          value = value + "rd";
          break;
        default:
          value = value + "th";
          break;
      }
      return value;
    }
  },
  async mounted() {
    const userId = this.$route.params.id;
    const self = this;
    let res = await axios
      .get(`${process.env.VUE_APP_API}/admin/user/details/` + userId, {
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
