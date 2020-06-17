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
      <!-- Page Header -->
      <top :heading="Resource.question" />
      <d-row no-gutters class="page-header py-4">
        <Toasts
          :show-progress="false"
          :rtl="false"
          :max-messages="5"
          :time-out="4000"
          :closeable="false"
        ></Toasts>
        <d-col sm="12" md="6" lg="6" class="mt-5 mt-lg-0 mt-md-0">
          <d-form-row>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Question</label>
              <d-input
                size="lg"
                class="mb-3"
                placeholder=" Question"
                v-model="Resource.question"
              />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Answer</label>
              <textarea
                size="lg"
                v-model="Resource.answer"
                style="min-height: 140px;"
                class="form-control mb-3"
              >
              </textarea>
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-center"> Category</label>
              <multiselect
                size="lg"
                class="mb-3"
                v-model="Resource.category"
                placeholder="Category"
                :multiple="true"
                :taggable="true"
                :close-on-select="true"
                :clear-on-select="false"
                :preserve-search="true"
                :preselect-first="false"
                :options="category_options"
                @tag="addCategory"
              >
              </multiselect>
            </d-col>
            <d-col md="12" class="form-group">
              <label for="feFirstName"> Tags</label>
              <multiselect
                size="lg"
                class="mb-3"
                v-model="formData.list_tags"
                placeholder="Tags"
                :multiple="true"
                :taggable="true"
                :close-on-select="true"
                :clear-on-select="false"
                :preserve-search="true"
                :preselect-first="false"
                :options="options"
                @tag="addTag"
              >
              </multiselect>
              <p class="font-poppins text-bold" style="font-weight: bold">
                Recipients
              </p>
              <div class="form-group mt-3 mb-3 ">
                <d-select v-model="Resource.recepients" class="col-md-3">
                  <option selected value="everyone">To Everyone</option>
                  <option value="participant">Participant</option>
                  <option value="admin">Admins</option>
                  <option value="coaches">Coaches</option>
                </d-select>
              </div>
            </d-col>
          </d-form-row>
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
      <footer class="border-top ">
        <sla-button
          class="btn  m-3  text-uppercase float-right"
          :text="buttons.text"
          type="filled"
          size="sm"
          :disabled="buttons.isLoading"
          @click="handleSubmit('publish')"
        />
        <sla-button
          class="btn  m-3  text-uppercase float-right"
          :text="buttons.text1"
          type="outline"
          size="sm"
          :disabled="buttons.isLoading"
          @click="handleSubmit('save')"
        />
        <sla-button
          class="btn  m-3  text-uppercase float-right"
          text="Schedule"
          type="outline"
          @click="scheduleModal = true"
          size="sm"
        />
      </footer>
    </d-container>
  </div>
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
      isLoaded: false,
      Resource: undefined,

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
      category_options: [],
      formData: {
        question: null,
        answer: "",
        list_category: [],
        list_tags: [],
        schedule: undefined,
        recepients: "everyone"
      },
      time: {
        reminder: {
          days: undefined,
          month: undefined,
          year: undefined,
          hour: undefined,
          final_date: null
        },
        publish: {
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
      }
    };
  },
  methods: {
    async addTag(newTag) {
      this.options.push(newTag);
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/tag/admin/create`,
          { name: newTag },
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          this.options.push(newTag);
        })
        .catch(ex => {
          this.$toast.error(
            (this.error.message = ex.response.data
              ? ex.response.data.message.message
              : "An error occured")
          );
        });
    },
    async addCategory(newTag) {
      this.category_options.push(newTag);
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/resource-category/admin/create`,
          { name: newTag },
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          this.category_options.push(newTag);
        })
        .catch(ex => {
          this.$toast.error(
            (this.error.message = ex.response.data
              ? ex.response.data.message.message
              : "An error occured")
          );
        });
    },

    splitDateString(dateString, Obj, Obj2) {
      let res = dateString.split("T");
      let res2 = res[0].split("-");
      let hr = res[1].split(":");
      let final_hr = hr[0] + ":" + hr[1];
      Obj.year = res2[0];
      Obj.month = parseInt(res2[1]);
      Obj.days = parseInt(res2[2]);
      Obj.hour = final_hr;

      Obj.final_date =
        Obj.year + "-" + Obj.month + "-" + Obj.days + " " + Obj.hour;
      Obj2 = new Date(Obj.final_date).toISOString();
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
    async handleSubmit(type) {
      this.Resource.tags = this.formData.list_tags.join(",");
      switch (type) {
        case "save":
          this.buttons.isLoading = true;
          this.buttons.text1 = "Loading.....";
          this.Resource.status = "save";
          break;
        case "publish":
          this.buttons.isLoading = true;
          this.Resource.status = "publish";
          this.buttons.text = "Loading.....";
          break;
        default:
          break;
      }
      const self = this;
      const token = store.state.auth.token;
      let res = await axios
        .put(
          `${process.env.VUE_APP_API}/resource/edit/` + self.Resource._id,
          self.Resource,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          switch (type) {
            case "save":
              self.buttons.isLoading = false;
              self.buttons.text1 = "Save";
              self.quiz = [];
              self.$toast.success((self.error.message = res.data.message));
              setTimeout(function() {
                self.$router.push({ path: "/resources/all" });
              }, 2000);
              break;
            case "publish":
              self.buttons.isLoading = false;
              self.buttons.text = "Publish";
              self.quiz = [];
              self.$toast.success((self.error.message = res.data.message));
              setTimeout(function() {
                self.$router.push({ path: "/resources/all" });
              }, 2000);
              break;
            default:
              break;
          }
        })
        .catch(ex => {
          self.formData.list_tags = self.Resource.tags.split(",");
          switch (type) {
            case "save":
              self.buttons.isLoading = false;
              self.buttons.text1 = "Save";
              self.$toast.error(
                (self.error.message = ex.response.data
                  ? ex.response.data.message
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
    }
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    Top: () => import("@/components/top"),
    vueDropzone: vue2Dropzone,
    Multiselect,
    Editor: () => import("@/components/add-new-post/Editor"),
    SlaButton: () => import("@/components/SlaButton"),
    deleteModal: () => import("@/components/deleteModal")
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
        this.formData.schedule = new Date(
          this.time.schedule.final_date
        ).toISOString();

        return this.time.schedule.final_date;
      }
    }
  },
  async mounted() {
    const self = this;
    await axios
      .get(`${process.env.VUE_APP_API}/resource/get/` + this.$route.params.id, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        self.Resource = res.data.data.resource;
        self.formData.list_tags = self.Resource.tags.split(",");
        self.isLoaded = true;
        if (self.Resource.schedule !== null) {
          self.splitDateString(
            self.Resource.schedule,
            self.time.schedule,
            self.formData.schedule
          );
        }
      })
      .catch(ex => {});
    await axios
      .get(`${process.env.VUE_APP_API}/tag/admin/list`, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        let tags_list = res.data.data.tags;
        tags_list.forEach(tag => {
          self.options.push(tag.name);
        });
      })
      .catch(ex => {});
    await axios
      .get(`${process.env.VUE_APP_API}/resource-category/admin/list`, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        let category_lists = res.data.data.categories;
        category_lists.forEach(tag => {
          self.category_options.push(tag.name);
        });
      })
      .catch(ex => {});
  },
  watch: {
    scheduleDate: {
      handler: "watchSchedule"
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped></style>
