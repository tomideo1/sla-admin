<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <div class="col-md-12 col-12 col-lg-12 ">
        <div
          class="card text-dark mt-5 mx-auto shadow container"
          style="border: 1px solid #E7E6E6;
         box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03); border-radius: 0"
        >
          <h4 class="mt-3 mb-3 text-dark font-open-sans text-center">
            Milestones
          </h4>
          <div class="row">
            <div
              class=" col-4   col-md-2 col-lg-2 p-lg-0  mb-3 p-md-0 p-1  text-center d-flex flex-column  "
            >
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Filling Out Surveys</p>
                <p class="mt-n2">2 Points</p>
              </div>
            </div>
            <div
              class=" col-4  col-md-2 col-lg-2 p-lg-0  mb-3 p-md-0 p-1  text-center   d-flex flex-column"
            >
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Completing a Course</p>
                <p class="mt-n2">10 Points</p>
              </div>
            </div>
            <div
              class="col-4 col-md-2 col-lg-2 p-lg-0  mb-3 p-md-0 p-1  text-center   d-flex flex-column"
            >
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Post Engagement (Comment)</p>
                <p class="mt-n2">3 Points</p>
              </div>
            </div>
            <div
              class="col-4  col-md-2 col-lg-2 p-lg-0  mb-3 p-md-0 p-1 text-center  d-flex flex-column"
            >
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Post Engagement (Likes)</p>
                <p class="mt-n2">2 Points</p>
              </div>
            </div>
            <div
              class="col-4 col-md-2 col-lg-2 p-lg-0  mb-3 p-md-0 p-1  text-center  d-flex flex-column"
            >
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Completing a Quiz</p>
                <p class="mt-n2">1 Point</p>
              </div>
            </div>
            <div
              class="col-4 col-md-2 col-lg-2 p-lg-0  mb-3 p-md-0 p-1  text-center  d-flex flex-column"
            >
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Completing a Poll</p>
                <p class="mt-n2">1 Point</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div
          class=" text-dark mt-5 w-100"
          style="
         background: url('https://res.cloudinary.com/sla-sheleadsafrica/image/upload/v1592925869/Vector_1_z5eegc.png') no-repeat center bottom
         background-size: fill;box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03); border-radius: 0"
        >
          <div class="row">
            <div class="col-12" v-if="top_1 !== null && top_1.user !== null">
              <sla-avatar
                :class="'avatar col-12'"
                size="xl"
                v-if="top_1.user.image === null"
                :user="{ name: top_1.user.first_name }"
              />
              <sla-avatar
                :class="'avatar col-12'"
                size="xl"
                v-else
                :user="{ image: top_1.user.image }"
              />
              <span class="text-center d-block">
                {{ top_1.user.first_name }} {{ top_1.user.last_name }}
              </span>
              <span class="text-center d-block">{{ top_1.total }} points</span>
            </div>
            <div
              class="mx-auto text-center col-12 d-flex"
              v-if="top_2 !== null && top_2.user !== null"
            >
              <div class="col-4 offset-md-2 mb-3">
                <div class="col-12 d-flex flex-column align-items-center">
                  <sla-avatar
                    :class="'avatar   col-lg-6  '"
                    size="lg-2"
                    v-if="top_2.user.image === null"
                    :user="{ name: top_2.user.first_name }"
                  />
                  <sla-avatar
                    :class="'avatar   col-lg-6  '"
                    size="lg-2"
                    v-else
                    :user="{ image: top_2.user.image }"
                  />
                  <main class=" ">
                    <span class=" text-center d-block">
                      {{ top_2.user.first_name }} {{ top_2.user.last_name }}
                    </span>
                    <span class="text-center d-block"
                      >{{ top_2.total }} points</span
                    >
                  </main>
                </div>
              </div>
              <div class="col-4 mb-3">
                <div
                  class="col-12 d-flex flex-column align-items-center"
                  v-if="top_3 !== null && top_3.user !== null"
                >
                  <sla-avatar
                    :class="'avatar   col-lg-6  '"
                    size="lg-2"
                    v-if="top_3.user.image === null"
                    :user="{ name: top_3.user.first_name }"
                  />
                  <sla-avatar
                    :class="'avatar   col-lg-6  '"
                    size="lg-2"
                    v-else
                    :user="{ image: top_3.user.image }"
                  />
                  <main class=" ">
                    <span class=" text-center d-block">
                      {{ top_3.user.first_name }} {{ top_3.user.last_name }}
                    </span>
                    <span class="text-center d-block"
                      >{{ top_3.total }} points</span
                    >
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <d-col col sm="12" class="mt-4">
        <table class="table mb-0 table-hover table-striped table-responsive-xl">
          <thead class="bg-light">
            <tr>
              <th scope="col" class="border-0">Rank</th>
              <th scope="col" class="border-0">Name</th>
              <th scope="col" class="border-0">Score Card</th>
              <th scope="col" class="border-0">Survey</th>
              <th scope="col" class="border-0">Quiz</th>
              <th scope="col" class="border-0">Lessons</th>
              <th scope="col" class="border-0">Courses</th>
              <th scope="col" class="border-0">Total Points</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in leaders"
              :key="index"
              v-if="item.user !== null && item.user !== undefined"
            >
              <td>{{ item.position }}</td>
              <td class="d-flex flex-column">
                <span class=""
                  >{{ item.user.first_name }} {{ item.user.last_name }}
                  <i
                    v-if="item.trend != 'decrease'"
                    class="text-success fas fa-arrow-up"
                  ></i>
                  <i v-else class="text-danger fas fa-arrow-down"></i
                ></span>
                <span class="text-muted">{{ item.user.location }} </span>
              </td>
              <td>{{ item.score_card }}</td>
              <td>{{ item.survey }}</td>
              <td>{{ item.quiz }}</td>
              <td>{{ item.lesson }}</td>
              <td>{{ item.courses }}</td>
              <td>{{ item.total }}</td>
            </tr>
          </tbody>
        </table>
      </d-col>
    </d-row>
  </d-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store/index";
import helper from "../helpers/helper";
const token = store.state.auth.token;
export default {
  name: "LeaderBoard",
  components: {
    Icon: () => import("@/components/SlaIcon"),
    SlaAvatar: () => import("@/components/avatar"),
    NavMenu: () => import("@/components/NavMenu")
  },
  data() {
    return {
      top_1: null,
      top_2: null,
      top_3: null,
      navigation: {
        title: [{ name: "Leaderboard", path: "/leaderboard" }]
      }
    };
  },
  computed: {
    ...mapGetters({
      leaders: "app/getLeaderboard"
      // maps courses to current computed resource
    }),
    splitLeaderboard() {
      return this.leaders.splice(3, this.leaders.length);
    }
  },
  methods: {
    ...mapActions("app/", ["getAllLeaderboard"])

    //vuex call to get all courses
  },

  async mounted() {
    await this.getAllLeaderboard();
    this.leaders.forEach(leader => {
      if (leader.user !== null) {
        switch (leader.position) {
          case 1:
            this.top_1 = leader;
            break;
          case 2:
            this.top_2 = leader;
            break;
          case 3:
            this.top_3 = leader;
            break;
        }
      }
    });
  }
};
</script>

<style scoped lang="scss">
.leader {
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffffff;
  box-sizing: border-box;
}
.leader_small {
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 60px;
  z-index: 2;
}
.leader_1_small {
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 2;
}
.leader_1 {
  width: 150px;
  height: 150px;
}
.leader_2 {
  width: 117.22px;
  height: 118px;
}
.leader_3 {
  width: 117.22px;
  height: 118px;
}
</style>
