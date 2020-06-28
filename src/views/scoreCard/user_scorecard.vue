<template>
  <div>
    <beat-loader
      class="loader m-3 centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="4000"
      :closeable="false"
    ></Toasts>
    <d-container fluid class="main-content-container px-4 py-4" v-if="isLoaded">
      <top :heading="user.user.first_name" />

      <d-row>
        <div class="col-md-2 col-lg-2 col-12">
          <d-row>
            <div class="mb-3 col-md-12 col-lg-12 col-12  ">
              <div class="text-center">
                <sla-avatar
                  class="avatar"
                  size="xl"
                  v-if="user.user.image == null"
                  :user="{ name: user.user.first_name }"
                />
                <sla-avatar
                  class="avatar"
                  v-else
                  size="xl"
                  :user="{ image: user.user.image }"
                />
                <h6 class="font-weight-bold text-black font-open-sans ">
                  {{ user.user.first_name + " " + user.user.last_name }}
                </h6>
                <p class="text-black font-open-sans">
                  {{ JSON.parse(user.user.intrests) }}
                </p>
                <p class="text-grey font-open-sans">
                  {{ user.user.location }}
                </p>
                <sla-button
                  type="outline"
                  :text="text"
                  size="md"
                  @click="handleSubmit"
                  :disabled="isLoading"
                  class="btn col-md-12"
                />
              </div>
            </div>
          </d-row>
        </div>
        <div class="col-md-10 col-lg-10 col-12">
          <d-form-row
            v-for="(scorecard, index) in user_scorecard.scorecard_field"
            :key="index"
          >
            <!-- First Name -->

            <d-col
              md="8"
              class="form-group"
              v-if="scorecard.field_type === 'direct'"
            >
              <label class="text-grey"> {{ scorecard.field_name }}</label>
              <d-form-input
                class="form-control"
                type="text"
                v-model="scorecard.user_value"
              />
            </d-col>
            <d-col
              md="8"
              class="form-group"
              v-if="scorecard.field_type === 'optional'"
            >
              <label class="text-grey"> {{ scorecard.field_name }}</label>
              <select
                class="form-control form-select"
                v-model="scorecard.user_value"
              >
                <option selected :value="undefined" :disabled="true">
                  Select Answer For {{ scorecard.field_name }}
                </option>
                <option
                  :key="index"
                  v-for="(selection, index) in scorecard.options"
                  :value="selection.option"
                >
                  {{ selection.option }}
                </option>
              </select>
            </d-col>
          </d-form-row>
        </div>
      </d-row>
    </d-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
import { mapGetters, mapActions } from "vuex";
const token = store.state.auth.token;
export default {
  name: "single",
  data() {
    return {
      user: null,
      isLoaded: false,
      text: "SUBMIT",
      isLoading: false,
      user_scorecard: null,
      error: {
        status: null,
        message: null
      }
    };
  },
  components: {
    top: () => import("@/components/top"),
    avatar: () => import("@/components/avatar.vue"),
    SlaButton: () => import("@/components/SlaButton.vue"),
    SlaAvatar: () => import("@/components/avatar.vue"),
    Icon: () => import("@/components/SlaIcon.vue")
  },
  computed: {},
  methods: {
    ...mapActions("app/", ["fetchUserScorecard", "submitScoreCard"]),
    async handleSubmit() {
      this.text = "Loading....";
      this.isLoading = false;
      let res = await this.submitScoreCard({
        user: this.$route.params.id,
        scorecard: this.user_scorecard
      });
      if (res && res.status == 200) {
        this.isLoading = false;
        this.text = "SUBMIT";
        this.$toast.success(
          (this.error.message = res.data
            ? res.data.message
            : "An error occured")
        );
        this.$router.push({ path: "/scorecards/all" });
      } else {
        this.isLoading = false;
        this.text = "SUBMIT";
        this.$toast.error(
          (this.error.message = res.data
            ? res.data.message
            : "An error occured")
        );
      }
    }
  },
  async mounted() {
    const userId = this.$route.params.id;
    const scorecardId = this.$route.params.scorecard_id;
    this.user_scorecard = await this.fetchUserScorecard({
      id: this.$route.params.scorecard_id
    });
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

<style scoped></style>
