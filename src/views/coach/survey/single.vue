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
            :id="data._id"
          >
            <d-card-header class="text-black font-open-sans border-bottom">
              {{ data.question_text }}
            </d-card-header>
            <d-card-body v-if="!data.has_options">
              <textarea
                class="form-control mb-3"
                :ref="`survey_text_answer-${data._id}`"
                :id="data._id"
                placeholder="Type your response here"
              >
              </textarea>
            </d-card-body>
            <d-card-body v-else>
              <div
                :id="data._id"
                :ref="`survey_quiz_answer-${data._id}`"
                class="d-flex flex-column"
              >
                <label
                  class="container"
                  v-for="(option, index) in data.possible_options"
                  :key="index"
                >
                  <input
                    type="radio"
                    :value="option"
                    :name="`quiz-group-${idx}`"
                    class="mr-2"
                  />
                  {{ option }}
                  <span class="checkmark"></span>
                </label>
              </div>
            </d-card-body>
          </d-card>
          <sla-button
            type="filled"
            class="btn m-3 col-md-6 float-right"
            size="md"
            :text="text"
            @click="submitSurvey"
            :disabled="isLoading"
          />
        </div>
      </div>

      <d-modal v-if="submitted" @close="submitted = false" size="lg">
        <div
          class="modal-header"
          :style="
            'width:100%!important;height: 100%!important;' +
              'backgroundImage:url(' +
              'https://media.giphy.com/media/3oKIPnJHi1y2eUG7gk/giphy.gif' +
              ');' +
              ' background-size:cover; background-position:center'
          "
        ></div>

        <d-modal-body>
          <div class="text-center">
            <sla-button
              class="m-2 col-md-4"
              type="filled"
              size="md"
              text="Go To Home Page"
              @click="$router.push({ name: 'coach-dashboard' })"
            />
          </div>
        </d-modal-body>
      </d-modal>
    </d-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
import { mapGetters, mapActions } from "vuex";
import { BeatLoader } from "@saeris/vue-spinners";
export default {
  name: "single-survey",
  data() {
    return {
      isLoaded: false,
      text: "SUBMIT",
      isLoading: false,
      submitted: false,
      error: {
        message: "",
        data: ""
      },

      Survey: undefined
    };
  },
  methods: {
    ...mapActions("app/", ["submitSurveyApi"]),
    async submitSurvey() {
      let answers = [];
      for (let ref in this.$refs) {
        if (ref.indexOf("answer") > -1) {
          if (ref.indexOf("quiz") > -1) {
            let eles = this.$refs[ref][0];
            let option = eles.querySelectorAll("input[type=radio]:checked")[0];
            if (typeof option === "undefined") {
              //not selected an option
            } else {
              answers.push({
                question_id: eles.id,
                answer: option.value
              });
            }
          } else if (ref.indexOf("text") > -1) {
            answers.push({
              question_id: this.$refs[ref][0].id,
              answer: this.$refs[ref][0].value
            });
          }
        }
      }
      let res = await this.submitSurveyApi({
        id: this.$route.params.id,
        answers
      });
      if (res && res.status == 200) {
        this.$toast.success(
          (this.error.message = res.data
            ? res.data.message
            : "An error occured")
        );
        this.submitted = true;
      } else {
        this.$toast.error(
          (this.error.message = res.data
            ? res.data.message
            : "An error occured")
        );
      }
    }
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
  computed: {}
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
