<template>
  <div>
    <beat-loader
      class="loader m-3 centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
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
                  {{ user.user.location }}a
                </p>
                <sla-button
                  type="outline"
                  text="SUBMIT"
                  size="md"
                  class="btn col-md-12"
                />
              </div>
            </div>
          </d-row>
        </div>
        <div class="col-md-10 col-lg-10 col-12">
          <d-form-row v-for="(scorecard, index) in user_scorecard" :key="index">
            <!-- First Name -->

            <d-col
              md="8"
              class="form-group"
              v-if="scorecard.scorecard_field.field_type === 'direct'"
            >
              <label class="text-grey">
                {{ scorecard.scorecard_field.field_name }}</label
              >
              <d-form-input
                class="form-control"
                type="text"
                v-model="scorecard.scorecard_field.user_value"
              />
            </d-col>
            <d-col
              md="8"
              class="form-group"
              v-if="scorecard.scorecard_field.field_type === 'optional'"
            >
              <label class="text-grey">
                {{ scorecard.scorecard_field.field_name }}</label
              >
              <select
                class="form-control form-select"
                v-model="scorecard.scorecard_field.user_value"
              >
                <option selected :value="undefined" :disabled="true">
                  Select Answer For {{ scorecard.scorecard_field.field_name }}
                </option>
                <option
                  :key="index"
                  v-for="(selection, index) in scorecard.scorecard_field
                    .options"
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
      user_scorecard: null
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
    ...mapActions("app/", ["fetchUserScorecard"])
  },
  async mounted() {
    const userId = this.$route.params.id;
    this.user_scorecard = await this.fetchUserScorecard({
      id: this.$route.params.id
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
