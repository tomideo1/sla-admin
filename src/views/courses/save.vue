<template>
  <d-container fluid>
    <d-row class=" mt-5">
      <Toasts
        :show-progress="false"
        :rtl="false"
        :max-messages="5"
        :time-out="4000"
        :closeable="false"
      ></Toasts>
      <div class="col-lg-12">
        <carousel refs="content">
          <div
            class="scroll m-2"
            v-for="(course, idx) in courses"
            :key="idx"
            v-if="course.saved === true"
          >
            <d-card
              @click="
                scheduleModal = true;
                courseObj = course;
              "
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  course.cover_image +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
            </d-card>
            <p
              class="title  text-capitalize mt-2 text-bold "
              style="max-width: 50%!important;"
            >
              {{ course.title }}
            </p>
            <p class=" text-capitalize mt-n4  " style="color: #999999;">
              {{ course.tags }}
            </p>
          </div>
        </carousel>
      </div>
    </d-row>
    <d-modal v-if="scheduleModal" @close="scheduleModal = false" :size="'md'">
      <div
        class="modal-header"
        :style="
          'width:100%!important;height: 206px!important;' +
            'backgroundImage:url(' +
            courseObj.cover_image +
            ');' +
            ' background-size:cover; background-position:center'
        "
      ></div>
      <h6 class="text-center m-2 text-bold text-dark font-poppings">
        {{ courseObj.title }}
      </h6>
      <span
        class=" text-center text-capitalize mt-0  border-bottom p-1 "
        style="color: #999999;"
      >
        {{ courseObj.tags }}
      </span>
      <d-modal-body>
        <p class=" m-3 ">
          <span class="text-black text-bold ml-4" style="color: #999999;"
            >Schedule Date
          </span>
        </p>
        <d-input-group class="justify-content-center m-2 ">
          <d-select v-model="time.publish.days" class="col-md-2 mr-2">
            <option :value="undefined">Day:</option>
            <option :value="i" v-for="i in 31">{{ i }}</option>
          </d-select>
          <d-select class="col-md-2 mr-2" v-model="time.publish.month">
            <option :value="undefined">Month:</option>
            <option :value="i" v-for="i in 12">{{ i }}</option>
          </d-select>
          <d-select class="col-md-2 mr-2 " v-model="time.publish.year">
            <option :value="undefined">Year:</option>
            <option v-for="year in years" :value="year">{{ year }}</option>
          </d-select>
          <input
            class="col-md-3 form-control"
            type="time"
            v-model="time.publish.hour"
          />
          <input type="hidden" v-model="publishdDate" />
        </d-input-group>

        <div class="text-center">
          <sla-button
            class="m-2 col-md-4"
            type="filled"
            size="md"
            :text="buttons.text"
            @click="handleUpdate"
          />
          <sla-button
            class="m-2 col-md-4"
            type="outline"
            size="md"
            :text="'CANCEL'"
            @click="scheduleModal = false"
          />
        </div>
      </d-modal-body>
    </d-modal>
    <!-- Page Header -->
    <!-- Using the slider component -->
    <!-- slideritem wrapped package with the components you need -->
  </d-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store/index";
export default {
  name: "course-home",
  data() {
    return {
      ref_data: "content",
      courseProgram: [],
      scheduleModal: false,
      courseObj: null,
      buttons: {
        isLoading: true,
        text: "SAVE"
      },
      error: {
        status: null,
        message: null
      },
      time: {
        schedule: {
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
        }
      },
      formData: {
        schedule: null
      }
    };
  },
  computed: {
    ...mapGetters({
      courses: "app/getCourses"
      // maps courses to current computed resource
    }),
    publishdDate() {
      if (
        this.time.publish.days !== undefined &&
        this.time.publish.year !== undefined &&
        this.time.publish.month !== undefined &&
        this.time.publish.hour !== undefined
      ) {
        this.time.publish.final_date =
          this.time.publish.year +
          "-" +
          this.time.publish.month +
          "-" +
          this.time.publish.days +
          " " +
          this.time.publish.hour;
        this.formData.schedule = new Date(
          this.time.publish.final_date
        ).toISOString();

        return this.time.publish.final_date;
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
        this.formData.schedule = new Date(
          this.time.publish.final_date
        ).toISOString();

        return this.time.schedule.final_date;
      }
    },
    years: () => {
      const year = new Date().getFullYear();
      return Array.from({ length: year }, (value, index) => year + index);
    },
    days: () => {
      const day = new Date().getDay();
      return Array.from({ length: day + 31 }, (value, index) => day + index);
    }
  },
  methods: {
    ...mapActions("app/", ["getAllCourses"]),
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
    watchPublish: function() {
      let currentDate =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
      let value = this.time.publish.final_date;

      if (new Date(value) < new Date(currentDate)) {
        this.$toast.error(
          (this.error.message =
            "You can not  input a go live date in the past!")
        );
        this.buttons.isLoading = true;
      } else {
        this.buttons.isLoading = false;
      }
    },

    async handleUpdate() {
      this.buttons.isLoading = true;
      this.buttons.text = "Loading.....";
      const token = store.state.auth.token;
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/course/` + this.courseObj._id + `/update`,
          this.formData,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then()
        .catch(res => {
          this.buttons.isLoading = false;
          this.buttons.text = "SAVE";
        });
    }
    //vuex call to get all courses
  },
  watch: {
    publishdDate: {
      handler: "watchPublish"
    },
    scheduleDate: {
      handler: "watchSchedule"
    },
    reminderDate: {
      handler: "watchReminder"
    }
  },

  async mounted() {
    this.getAllCourses();
    this.courses.filter(course => {
      if (course.saved === false) {
        return course;
      }
    });
  },
  components: {
    Carousel: () => import("@/components/carousel"),
    Icon: () => import("@/components/SlaIcon"),
    SlaButton: () => import("@/components/SlaButton")
  }
};
</script>

<style scoped lang="css"></style>
