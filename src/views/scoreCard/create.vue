<template>
  <d-container fluid class="main-content-container px-4">
    <d-row>
      <div class="col-12 col-lg-6 col-md-6">
        <div class="p-4" v-for="(item, index) in formData.questions">
          <d-card>
            <div class="row m-2">
              <d-select
                class="col-md-8 col-8 text-dark col-lg-8 border-bottom m-2"
                style="border: none;"
              >
                <option disabled selected :value="undefined"
                  >Select User
                </option>
                <option v-for="i in 10" value="user">Users {{ i }}</option>
              </d-select>

              <!--                <input type="hidden" v-model="item.has_options === ?"/>-->

              <d-select
                class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                style="border: none;"
                v-model="item.has_options"
              >
                <option disabled selected :value="undefined"
                  >Select Scorecard Type</option
                >
                <option selected :value="true">DropDown</option>
                <option selected :value="false">Short Text</option>
              </d-select>
            </div>
            <div v-show="formData.questions[index].has_options">
              <div
                class="m-2 d-flex flex-row  "
                v-for="(item2, index2) in formData.questions[index]
                  .possible_options"
              >
                <icon class="m-2 " size="lg" name="eclipse" />
                <d-input
                  class="col-md-8 m-2"
                  v-model="item2.value"
                  :placeholder="'Score Card ' + (index2 + 1)"
                />
                <icon
                  size="lg"
                  class="ml-auto"
                  @click="deleteOption(index, index2)"
                  name="cancel"
                />
              </div>
              <hr class="border-top mx-auto" />
              <div class="d-flex flex-row m-2">
                <icon
                  size="lg"
                  class=" "
                  @click="addOption(index)"
                  name="add"
                  v-show="formData.questions[index].has_options"
                />

                <icon
                  size="lg"
                  class="ml-auto  border-right"
                  @click="deleteQuiz(index)"
                  name="copy"
                />
                <icon size="lg" @click="deleteQuiz(index)" name="bin" />
              </div>
            </div>
          </d-card>
          <!--          <Editor />-->
        </div>
        <div class="text-center">
          <button
            class="btn btn-sm btn-outline-light m-3     "
            style="background: #FFFFFF;border: 1px solid #E7E6E6;border-radius: 5px; color: black"
            @click="addQuiz()"
          >
            <icon name="add" /> <span> Add Scorecard</span>
          </button>
          <br />
          <sla-button
            text="Publish"
            size="md"
            type="filled"
            class="btn m-3 col-md-6  float-left"
          />
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
        title: null,
        description: "",
        question: "",
        recipients: "everyone",
        cover_image: "",
        questions: [
          {
            question_text: "",
            has_options: undefined,
            possible_options: []
          }
        ]
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
    addOption(index) {
      this.formData.questions[index].possible_options.push({ value: "" });
    },
    deleteOption(index, index2) {
      this.formData.questions[index].possible_options.splice(index2, 1);
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
