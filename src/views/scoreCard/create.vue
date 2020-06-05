<template>
  <d-container fluid class="main-content-container px-4">
    <d-row>
      <Toasts
        :show-progress="false"
        :rtl="false"
        :max-messages="5"
        :time-out="4000"
        :closeable="false"
      ></Toasts>
      <div class="col-12 col-lg-6 col-md-6">
        <div class="p-4">
          <d-card class="m-3">
            <div class="row m-2">
              <d-input
                class="col-md-8 col-8 text-dark col-lg-8 font-open-sans  m-2"
                placeholder="Weekly Course Completion"
                disabled
              />

              <!--                <input type="hidden" v-model="item.has_options === ?"/>-->

              <d-select
                class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                style="border: none;"
                v-model="formData.weekly_course_completion.type"
              >
                <option disabled selected :value="undefined"
                  >Select Scorecard Type</option
                >
                <option value="optional">DropDown</option>
                <option value="direct">Short Text</option>
              </d-select>
            </div>
            <div v-show="formData.weekly_course_completion.type === 'optional'">
              <div
                class="m-2 d-flex flex-row  "
                v-for="(item, index) in formData.weekly_course_completion
                  .options"
              >
                <icon class="m-2 " size="lg" name="eclipse" />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.option"
                  placeholder="Option Value"
                />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.score"
                  placeholder="Score Value"
                />
                <icon
                  size="lg"
                  class="ml-auto"
                  @click="deleteOption('weekly_course_completion', index)"
                  name="cancel"
                />
              </div>
              <hr class="border-top mx-auto" />
              <div class="d-flex flex-row m-2">
                <icon
                  size="lg"
                  class=" "
                  @click="addOption('weekly_course_completion')"
                  name="add"
                  v-show="formData.weekly_course_completion.type === 'optional'"
                />
              </div>
            </div>
            <div v-show="formData.weekly_course_completion.type === 'direct'">
              <d-input
                v-model="formData.weekly_course_completion.score"
                class="col-lg-4 col-md-4 col-6 m-3 "
                placeholder="Enter Score"
              />
            </div>
          </d-card>

          <d-card class="m-3">
            <div class="row m-2">
              <d-input
                class="col-md-8 col-8 text-dark col-lg-8 font-open-sans  m-2"
                placeholder="weekly_worksheet_completion"
                disabled
              />

              <!--                <input type="hidden" v-model="item.has_options === ?"/>-->

              <d-select
                class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                style="border: none;"
                v-model="formData.weekly_worksheet_completion.type"
              >
                <option disabled selected :value="undefined"
                  >Select Scorecard Type</option
                >
                <option value="optional">DropDown</option>
                <option value="direct">Short Text</option>
              </d-select>
            </div>
            <div
              v-show="formData.weekly_worksheet_completion.type === 'optional'"
            >
              <div
                class="m-2 d-flex flex-row  "
                v-for="(item, index) in formData.weekly_worksheet_completion
                  .options"
              >
                <icon class="m-2 " size="lg" name="eclipse" />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.option"
                  placeholder="Option Value"
                />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.score"
                  placeholder="Score Value"
                />
                <icon
                  size="lg"
                  class="ml-auto"
                  @click="deleteOption('weekly_worksheet_completion', index)"
                  name="cancel"
                />
              </div>
              <hr class="border-top mx-auto" />
              <div class="d-flex flex-row m-2">
                <icon
                  size="lg"
                  class=" "
                  @click="addOption('weekly_worksheet_completion')"
                  name="add"
                  v-show="
                    formData.weekly_worksheet_completion.type === 'optional'
                  "
                />
              </div>
            </div>
            <div
              v-show="formData.weekly_worksheet_completion.type === 'direct'"
            >
              <d-input
                v-model="formData.weekly_worksheet_completion.score"
                class="col-lg-4 col-md-4 col-6 m-3 "
                placeholder="Enter Score"
              />
            </div>
          </d-card>

          <d-card class="m-3">
            <div class="row m-2">
              <d-input
                class="col-md-8 col-8 text-dark col-lg-8 font-open-sans  m-2"
                placeholder="Agreed Goals"
                disabled
              />

              <!--                <input type="hidden" v-model="item.has_options === ?"/>-->

              <d-select
                class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                style="border: none;"
                v-model="formData.agreed_goals.type"
              >
                <option disabled selected :value="undefined"
                  >Select Scorecard Type</option
                >
                <option value="optional">DropDown</option>
                <option value="direct">Short Text</option>
              </d-select>
            </div>
            <div v-show="formData.agreed_goals.type === 'optional'">
              <div
                class="m-2 d-flex flex-row  "
                v-for="(item, index) in formData.agreed_goals.options"
              >
                <icon class="m-2 " size="lg" name="eclipse" />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.option"
                  placeholder="Option Value"
                />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.score"
                  placeholder="Score Value"
                />
                <icon
                  size="lg"
                  class="ml-auto"
                  @click="deleteOption('agreed_goals', index)"
                  name="cancel"
                />
              </div>
              <hr class="border-top mx-auto" />
              <div class="d-flex flex-row m-2">
                <icon
                  size="lg"
                  class=" "
                  @click="addOption('agreed_goals')"
                  name="add"
                  v-show="formData.agreed_goals.type === 'optional'"
                />
              </div>
            </div>
            <div v-show="formData.agreed_goals.type === 'direct'">
              <d-input
                v-model="formData.agreed_goals.score"
                class="col-lg-4 col-md-4 col-6 m-3 "
                placeholder="Enter Score"
              />
            </div>
          </d-card>

          <d-card class="m-3">
            <div class="row m-2">
              <d-input
                class="col-md-8 col-8 text-dark col-lg-8 font-open-sans  m-2"
                placeholder="Percieved Challenges"
                disabled
              />

              <!--                <input type="hidden" v-model="item.has_options === ?"/>-->

              <d-select
                class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                style="border: none;"
                v-model="formData.perceived_challenges.type"
              >
                <option disabled selected :value="undefined"
                  >Select Scorecard Type</option
                >
                <option value="optional">DropDown</option>
                <option value="direct">Short Text</option>
              </d-select>
            </div>
            <div v-show="formData.perceived_challenges.type === 'optional'">
              <div
                class="m-2 d-flex flex-row  "
                v-for="(item, index) in formData.perceived_challenges.options"
              >
                <icon class="m-2 " size="lg" name="eclipse" />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.option"
                  placeholder="Option Value"
                />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.score"
                  placeholder="Score Value"
                />
                <icon
                  size="lg"
                  class="ml-auto"
                  @click="deleteOption('perceived_challenges', index)"
                  name="cancel"
                />
              </div>
              <hr class="border-top mx-auto" />
              <div class="d-flex flex-row m-2">
                <icon
                  size="lg"
                  class=" "
                  @click="addOption('perceived_challenges')"
                  name="add"
                  v-show="formData.perceived_challenges.type === 'optional'"
                />
              </div>
            </div>
            <div v-show="formData.perceived_challenges.type === 'direct'">
              <d-input
                v-model="formData.perceived_challenges.score"
                class="col-lg-4 col-md-4 col-6 m-3 "
                placeholder="Enter Score"
              />
            </div>
          </d-card>

          <d-card class="m-3">
            <div class="row m-2">
              <d-input
                class="col-md-8 col-8 text-dark col-lg-8 font-open-sans  m-2"
                placeholder="Progress on Weekly Goals"
                disabled
              />

              <!--                <input type="hidden" v-model="item.has_options === ?"/>-->

              <d-select
                class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                style="border: none;"
                v-model="formData.progress_on_weekly_goals.type"
              >
                <option disabled selected :value="undefined"
                  >Select Scorecard Type</option
                >
                <option value="optional">DropDown</option>
                <option value="direct">Short Text</option>
              </d-select>
            </div>
            <div v-show="formData.progress_on_weekly_goals.type === 'optional'">
              <div
                class="m-2 d-flex flex-row  "
                v-for="(item, index) in formData.progress_on_weekly_goals
                  .options"
              >
                <icon class="m-2 " size="lg" name="eclipse" />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.option"
                  placeholder="Option Value"
                />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.score"
                  placeholder="Score Value"
                />
                <icon
                  size="lg"
                  class="ml-auto"
                  @click="deleteOption('progress_on_weekly_goals', index)"
                  name="cancel"
                />
              </div>
              <hr class="border-top mx-auto" />
              <div class="d-flex flex-row m-2">
                <icon
                  size="lg"
                  class=" "
                  @click="addOption('progress_on_weekly_goals')"
                  name="add"
                  v-show="formData.progress_on_weekly_goals.type === 'optional'"
                />
              </div>
            </div>
            <div v-show="formData.progress_on_weekly_goals.type === 'direct'">
              <d-input
                v-model="formData.progress_on_weekly_goals.score"
                class="col-lg-4 col-md-4 col-6 m-3 "
                placeholder="Enter Score"
              />
            </div>
          </d-card>

          <d-card class="m-3">
            <div class="row m-2">
              <d-input
                class="col-md-8 col-8 text-dark col-lg-8 font-open-sans  m-2"
                placeholder="Coach Comments"
                disabled
              />

              <!--                <input type="hidden" v-model="item.has_options === ?"/>-->

              <d-select
                class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                style="border: none;"
                v-model="formData.coach_comment.type"
              >
                <option disabled selected :value="undefined"
                  >Select Scorecard Type</option
                >
                <option value="optional">DropDown</option>
                <option value="direct">Short Text</option>
              </d-select>
            </div>
            <div v-show="formData.coach_comment.type === 'optional'">
              <div
                class="m-2 d-flex flex-row  "
                v-for="(item, index) in formData.coach_comment.options"
              >
                <icon class="m-2 " size="lg" name="eclipse" />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.option"
                  placeholder="Option Value"
                />
                <d-input
                  class="col-md-4 m-2"
                  v-model="item.score"
                  placeholder="Score Value"
                />
                <icon
                  size="lg"
                  class="ml-auto"
                  @click="deleteOption('coach_comment', index)"
                  name="cancel"
                />
              </div>
              <hr class="border-top mx-auto" />
              <div class="d-flex flex-row m-2">
                <icon
                  size="lg"
                  class=" "
                  @click="addOption('coach_comment')"
                  name="add"
                  v-show="formData.coach_comment.type === 'optional'"
                />
              </div>
            </div>
            <div v-show="formData.coach_comment.type === 'direct'">
              <d-input
                v-model="formData.coach_comment.score"
                class="col-lg-4 col-md-4 col-6 m-3 "
                placeholder="Enter Score"
              />
            </div>
          </d-card>
          <sla-button
            class="btn  m-3  text-uppercase "
            :text="buttons.text"
            type="filled"
            size="md"
            :disabled="buttons.isLoading"
            @click="handleSubmit"
          />
          <!--          <Editor />-->
        </div>
      </div>
    </d-row>
  </d-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import Multiselect from "vue-multiselect";
import axios from "axios";
import store from "@/store/index";
const token = store.state.auth.token;
export default {
  name: "create",
  data() {
    return {
      error: {
        status: null,
        message: null
      },
      buttons: {
        isLoading: false,
        text: "PUBLISH"
      },
      formData: {
        weekly_course_completion: {
          options: []
        },
        weekly_worksheet_completion: {
          options: []
        },
        agreed_goals: {
          options: []
        },
        perceived_challenges: {
          options: []
        },
        progress_on_weekly_goals: {
          options: []
        },
        coach_comment: {
          options: []
        }
      }
    };
  },
  methods: {
    deleteQuiz(index) {
      this.formData.questions.splice(index, 1);
    },
    addOption(formDataObject, index) {
      this.formData[formDataObject].options.push({ option: "", score: "" });
    },
    deleteOption(formDataObject, index2) {
      this.formData[formDataObject].options.splice(index2, 1);
    },
    async handleSubmit() {
      this.buttons.isLoading = true;
      this.buttons.text = "Loading.....";
      const self = this;
      const token = store.state.auth.token;
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/scorecard/create-template`,
          this.formData,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          self.buttons.isLoading = false;
          self.buttons.text = "PUBLISH";
          self.quiz = [];
          self.$toast.success((self.error.message = res.data.message));
          setTimeout(function() {
            self.$router.push({ path: "/scorecard/all" });
          }, 2000);
        })
        .catch(ex => {
          self.buttons.isLoading = false;
          self.buttons.text = "PUBLISH";
          self.$toast.error(
            (self.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
        });
    }
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    vueDropzone: vue2Dropzone,
    Multiselect,
    Editor: () => import("@/components/add-new-post/Editor"),
    Icon: () => import("@/components/SlaIcon"),
    SlaButton: () => import("@/components/SlaButton")
  }
};
</script>

<style scoped></style>
