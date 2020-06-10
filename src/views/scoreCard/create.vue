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
          <d-card class="m-3" v-for="(sample, idx) in formData.template">
            <div class="row m-2">
              <d-input
                v-model="sample.field_name"
                class="col-md-8 col-8 text-dark col-lg-8 font-open-sans  m-2"
                placeholder="Enter The Field Name"
              />

              <!--                <input type="hidden" v-model="item.has_options === ?"/>-->

              <d-select
                class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                style="border: none;"
                v-model="sample.type"
              >
                <option disabled selected :value="undefined"
                  >Select Scorecard Type</option
                >
                <option value="optional">DropDown</option>
                <option value="direct">Short Text</option>
              </d-select>
            </div>
            <div v-show="sample.type === 'optional'">
              <div
                class="m-2 d-flex flex-row  "
                v-for="(item, index) in sample.options"
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
                  @click="deleteOption(idx, index)"
                  name="cancel"
                />
              </div>
              <hr class="border-top mx-auto" />
              <div class="d-flex flex-row m-2">
                <icon
                  size="lg"
                  class=" "
                  @click="addOption(idx)"
                  name="add"
                  v-show="sample.type === 'optional'"
                />
              </div>
            </div>
            <div v-show="sample.type === 'direct'">
              <d-input
                v-model="sample.score"
                class="col-lg-4 col-md-4 col-6 m-3 "
                placeholder="Enter Score"
              />
            </div>
            <div class="ml-auto m-2">
              <icon
                size="lg"
                class="ml-auto border-right"
                @click="deleteSample(idx, index)"
                name="bin"
              />
            </div>
          </d-card>
          <div class="text-center">
            <d-button
              class="btn btn-outline-light  mt-4  p-3 col-md-8 "
              style="background: #FFFFFF;border: 1px solid #E7E6E6;border-radius: 5px; color: black"
              @click="addSample()"
            >
              <icon name="add" /> <span> Add Sample</span>
            </d-button>
            <!--Add Quiz-->
          </div>
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
        template: [
          {
            field_name: "",
            type: "direct",
            options: []
          }
        ]
      }
    };
  },
  methods: {
    addSample() {
      this.formData.template.push({
        field_name: "",
        type: "direct",
        options: []
      });
    },
    deleteSample(index) {
      this.formData.template.splice(index, 1);
    },
    addOption(index) {
      this.formData.template[index].options.push({ option: "", score: "" });
    },
    deleteOption(index, index2) {
      this.formData.template[index].options.splice(index2, 1);
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
            self.$router.push({ path: "/scorecards/all" });
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
