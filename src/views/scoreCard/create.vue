<template>
  <d-container fluid class="main-content-container px-4">
    <d-row>
      <div class="col-12 col-lg-6 col-md-6">
        <div class="p-4">
          <d-card>
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
                  @click="deleteOption('weekly_course_completion', index2)"
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
          </d-card>
          <!--          <Editor />-->
        </div>
      </div>
    </d-row>
  </d-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import Multiselect from "vue-multiselect";

export default {
  name: "create",
  data() {
    return {
      error: {
        status: null,
        message: null
      },
      buttons: {
        published: false,
        isLoading: true,
        text: "Publish"
      },
      formData: {
        weekly_course_completion: {
          options: []
        },
        weekly_worksheet_completion: [],
        agreed_goals: [],
        perceived_challenges: [],
        progress_on_weekly_goals: [],
        coach_comment: []
      }
    };
  },
  methods: {
    addQuiz() {
      this.formData.questions.push({
        question_text: "",
        has_options: undefined,
        possible_options: []
      });

      // this.$emit('input', this.fields);
    },
    deleteQuiz(index) {
      this.formData.questions.splice(index, 1);
    },
    addOption(formDataObject, index) {
      this.formData[formDataObject].options.push({ option: "", Score: "" });
    },
    deleteOption(formDataObject, index2) {
      this.formData[formDataObject].options.splice(index2, 1);
    },
    handleSubmit() {}
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
