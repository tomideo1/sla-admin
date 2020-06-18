<template>
  <div>
    <beat-loader
      class="loader m-3 centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <d-container fluid class="main-content-container px-4" v-if="isLoaded">
      <top :heading="Survey.survey.title" />

      <div
        class="mt-5 mb-3 d-block text-center mx-auto d-md-block d-lg-block"
      ></div>

      <div class="mx-auto m-3">
        <div class="col-md-6 col-12 col-lg-6  m-2">
          <d-card
            class=" m-2"
            style="border:1px solid #E7E6E6; box-sizing:border-box;"
            v-for="(data, idx) in Survey.questions"
            :key="idx"
          >
            <d-card-header class="text-black font-open-sans border-bottom">
              {{ data.question_text }}
            </d-card-header>
            <d-card-body v-if="!data.has_options">
              <d-input />
            </d-card-body>
            <d-card-body v-else>
              <div
                class="form-check m-1"
                v-for="(option, idx) in data.possible_options"
                :key="idx"
              >
                <input class="form-check-input" type="radio" />
                <label class="form-check-label" for="exampleRadios2">
                  {{ option }}
                </label>
              </div>
            </d-card-body>
          </d-card>
          <sla-button
            type="filled"
            class="btn m-3 col-md-6 float-right"
            size="md"
            text="Submit"
          />
        </div>
      </div>
    </d-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
import { mapGetters } from "vuex";
import { BeatLoader } from "@saeris/vue-spinners";
export default {
  name: "single-survey",
  data() {
    return {
      isLoaded: false,
      buttons: {},

      Survey: undefined
    };
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    Top: () => import("@/components/top"),
    SlaButton: () => import("@/components/SlaButton"),
    BeatLoader
  },
  async mounted() {
    const self = this;
    const token = store.state.auth.token;
    await axios
      .get(
        `${process.env.VUE_APP_API}/survey/` +
          self.$route.params.id +
          `/questions/list`,
        {
          headers: {
            Authorization: `Bearer ${token} `
          }
        }
      )
      .then(res => {
        self.Survey = res.data.data;
        self.isLoaded = true;
      })
      .catch(ex => {});
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.btn-primary {
  background-color: #0087db !important;
}
.btn-outline-primary {
  border-color: #0087db !important;
}
</style>
