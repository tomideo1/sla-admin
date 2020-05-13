<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="12" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title">Leaderboard</h3>
      </d-col>
      <d-col sm="12" md="12" lg="12">
        <div
          class="card text-dark mt-5 mx-auto container"
          style="border: 1px solid #E7E6E6;
         box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03); border-radius: 0"
        >
          <h4 class="mt-3 mb-3 text-center">Milestones</h4>
          <div class="row">
            <div class="col-md-2 col-4 text-center  d-flex flex-column">
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Filling Out Surveys</p>
                <p class="mt-n2">1 Point</p>
              </div>
            </div>
            <div class="col-md-2 col-4  text-center  d-flex flex-column">
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Completing a Course</p>
                <p class="mt-n2">10 Points</p>
              </div>
            </div>
            <div class="col-md-2 col-4 text-center  d-flex flex-column">
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Completing a Lesson</p>
                <p class="mt-n2">50 Points</p>
              </div>
            </div>
            <div class="col-md-2 col-4  text-center  d-flex flex-column">
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Engaging with Community</p>
                <p class="mt-n2">2 Points</p>
              </div>
            </div>
            <div class="col-md-2 col-4 text-center  d-flex flex-column">
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Completing a Quiz</p>
                <p class="mt-n2">1 Point</p>
              </div>
            </div>
            <div class="col-md-2 col-4 text-center  d-flex flex-column">
              <div>
                <icon size="lg" name="medal"></icon>
                <p class="mt-2">Completing a Poll</p>
                <p class="mt-n2">1 Point</p>
              </div>
            </div>
          </div>
        </div>
      </d-col>
      <d-col col sm="12">
        <div
          class="card text-dark mt-5 p-4  "
          style="border: 1px solid #E7E6E6;
         background: linear-gradient(133.56deg, #0087DB -33.88%, #1F497D 95.84%);
         box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03); border-radius: 0"
        >
          <div class="row  ">
            <div class="col-md-3   mr-3  ">
              <div
                class="leader_small text-center text-white mx-auto "
                style="background:  #0087DB;"
              >
                2
              </div>
              <img
                class="leader  col-3  "
                src="@/assets/images/user-profile/leader_2.png"
              />
              <div class="text-white text-center">
                <p class="mt-2">Aina Oluwatosin</p>
                <p class="mt-n4">10 Points</p>
              </div>
            </div>
            <div class="col-md-3 col-3 ">
              <div
                class="leader_1_small text-center text-white mx-auto "
                style="background:  #0087DB;"
              >
                1
              </div>
              <img
                class="leader  "
                src="@/assets/images/user-profile/leader_2.png"
              />
              <div class="text-white text-center">
                <p class="mt-2">Aina Oluwatosin</p>
                <p class="mt-n4">10 Points</p>
              </div>
            </div>

            <div class="col-md-3 col-3 ml-2">
              <div
                class="leader_small text-center text-white mx-auto "
                style="background:  #0087DB;"
              >
                3
              </div>
              <img
                class="leader"
                src="@/assets/images/user-profile/leader_2.png"
              />
              <div class="text-white text-center">
                <p class="mt-2">Aina Oluwatosin</p>
                <p class="mt-n4">10 Points</p>
              </div>
            </div>
          </div>
        </div>
      </d-col>

      <d-col col sm="12" class="mt-4">
        <table class="table mb-0 table-responsive-xl">
          <thead class="bg-light">
            <tr>
              <th scope="col" class="bord er-0">Rank</th>
              <th scope="col" class="border-0">Name</th>
              <th scope="col" class="border-0">Score Card</th>
              <th scope="col" class="border-0">Survey</th>
              <th scope="col" class="border-0">Quiz</th>
              <th scope="col" class="border-0">Lessons</th>
              <th scope="col" class="border-0">Courses</th>
              <th scope="col" class="border-0">Total Points</th>
              <th scope="col" class="border-0"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in leaders" :key="index">
              <td>{{ item.position }}</td>
              <td>{{ item.user.first_name }}</td>
              <td>{{ item.score_card }}</td>
              <td>{{ item.survey }}</td>
              <td>{{ item.quiz }}</td>
              <td>{{ item.lesson }}</td>
              <td>{{ item.courses }}</td>
              <td>{{ item.total }}</td>
              <td>
                <icon size="sm" name="share" />
              </td>
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
const token = store.state.auth.token;
export default {
  name: "LeaderBoard",
  components: {
    Icon: () => import("@/components/SlaIcon")
  },
  data() {
    return {
      leaders: null
    };
  },

  async mounted() {
    let res = await axios
      .get(`${process.env.VUE_APP_API}/admin/leaderboard/getAll`, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        this.leaders = res.data.data.leaderboard;
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
