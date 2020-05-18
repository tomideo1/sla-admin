<template>
  <div>
    <d-container fluid class="main-content-container   ">
      <top :heading="user.user.first_name" />
      <d-row>
        <div class="col-md-2 col-lg-2 col-12">
          <d-row class="m-3">
            <div class="mb-3 col-md-12 col-lg-12 col-12  text-center   ">
              <div class="mb-3    ">
                <sla-avatar
                  class="mx-auto"
                  v-if="user.user.image === null"
                  size="xl"
                  :user="{ name: user.user.first_name }"
                />
                <sla-avatar
                  v-else
                  size="xl"
                  :user="{ image: user.user.image }"
                />
              </div>
              <h6
                class="font-weight-bold text-black text-center  font-open-sans "
              >
                {{ user.user.first_name + " " + user.user.last_name }}
              </h6>
              <p class="text-black text-center font-open-sans">
                <!--               {{JSON.parse(user.user.intrests).toString()}}-->
              </p>
              <p class="text-grey font-open-sans">
                <span><icon size="sm" name="location"/></span>
                Lagos, Nigeria
              </p>
              <div class="">
                <span
                  class="font-poppins text-bold text-center text-dark mb-3 text-bold"
                  style="font-size: 12px "
                  >Leaderboard Position</span
                >
                <div class="user-rank   d-flex justify-content-center mt-3">
                  <div
                    class="rank  text-dark bg-white d-flex justify-content-center align-items-center text-align-center"
                  >
                    {{ getUserPosition(user.leaderboard[0].last_position) }}
                  </div>
                  <div
                    class="rank flip d-flex justify-content-center align-items-center text-align-center"
                  >
                    {{ user.leaderboard[0].total + "XP" }}
                  </div>
                </div>
              </div>
            </div>
          </d-row>
        </div>
        <div class="col-md-10 col-lg-10 col-12">
          <div class="row">
            <course
              completed
              class=" p-2 mb-3 courses x-flow mt-2 ml-2 py-2 d-flex overflow-x-auto"
              v-for="(iter, idx) in user.courses"
              :key="idx"
              :title="iter.course.title"
              :image="iter.course.cover_image"
              :id="iter.course.cover_image"
            />
          </div>
          <div class="row"></div>
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
        case (value = 0):
          value = "Last";
          break;
        case (value = 1):
          value = value + "st";
          break;
        case (value = 2):
          value = value + "nd";
          break;
        case (value = 3):
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
    const userId = this.$route.params.userId;
    let res = axios
      .get(`${process.env.VUE_APP_API}/admin/user/details/` + userId, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        this.user = res.data.data;
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
