<template>
  <d-container fluid class="main-content-container px-4">
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="4000"
      :closeable="false"
    ></Toasts>
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
        <span> <icon size="xs" class="mt-n1" name="arrow-right"/></span
      ></a>
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
            v-model="formData.title"
            placeholder=" Title"
          />
          <multiselect
            size="lg"
            class="mb-3"
            v-model="formData.category_lists"
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
            v-model="formData.tag_lists"
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
          <editor
            v-model="formData.details"
            class=" mb-3"
            placeholder="Description"
          />
          <d-textarea
            style="min-height: 140px;"
            v-model="formData.requirements"
            class="form-control"
            placeholder="Requirements"
          />
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
                <div class="col-md-12 col-12 col-lg-12 border-bottom m-2">
                  <p class="m-2 text-bold ">Lesson Details</p>
                  <editor v-model="item.details" />
                </div>
              </div>
              <p class="m-2 text-bold ">Lesson Content</p>
              <div class="m-2" v-show="item.lesson_type === 'article'">
                <editor v-model="item.content" />

                <!--                <d-textarea style="min-height: 100px; border: none;" class="form-control
                border-bottom " placeholder="Note in Details"/>-->
              </div>
              <div class="m-2 text-center " v-if="item.lesson_type === 'video'">
                <!--          <iframe
                  style="width: 100%;"
                  v-bind:src="item.value"
                  frameborder="0"
                  v-if="
                                    item.value !== undefined &&
                                      item.value !== '' &&
                                      item.value !== null &&
                                      urlValidator(item.value) === true
                                  "
                  allow="accelerometer; autoplay; encrypted-media; gyroscope;picture-in-picture"
                  allowfullscreen
                ></iframe>-->

                <div v-html="item.content"></div>
                <!--               -->
                <d-input-group seamless>
                  <d-input
                    class="border-bottom p-3"
                    style="border: none;"
                    v-model="item.content"
                    placeholder="Post an embedded video script of your video file "
                  />
                  <!--                    <div class="input-group-text" style="border: none">-->
                  <!--                      <i-->
                  <!--                        class="fa fa-eye"-->
                  <!--                        @click="replaceYoutubeEmbed(item.value, index)"-->
                  <!--                      ></i>-->
                  <!--                    </div>-->
                </d-input-group>
              </div>
              <div class="m-2" v-if="item.lesson_type === 'audio'">
                <div v-html="item.content"></div>
                <d-input
                  v-model="item.content"
                  class="border-bottom p-3"
                  style="border: none;"
                  placeholder="Post an embedded audio script of your audio file "
                />
              </div>
              <div class="d-flex flex-row m-2">
                <icon
                  size="lg"
                  class="ml-auto border-right"
                  @click="deleteValue(index)"
                  name="bin"
                />
                <div class="d-flex flex-row m-1 mt-n1"></div>
              </div>
            </d-card>
          </div>
          <div class="text-center">
            <d-button
              class="btn btn-outline-light  mt-4  p-3 col-md-8 "
              style="background: #FFFFFF;border: 1px solid #E7E6E6;border-radius: 5px; color: black"
              @click="addValue(lesson.fields.length)"
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
        </div>
      </d-col>
      <d-col sm="12" md="6" lg="6" class="mt-5 mt-lg-0 mt-md-0">
        <vue-dropzone
          v-model="formData.cover_image"
          :options="dropzoneOptions"
          id="dropZone"
          :useCustomSlot="true"
          class="mx-auto"
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
          <d-input class="col-md-3" type="time" v-model="time.reminder.hour" />
          <input type="hidden" v-model="reminderDate" />
        </d-input-group>

        <p class="text-center m-3  text-dark">
          Estimated Time to Complete Course
        </p>
        <d-input-group class="justify-content-center">
          <d-input
            class="col-md-8 "
            v-model="formData.estimate"
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
export default {
  name: "course-create",
  data: () => {
    return {
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
        details: null,
        requirements: null,
        category: "",
        tags: "",
        tag_lists: [],
        category_lists: [],
        cover_image: "",
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
      }
    };
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    vueDropzone: vue2Dropzone,
    VueTrix,
    Multiselect,
    Editor: () => import("@/components/add-new-post/Editor"),
    SlaButton: () => import("@/components/SlaButton")
  },

  methods: {
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
    addValue(index) {
      console.log(index);
      this.lesson.fields.push({ lesson_number: index + 1 });
      // this.$emit('input', this.fields);
    },
    addQuiz() {
      this.quiz.push({
        question_text: "",
        has_options: true,
        reward: 1,
        answer: "",
        correction: "",
        options: []
      });

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
    updateEditorContent(value) {
      // Update new content into the database via state mutations.
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
          this.formData.saved = true;
          break;
        case "publish":
          this.buttons.isLoading = true;
          this.buttons.text = "Loading.....";
          this.formData.saved = false;
          break;
        default:
          break;
      }
      const self = this;
      if (self.formData.tag_lists.length > 0) {
        self.formData.tags = self.formData.tag_lists.join();
      }
      self.formData.category = self.formData.category_lists.join();
      self.formData.lessons = self.lesson.fields;
      self.formData.quizzes = self.quiz;
      const token = store.state.auth.token;
      let res = await axios
        .post(`${process.env.VUE_APP_API}/course/create`, self.formData, {
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
                self.$router.push({ path: "/courses/all" });
              }, 2000);
              break;
            case "publish":
              self.buttons.isLoading = false;
              self.buttons.text = "Publish";
              self.quiz = [];
              self.$toast.success((self.error.message = res.data.message));
              setTimeout(function() {
                self.$router.push({ path: "/courses/all" });
              }, 2000);
              break;
            default:
              break;
          }
        })
        .catch(ex => {
          self.formData.tag_lists = [];
          self.formData.category_lists = [];

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
  async mounted() {
    const token = store.state.auth.token;
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
    const self = this;
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
