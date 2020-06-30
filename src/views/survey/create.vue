<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <Toasts
        :show-progress="false"
        :rtl="false"
        :max-messages="5"
        :time-out="4000"
        :closeable="false"
      ></Toasts>
      <d-col sm="12" md="6" lg="6" class="mt-5 mt-lg-0 mt-md-0">
        <d-input
          size="lg"
          class="mb-3"
          placeholder="Survey Title"
          v-model="formData.title"
        />
        <d-textarea
          v-model="formData.description"
          rows="8"
          class="mb-3"
          placeholder="Description"
        />
        <div class="form-group">
          <label class="font-poppins " style="font-weight: bold;color: black"
            >For Recipients</label
          >
          <br />
          <div class="p-4" v-for="(item, index) in formData.questions">
            <d-card>
              <div class="row m-2">
                <d-input
                  class="col-md-8 col-8 col-lg-8 border-bottom m-2"
                  style="border: none;"
                  v-model="item.question_text"
                  placeholder="Enter the Survey question"
                />

                <!--                <input type="hidden" v-model="item.has_options === ?"/>-->

                <d-select
                  class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                  style="border: none;"
                  v-model="item.has_options"
                >
                  <option disabled selected :value="undefined"
                    >Select Survey Type</option
                  >
                  <option selected :value="true">Multiple</option>
                  <option selected :value="false">Long Text</option>
                </d-select>
              </div>
              <div v-show="formData.questions[index].has_options">
                <div
                  class="m-2 d-flex flex-row"
                  v-for="(item2, index2) in formData.questions[index]
                    .possible_options"
                >
                  <icon class="m-2 " size="lg" name="eclipse" /><d-input
                    class="col-md-4 m-2"
                    v-model="item2.value"
                    :placeholder="'option' + (index2 + 1)"
                  />
                  <icon
                    size="lg"
                    class="ml-auto"
                    @click="deleteOption(index, index2)"
                    name="cancel"
                  />
                </div>
                <div class="d-flex flex-row m-2">
                  <icon
                    size="lg"
                    class=" "
                    @click="addOption(index)"
                    name="add"
                    v-show="formData.questions[index].has_options"
                  />
                </div>
              </div>
              <div class="d-flex flex-row m-2">
                <icon
                  size="lg"
                  class="ml-auto  border-right"
                  @click="deleteQuiz(index)"
                  name="bin"
                />
                <div class="d-flex flex-row m-1 mt-n1">
                  <label class="mt-2 p-1" style="color: #999999;"
                    >Required</label
                  >
                  <input class="m-2" type="checkbox" v-model="item.required" />
                </div>
              </div>
            </d-card>
            <!--          <Editor />-->
          </div>
          <button
            class="btn btn-sm btn-outline-light     "
            style="background: #FFFFFF;border: 1px solid #E7E6E6;border-radius: 5px; color: black"
            @click="addQuiz()"
          >
            <icon name="add" /> <span> Add Question</span>
          </button>
        </div>
        <label
          class="font-poppins text-bold"
          style="font-weight: bold;color: black;"
        >
          Recipients</label
        >
        <br />
        <div class="form-group mt-3 mb-3 ">
          <d-select v-model="formData.recipients" class="col-md-3">
            <option selected value="everyone">To Everyone</option>
            <option value="participants">Participant</option>
            <option value="admin">Admins</option>
            <option value="coaches">Coaches</option>
          </d-select>
        </div>
        <footer class="text-center text-grey">
          <p>
            Assign Points (This is the point a user will get for completing this
            survey)
          </p>
          <d-input class="col-md-1 mx-auto" v-model="formData.reward" />
        </footer>
      </d-col>

      <d-col sm="12" md="6" lg="6" class="mt-5 mt-lg-0 mt-md-0">
        <vue-dropzone
          v-model="formData.cover_image"
          :options="dropzoneOptions"
          id="dropZone"
          :useCustomSlot="true"
          class="mx-auto mb-3"
          ref="courseImage"
          :style="
            'width: 300px; height: 300px;' +
              'backgroundImage:url(' +
              formData.cover_image +
              '); ' +
              ' background-size:cover; background-position:center'
          "
        >
          <h3 class="p-2 mt-5"><icon size="lg" name="camera" /></h3>
          <div class="subtitle p-2 mt-3">Click to add cover image</div>
          <div class="subtitle p-2 text-danger">
            Image must be 300x300px
          </div>
        </vue-dropzone>
        <p class="text-center m-3 ">
          <span class="text-black">Expiry </span><span>(DD/MM/YY)</span>
        </p>
        <d-input-group class="justify-content-center m-2 ">
          <d-select v-model="time.expiry.days" class="col-md-2 mr-2">
            <option :value="undefined">Day:</option>
            <option :value="i" v-for="i in 31">{{ i }}</option>
          </d-select>
          <d-select class="col-md-2 mr-2" v-model="time.expiry.month">
            <option :value="undefined">Month:</option>
            <option :value="i" v-for="i in 12">{{ i }}</option>
          </d-select>
          <d-select class="col-md-2 mr-2 " v-model="time.expiry.year">
            <option :value="undefined">Year:</option>
            <option v-for="year in years" :value="year">{{ year }}</option>
          </d-select>
          <input
            class="col-md-3 form-control"
            type="time"
            v-model="time.expiry.hour"
          />
          <input type="hidden" v-model="expiryDate" />
        </d-input-group>

        <p class="text-center m-3 ">
          <span class="text-black text-bold"
            >Remind Users About Expiry Date on: </span
          ><span>(DD/MM/YY)</span>
        </p>
        <d-input-group class="justify-content-center m-2 ">
          <d-select v-model="time.reminder.days" class="col-md-2 mr-2">
            <option :value="undefined">Day:</option>
            <option v-for="i in 31">{{ i }}</option>
          </d-select>
          <d-select class="col-md-2 mr-2" v-model="time.reminder.month">
            <option :value="undefined">Month:</option>

            <option v-for="i in 12">{{ i }}</option>
          </d-select>
          <d-select class="col-md-2 mr-2 " v-model="time.reminder.year">
            <option :value="undefined">Year:</option>
            <option v-for="year in years" :value="year">{{ year }}</option>
          </d-select>
          <d-input class="col-md-3" type="time" v-model="time.reminder.hour" />
          <input type="hidden" v-model="reminderDate" />
        </d-input-group>
        <div class="text-center">
          <br />
          <p
            class="font-open-sans"
            style="color: #0087DB; cursor: pointer; font-size: 14px;"
            @click="scheduleModal = true"
          >
            SCHEDULE
          </p>
          <sla-button
            type="outline"
            size="md"
            :text="buttons.text1"
            class=" btn   p-3   col-md-6 m-1 "
            @click="handleSubmit('save')"
          >
          </sla-button>
          <sla-button
            type="filled"
            size="md"
            :text="buttons.text"
            class=" btn   p-3 mt-4  col-md-6  m-1"
            @click="handleSubmit('publish')"
            :disabled="buttons.isLoading"
          >
          </sla-button>
        </div>
      </d-col>
      <d-modal v-if="scheduleModal" @close="scheduleModal = false" size="lg">
        <d-modal-header class="text-center">
          <d-modal-title class="font-poppings text-black">
            What time and Date do you want to Schedule?
          </d-modal-title>
        </d-modal-header>
        <d-modal-body>
          <d-input-group class="justify-content-center m-2 ">
            <d-select v-model="time.schedule.days" class="col-md-2 mr-2">
              <option :value="undefined">Day:</option>
              <option :value="i" v-for="i in 31">{{ i }}</option>
            </d-select>
            <d-select class="col-md-2 mr-2" v-model="time.schedule.month">
              <option :value="undefined">Month:</option>
              <option :value="i" v-for="i in 12">{{ i }}</option>
            </d-select>
            <d-select class="col-md-2 mr-2 " v-model="time.schedule.year">
              <option :value="undefined">Year:</option>
              <option v-for="year in years" :value="year">{{ year }}</option>
            </d-select>
            <input
              class="col-md-3 form-control"
              type="time"
              v-model="time.schedule.hour"
            />
            <input type="hidden" v-model="scheduleDate" />
          </d-input-group>
        </d-modal-body>
      </d-modal>
    </d-row>
  </d-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import VueTrix from "vue-trix";
import axios from "axios";
import Multiselect from "vue-multiselect";
import store from "@/store/index";

import Quill from "quill";
import quillEmij from "quill-emoji/dist/quill-emoji";
import "quill-emoji/dist/quill-emoji.css";

const token = store.state.auth.token;

export default {
  name: "create",
  data() {
    return {
      error: {
        status: null,
        message: null
      },
      scheduleModal: false,
      buttons: {
        publish: false,
        published: false,
        save: false,
        isLoading: false,
        text: "PUBLISH",
        text1: "SAVE"
      },
      options: [],
      dropzoneOptions: {
        // url:' url:  'localhost',',
        url: "http://localhost:8000/api/image",
        // acceptedFiles: "images/*",
        // thumbnailMethod:'contain',
        addRemoveLinks: true,
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        maxFileSizeInMB: 2, // MB
        maxNumberOfFiles: 1,
        preventDuplicates: true,
        resizeWidth: 300,
        resizeHeight: 300
        // resize: this.resize,
      },
      formData: {
        title: null,
        description: "",
        question: "",
        recipients: "everyone",
        cover_image: "",
        questions: []
      },
      time: {
        reminder: {
          days: undefined,
          month: undefined,
          year: undefined,
          hour: undefined,
          final_date: null
        },
        expiry: {
          days: undefined,
          month: undefined,
          year: undefined,
          hour: undefined,
          final_date: null
        },
        schedule: {
          days: undefined,
          month: undefined,
          year: undefined,
          hour: undefined,
          final_date: null
        }
      },
      showQuestion: false
    };
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    vueDropzone: vue2Dropzone,
    Multiselect,
    Editor: () => import("@/components/add-new-post/Editor"),
    SlaButton: () => import("@/components/SlaButton")
  },
  methods: {
    async handleSubmit(type) {
      switch (type) {
        case "save":
          this.buttons.isLoading = true;
          this.buttons.text1 = "Loading.....";
          this.formData.save_type = "saved";
          break;
        case "publish":
          this.buttons.isLoading = true;
          this.formData.save_type = "published";

          this.buttons.text = "Loading.....";
          break;
        default:
          break;
      }
      const self = this;
      const token = store.state.auth.token;
      if (self.formData.schduled_at !== undefined) {
        self.formData.save_type = "scheduled";
      }

      self.formData.survey_image = self.formData.cover_image;
      let res = await axios
        .post(`${process.env.VUE_APP_API}/survey/create`, self.formData, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          self.formData = {};
          switch (type) {
            case "save":
              self.buttons.isLoading = false;
              self.buttons.text1 = "Save";
              self.quiz = [];
              self.$toast.success((self.error.message = res.data.message));
              setTimeout(function() {
                self.$router.push({ path: "/surveys/all" });
              }, 2000);
              break;
            case "publish":
              self.buttons.isLoading = false;
              self.buttons.text = "Publish";
              self.quiz = [];
              self.$toast.success((self.error.message = res.data.message));
              setTimeout(function() {
                self.$router.push({ path: "/surveys/all" });
              }, 2000);
              break;
            default:
              break;
          }
        })
        .catch(ex => {
          switch (type) {
            case "save":
              self.buttons.isLoading = false;
              self.buttons.text1 = "Save";
              self.$toast.error(
                (self.error.message = ex.response.data
                  ? ex.response.data.message.message
                  : "An error occured")
              );
              break;
            case "publish":
              self.buttons.isLoading = false;
              self.buttons.text = "Publish";
              self.$toast.error(
                (self.error.message = ex.response.data
                  ? ex.response.data.message.message
                  : "An error occured")
              );
              break;
            default:
              break;
          }
        });
    },
    async addTag(newTag) {
      // this.options.push(newTag);
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/category/admin/create`,
          { name: newTag },
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          this.formData.category.push(newTag);
          this.formData.tags.push(newTag);
        })
        .catch(ex => {
          this.$toast.error(
            (this.error.message = ex.response.data
              ? ex.response.data.message.message
              : "An error occured")
          );
        });
    },
    watchReminder: function() {
      let currentDate =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
      let value = this.time.reminder.final_date;

      if (new Date(value) < new Date(currentDate)) {
        this.$toast.error(
          (this.error.message = "You can not  input a reminder in the past!")
        );
        this.buttons.isLoading = true;
      } else {
        this.buttons.isLoading = false;
      }
    },
    watchExpiry: function() {
      let currentDate =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
      let value = this.time.expiry.final_date;

      if (new Date(value) < new Date(currentDate)) {
        this.$toast.error(
          (this.error.message = "You can not input a expiry date in the past!")
        );
      }
    },
    watchSchedule: function() {
      let currentDate =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
      let value = this.time.schedule.final_date;

      if (new Date(value) < new Date(currentDate)) {
        this.$toast.error(
          (this.error.message =
            "You can not  input a  schedule date in the past!")
        );
        this.buttons.isLoading = true;
      } else {
        this.buttons.isLoading = false;
      }
    },
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
    }
  },
  watch: {
    editorContent: {
      handler: "updateEditorContent"
    },
    reminderDate: {
      handler: "watchReminder"
    },
    scheduleDate: {
      handler: "watchSchedule"
    },
    expiryDate: {
      handler: "watchExpiry"
    }
  },
  mounted() {
    this.$refs.courseImage.dropzone.on("addedfile", file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const self = this;
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        self.formData.cover_image = "data:image/jpg/png;base64," + encoded;
      };
    });
  },
  computed: {
    years: () => {
      const year = new Date().getFullYear();
      return Array.from({ length: year }, (value, index) => year + index);
    },
    days: () => {
      const day = new Date().getDay();
      return Array.from({ length: day + 31 }, (value, index) => day + index);
    },
    categories: () => {
      const token = store.state.auth.token;
      let tags = [];
      let res = axios
        .get(`${process.env.VUE_APP_API}/category/admin/list`, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          let categories = res.data.data.categories;
          categories.forEach(category => {
            tags.push(category.name);
          });
          return tags;
        })
        .catch(ex => {});
      return tags;
    },
    reminderDate() {
      if (
        this.time.reminder.days !== undefined &&
        this.time.reminder.year !== undefined &&
        this.time.reminder.month !== undefined &&
        this.time.reminder.hour !== undefined
      ) {
        this.time.reminder.final_date =
          this.time.reminder.year +
          "-" +
          this.time.reminder.month +
          "-" +
          this.time.reminder.days +
          " " +
          this.time.reminder.hour;
        this.formData.reminder = new Date(
          this.time.reminder.final_date
        ).toISOString();

        return this.time.reminder.final_date;
      }
    },
    expiryDate() {
      if (
        this.time.expiry.days !== undefined &&
        this.time.expiry.year !== undefined &&
        this.time.expiry.month !== undefined &&
        this.time.expiry.hour !== undefined
      ) {
        this.time.expiry.final_date =
          this.time.expiry.year +
          "-" +
          this.time.expiry.month +
          "-" +
          this.time.expiry.days +
          " " +
          this.time.expiry.hour;
        this.formData.expiry = new Date(
          this.time.expiry.final_date
        ).toISOString();

        return this.time.expiry.final_date;
      }
    },
    scheduleDate() {
      if (
        this.time.schedule.days !== undefined &&
        this.time.schedule.year !== undefined &&
        this.time.schedule.month !== undefined &&
        this.time.schedule.hour !== undefined
      ) {
        this.time.schedule.final_date =
          this.time.schedule.year +
          "-" +
          this.time.schedule.month +
          "-" +
          this.time.schedule.days +
          " " +
          this.time.schedule.hour;
        this.formData.scheduled_at = new Date(
          this.time.schedule.final_date
        ).toISOString();

        return this.time.schedule.final_date;
      }
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
.btn-primary {
  background-color: #0087db !important;
}
.btn-outline-primary {
  border-color: #0087db !important;
}

.btn-outline-light {
  background: #ffffff;
  border-color: #0087db;
  color: #0087db;
}
.dropzone {
  width: 330px;
  height: 330px;
}
input[type="checkbox"] {
  position: relative;
  width: 41px;
  height: 25px;
  -webkit-appearance: none;
  background: #c6c6c6;
  outline: none;
  border-radius: 100px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 1s;
  top: 2px;
}
input:checked[type="checkbox"] {
  background: #0087db;
}
input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  top: 2px;
  left: 2px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}
input:checked[type="checkbox"]:before {
  left: 20px;
}
</style>
