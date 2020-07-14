<template>
  <div>
    <beat-loader
      class="loader m-3 centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <d-container v-if="isLoaded" fluid class="main-content-container px-4">
      <Toasts
        :show-progress="false"
        :rtl="false"
        :max-messages="5"
        :time-out="4000"
        :closeable="false"
      ></Toasts>
      <top :heading="course.title" />
      <div class="d-flex flex-row m-4">
        <a
          href="javascript:void(0)"
          style="color: inherit;text-decoration: none;"
          :class="['mr-2  ', pages.courseInfo ? 'text-dark' : '']"
          @click="step('course_info')"
          >Course Info
          <span> <icon size="xs" class="mt-n1" name="arrow-right"/></span
        ></a>
        <a
          href="javascript:void(0)"
          style="color: inherit;text-decoration: none;"
          :class="['mr-2  ', pages.lessons ? 'text-dark' : '']"
          @click="step('lesson')"
          >Add Lesson
          <span> <icon size="xs" class="mt-n1" name="arrow-right"/></span>
        </a>
        <a
          href="javascript:void(0)"
          style="color: inherit;text-decoration: none;"
          :class="['mr-2  ', pages.quiz ? 'text-dark' : '']"
          @click="step('quiz')"
        >
          Add Quiz</a
        >
      </div>

      <d-row no-gutters class="page-header py-4">
        <d-col sm="12" md="6" lg="6">
          <div v-show="pages.courseInfo">
            <d-input
              size="lg"
              class="mb-3"
              v-model="course.title"
              placeholder=" Title"
            />
            <multiselect
              size="lg"
              class="mb-3"
              v-model="course.category"
              placeholder="Search or add a Category"
              :multiple="true"
              :taggable="true"
              :close-on-select="true"
              :clear-on-select="false"
              :preserve-search="true"
              :preselect-first="false"
              :options="categories"
            >
            </multiselect>
            <multiselect
              size="lg"
              class="mb-3"
              v-model="course.tags"
              placeholder="Search for  course tag"
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
            <textarea
              style="min-height: 140px;"
              v-model="course.details"
              class="form-control mb-3"
            >
            </textarea>
            <textarea
              style="min-height: 140px;"
              v-model="course.requirements"
              class="form-control"
              placeholder="Requirements"
            >
            </textarea>
            <div class="text-center">
              <d-button
                class="btn btn-outline-light  mt-4  p-3 col-md-8  text-uppercase"
                style="background: #FFFFFF;border: 1px solid #E7E6E6;border-radius: 5px; color: black"
                @click="step('lesson')"
              >
                Next
              </d-button>
            </div>
          </div>
          <!--Add Lesson-->
          <div v-show="pages.lessons">
            <div class="p-4" v-for="(item, index) in lesson.fields">
              <div class="row">
                <h5 class="text-dark col-md-6 ">Lesson {{ index + 1 }}</h5>
                <label class="ml-auto col-md-4 ">
                  Order
                  <d-select class=" col-md-4" v-model="item.lesson_number">
                    <option
                      :selected="item.lesson_number === index + 1"
                      :value="i"
                      v-for="i in lesson.fields.length"
                      >{{ i }}</option
                    >
                  </d-select>
                </label>
              </div>
              <d-card>
                <div class="row m-2">
                  <d-input
                    class="col-md-8 col-12 col-lg-8 border-bottom m-2"
                    style="border: none;"
                    placeholder="Title"
                    v-model="item.title"
                  />

                  <d-select
                    class="col-md-3 col-12 col-lg-3 border-bottom m-2"
                    style="border: none;"
                    v-model="item.lesson_type"
                  >
                    <option selected :value="undefined">Select Type</option>
                    <option selected :value="'article'">Article</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                  </d-select>
                  <textarea
                    class="col-md-12 col-12 col-lg-12 border-bottom m-2"
                    style="border: none;"
                    placeholder="Details"
                    v-model="item.details"
                  >
                  </textarea>
                </div>
                <div class="m-2" v-if="item.lesson_type === 'article'">
                  <editor v-model="item.content" />
                </div>
                <div
                  class="m-2 text-center "
                  v-if="item.lesson_type === 'video'"
                >
                  <div v-html="item.content"></div>
                  <d-input-group seamless>
                    <d-input
                      class="border-bottom p-3"
                      style="border: none;"
                      v-model="item.content"
                      placeholder="Post an embedded video script of your video file "
                    />
                  </d-input-group>
                </div>
                <div class="m-2" v-if="item.lesson_type === 'audio'">
                  <div v-html="item.content"></div>
                  <d-input
                    v-model="item.content"
                    class="border-bottom p-3"
                    style="border: none;"
                    placeholder="Post an embedded video script of your audio file "
                  />
                </div>
                <div class="d-flex flex-row m-2">
                  <icon
                    size="lg"
                    class=" border-right "
                    @click="handleLessonDelete(index)"
                    name="bin"
                  />
                  <icon
                    size="lg"
                    class="ml-auto border-right"
                    @click="deleteValue(index)"
                    name="cancel"
                  />
                  <sla-button
                    type="filled"
                    class="btn"
                    v-if="!item.new_lesson"
                    @click="handleLessonUpdate(index)"
                    size="sm"
                    text="update"
                  />
                  <sla-button
                    type="outline"
                    class="btn "
                    v-if="item.new_lesson"
                    @click="handleLessonAddition(course._id, index)"
                    size="sm"
                    text="Save"
                  />
                  <div class="d-flex flex-row m-1 mt-n1"></div>
                </div>
              </d-card>
            </div>
            <div class="text-center">
              <d-button
                class="btn btn-outline-light  mt-4  p-3 col-md-8 "
                style="background: #FFFFFF;border: 1px solid #E7E6E6;border-radius: 5px; color: black"
                @click="addValue()"
              >
                <icon name="add" /> <span> Add Lesson</span>
              </d-button>
              <d-button
                class="btn btn-outline-light  mt-4  p-3 col-md-8  text-uppercase"
                style="background: #FFFFFF;border: 1px solid #E7E6E6;border-radius: 5px; color: black"
                @click="step('quiz')"
              >
                Next
              </d-button>
              <!--Add Quiz-->
            </div>
          </div>
          <div v-show="pages.quiz">
            <div class="p-4" v-for="(item, index) in quiz">
              <div class="row">
                <h5 class="text-dark col-md-7">
                  {{ questions_type.value }} {{ index + 1 }}
                </h5>
                <span class="col-md-5 mt-n3 fkoat-right">
                  <small class="text-sm"> Assign Points</small>
                  <d-select
                    class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                    style="border: none;"
                    v-model="item.reward"
                  >
                    <option v-for="i in 10" :value="i">{{ i }}</option>
                  </d-select>
                </span>
              </div>
              <d-card>
                <div class="row m-2">
                  <d-input
                    class="col-md-8 col-8 col-lg-8 border-bottom m-2"
                    style="border: none;"
                    v-model="item.question_text"
                    placeholder="Enter the quiz question"
                  />

                  <!--                <input type="hidden" v-model="item.has_options === ?"/>-->

                  <d-select
                    class="col-md-3 col-12 text-dark col-lg-3 border-bottom m-2"
                    style="border: none;"
                    v-model="questions_type.value"
                  >
                    <option selected value="quiz">Quiz</option>
                  </d-select>
                  <d-input
                    class="col-md-5 col-12 col-lg-5 border-bottom m-2"
                    style="border: none;"
                    v-model="item.answer"
                    placeholder="Enter the quiz answer"
                  />
                  <d-input
                    class="col-md-6 col-12 col-lg-6 border-bottom m-2"
                    style="border: none;"
                    v-model="item.correction"
                    placeholder="Enter the quiz correction text"
                  />
                </div>
                <div>
                  <div
                    class="m-2 d-flex flex-row"
                    v-for="(item2, index2) in quiz[index].options"
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
                    />

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
                      <input class="m-2" type="checkbox" />
                    </div>
                  </div>
                </div>
              </d-card>
              <!--          <Editor />-->
            </div>
            <div class="text-center">
              <d-button
                class="btn btn-outline-light  mt-4  p-3 col-md-8 "
                style="background: #FFFFFF;border: 1px solid #E7E6E6;border-radius: 5px; color: black"
                @click="addQuiz()"
              >
                <icon name="add" /> <span> Add Quiz</span>
              </d-button>
            </div>
            <d-button
              class="btn  mt-4  p-3 col-md-6 mx-auto d-flex  text-center "
              @click="handleQuizUpdate(course._id)"
            >
              <span class="text-center mx-auto">Save Quiz</span>
            </d-button>
          </div>
        </d-col>
        <d-col sm="12" md="6" lg="6" class="mt-5 mt-lg-0 mt-md-0">
          <vue-dropzone
            v-model="formData.cover_image"
            :options="dropzoneOptions"
            id="singledropZone"
            :useCustomSlot="true"
            @vdropzone-file-added="processImage"
            class="mx-auto"
            ref="courseImage"
            :style="
              'width: 300px; height: 300px;' +
                'backgroundImage:url(' +
                course.cover_image +
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
            <span class="text-black">Create Reminder </span
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
            <d-input
              class="col-md-3"
              type="time"
              v-model="time.reminder.hour"
            />
            <input type="hidden" v-model="reminderDate" />
          </d-input-group>

          <p class="text-center m-3  text-dark">
            Estimated Time to Complete Course
          </p>
          <d-input-group class="justify-content-center">
            <d-input
              class="col-md-8 "
              v-model="course.estimate"
              placeholder=" e.g 50 hours at 3 hours per week "
            />
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
            <p
              class="font-open-sans mt-3"
              style="color: #FF4133; cursor: pointer; font-size: 14px;"
              @click="modalStatus = true"
            >
              DELETE COURSE
            </p>
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
        <d-modal v-if="modalStatus" @close="modalStatus = false" size="lg">
          <div
            style="border-top: 4px solid #0087DB;"
            class="modal-header"
          ></div>
          <h6 class="text-center m-2 text-bold text-dark font-poppings">
            Are you sure you want to delete this resource?
          </h6>
          <d-modal-body>
            <div class="text-center">
              <sla-button
                class="m-2 col-md-12"
                type="filled"
                size="md"
                text="YES, DELETE"
                @click="handleDelete(course._id)"
              />
              <sla-button
                class="m-2 col-md-12"
                type="outline"
                size="md"
                :text="'CANCEL'"
                @click="modalStatus = false"
              />
            </div>
          </d-modal-body>
        </d-modal>
      </d-row>
    </d-container>
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import VueTrix from "vue-trix";
import axios from "axios";
import Multiselect from "vue-multiselect";
import store from "@/store/index";
import helper from "@/helpers/helper";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "course-create",
  data: () => {
    return {
      isLoaded: false,
      modalStatus: false,
      pages: {
        courseInfo: true,
        lessons: false,
        quiz: false
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
      error: {
        status: null,
        message: null
      },
      dropzoneOptions: {
        acceptedFiles: "image/*",
        // url:' url:  'localhost',',
        url: "http://localhost:8000/api/image",
        // acceptedFiles: "images/*",
        // thumbnailMethod:'contain',
        addRemoveLinks: true,
        maxFiles: 1,
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        maxFileSizeInMB: 2, // MB
        preventDuplicates: true,
        resizeWidth: 300,
        resizeHeight: 300
        // resize: this.resize,
      },
      formData: {
        title: null,
        details: null,
        requirements: null,
        category: [],
        tags: [],
        cover_image: undefined,
        estimate: null,
        publish: null,
        saved: false,
        remainder: null
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
      },
      lesson: {
        fields: []
      },
      quiz: [],
      questions_type: {
        value: "quiz"
      },
      course: {}
    };
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    Top: () => import("@/components/top"),
    vueDropzone: vue2Dropzone,
    VueTrix,
    Multiselect,
    Editor: () => import("@/components/add-new-post/Editor"),
    SlaButton: () => import("@/components/SlaButton")
  },

  methods: {
    ...mapActions("app/", [
      "deleteCourse",
      "deleteLesson",
      "updateLesson",
      "addLesson",
      "updateQuiz"
    ]),
    resize() {
      let resizeInfo = {
        srcX: 0,
        srcY: 0,
        trgX: 0,
        trgY: 0,
        srcWidth: file.width,
        srcHeight: file.height,
        trgWidth: 300,
        trgHeight: 300
      };

      return resizeInfo;
    },
    deleteValue(index) {
      this.lesson.fields.splice(index, 1);
    },
    addValue() {
      this.lesson.fields.push({ new_lesson: true });
      // this.$emit('input', this.fields);
    },
    addQuiz() {
      this.quiz.push({
        question_text: "",
        has_options: true,
        reward: "",
        answer: "",
        correction: "",
        options: []
      });
      console.log(this.quiz);

      // this.$emit('input', this.fields);
    },
    deleteQuiz(index) {
      this.quiz.splice(index, 1);
    },
    addOption(index) {
      this.quiz[index].options.push({ value: "" });
    },
    deleteOption(index, index2) {
      this.quiz[index].options.splice(index2, 1);
    },
    async addTag(newTag) {
      this.options.push(newTag);
      let token = store.state.auth.token;
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
    urlValidator(string) {
      try {
        new URL(string);
      } catch (_) {
        return false;
      }
      return true;
    },
    step(status) {
      switch (status) {
        case "course_info":
          this.pages = {
            courseInfo: true,
            lessons: false,
            quiz: false
          };
          break;
        case "lesson":
          this.pages = {
            courseInfo: false,
            lessons: true,
            quiz: false
          };
          break;
        case "quiz":
          this.pages = {
            courseInfo: false,
            lessons: false,
            quiz: true
          };
          break;
        default:
          break;
      }
    },
    replaceYoutubeEmbed(string, index) {
      console.log(this.lesson.fields[index].content);

      this.lesson.fields[index].content = string.replace("watch?v=", "embed/");
    },
    async handleAttachmentChanges(event) {
      // 1. get file object
      let file = event.attachment.file;
      let type = file.name.split(".").pop();
      let data_type = null;
      switch (type) {
        case "png":
          data_type = "data:image/png;base64,";
          break;
        case "jpg":
          data_type = "data:image/jpg;base64,";
          break;
        case "gif":
          data_type = "data:image/gif;base64,";
          break;
        case "pdf":
          data_type = "data:application/pdf;base64,";
          break;
      }
      await this.getBase64(file).then(data => {
        data = data_type + data;
        let res = axios
          .post(`${process.env.VUE_APP_API}/files/upload`, {
            file_to_upload: data
          })
          .then(res => {
            let attributes = {
              url: res.data.link,
              href: res.data.link
            };
            event.attachment.setAttributes(attributes);
          })
          .catch(ex => {
            console.log(ex);
          });
      });

      // 3. if upload success, set back the attachment's URL attribute
      // @param object data from remote server response data after upload.
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
          if (encoded.length % 4 > 0) {
            encoded += "=".repeat(4 - (encoded.length % 4));
          }
          resolve(encoded);
        };
        reader.onerror = error => reject(error);
      });
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
          (this.error.message =
            "You can not input a reminder date in the past!")
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
    async handleSubmit(type) {
      switch (type) {
        case "save":
          this.buttons.isLoading = true;
          this.buttons.text1 = "Loading.....";
          this.course.saved = true;
          break;
        case "publish":
          this.buttons.isLoading = true;
          this.buttons.text = "Loading.....";
          this.course.saved = false;
          break;
        default:
          break;
      }
      const self = this;
      if (self.formData.cover_image !== undefined) {
        self.course.cover_image = self.formData.cover_image;
      } else {
        delete self.course.cover_image;
      }

      if (self.course.tags.length > 0) {
        self.course.tags = self.course.tags.join();
      }
      if (self.course.category.length > 0) {
        self.course.category = self.course.category.join();
      }
      self.course.lessons = self.lesson.fields;
      self.course.schedule = self.formData.schedule;
      self.course.remainder = self.formData.remainder;
      const token = store.state.auth.token;
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/course/` +
            self.course._id.trim() +
            `/update`,
          self.course,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          self.formData = {};
          switch (type) {
            case "save":
              self.buttons.isLoading = false;
              self.buttons.text1 = "Save";
              self.quiz = [];
              self.$toast.success((self.error.message = res.data.message));
              setTimeout(function() {
                self.$router.push({ path: "/courses/all" });
              }, 2000);
              break;
            case "publish":
              self.buttons.isLoading = false;
              self.buttons.text = "Publish";
              self.quiz = [];
              self.$toast.success((self.error.message = res.data.message));
              // setTimeout(function() {
              //   self.$router.go(-1);
              // }, 2000);
              break;
            default:
              break;
          }
        })
        .catch(ex => {
          self.course.cover_image = self.formData.cover_image;
          self.course.tags = [];
          self.course.category = [];

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
    async handleDelete(id) {
      let res = await this.deleteCourse({
        id: id
      });
      if (res) {
        this.$toast.success("course deleted successfully");
        this.$router.go(-1);
      } else {
        this.$toast.error("something went wrong ");
      }
    },

    async handleLessonDelete(index) {
      let res = await this.deleteLesson({
        id: this.lesson.fields[index]._id.trim()
      });
      if (res) {
        this.lesson.fields.splice(index, 1);
        this.$toast.success("lesson deleted successfully");
      } else {
        this.$toast.error("something went wrong ");
      }
    },

    async handleLessonUpdate(index) {
      let res = await this.updateLesson({
        id: this.lesson.fields[index]._id,
        lesson: this.lesson.fields[index]
      });
      if (res) {
        this.$toast.success("lesson updated successfully");
      } else {
        this.$toast.error("something went wrong ");
      }
    },

    async handleLessonAddition(course_id, index) {
      let res = await this.addLesson({
        id: course_id,
        lesson: this.lesson.fields[index]
      });
      if (res) {
        this.$toast.success("lesson added successfully");
      } else {
        this.$toast.error("something went wrong ");
      }
    },

    async handleQuizUpdate(course_id) {
      let res = await this.updateQuiz({
        id: course_id,
        quizzes: this.quiz
      });
      if (res) {
        this.$toast.success("quiz added successfully");
      } else {
        this.$toast.error("something went wrong ");
      }
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

    processImage(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const self = this;
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        self.formData.cover_image = "data:image/jpg/png;base64," + encoded;
      };
    }
  },
  watch: {
    editorContent: {
      handler: "updateEditorContent"
    },
    scheduleDate: {
      handler: "watchSchedule"
    },
    reminderDate: {
      handler: "watchReminder"
    }
  },
  created() {
    const token = store.state.auth.token;
    const self = this;
    axios
      .get(
        `${process.env.VUE_APP_API}/course/` +
          self.$route.params.id +
          `/lessons/list`,
        {
          headers: {
            Authorization: `Bearer ${token} `
          }
        }
      )
      .then(res => {
        self.course = res.data.data.course;
        self.course.category = self.course.category.split(",");
        self.course.tags = self.course.tags.split(",");
        if (self.course.schedule !== null) {
          self.splitDateString(
            self.course.schedule,
            self.time.schedule,
            self.formData.schedule
          );
        }
        if (self.course.remainder !== null) {
          self.splitDateString(
            self.course.remainder,
            self.time.reminder,
            self.formData.remainder
          );
        }
        self.isLoaded = true;
        res.data.data.lessons.forEach(lesson => {
          // if (lesson.lesson_type == "article") {
          //   lesson.article_content = lesson.content;
          //   delete lesson.content;
          // }
        });
        self.lesson.fields = res.data.data.lessons;
        self.quiz =
          res.data.data.course.quizzes === null
            ? []
            : res.data.data.course.quizzes;
      })
      .catch(ex => {});

    axios
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
          this.time.reminder.days;
        this.formData.remainder = (
          this.time.reminder.final_date +
          " " +
          this.time.reminder.hour
        ).toString();
        this.formData.remainder = new Date(
          this.time.reminder.final_date
        ).toISOString();
        return this.time.reminder.final_date;
      }
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
.bg-primary::v-deep .multiselect {
  .multiselect__tags {
    background: #0087db;
  }
}
.btn-outline-primary {
  border: 1px solid #0087db;
  box-sizing: border-box;
  border-radius: 5px;
}
.text-danger {
  color: #fe4437;
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
.btn-primary {
  background: #0087db;
}
.btn-outline-light {
  background: #ffffff;
  border-color: #0087db;
  color: #0087db;
}
</style>
