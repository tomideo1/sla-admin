<template>
  <d-container fluid class="main-content-container px-4">
    <div class="d-flex flex-row">
      <h3 class="page-title text-dark m-4 ">Create Courses</h3>
    </div>
    <d-form @submit="handleUpload">
      <d-row no-gutters class="page-header py-4">
        <d-col sm="12" md="6" lg="6">
          <d-input
            size="lg"
            class="mb-3"
            v-model="formData.title"
            placeholder=" Title"
          />
          <d-input
            size="lg"
            class="mb-3"
            v-model="formData.description"
            placeholder="Description"
          />
          <d-input
            size="lg"
            class="mb-3"
            v-model="formData.category"
            placeholder="Category"
          />
          <d-textarea
            style="min-height: 140px;"
            v-model="formData.requirement"
            class="form-control"
            placeholder="Requirements"
          />
          <!--Add Lesson-->
          <div class="p-4" v-for="(item, index) in lesson.fields">
            <h5 class="text-dark">Lesson {{ index + 1 }}</h5>
            <d-card>
              <div class="row m-2">
                <d-input
                  class="col-md-8 col-8 col-lg-8 border-bottom m-2"
                  style="border: none;"
                  placeholder="Title"
                />
                <d-select
                  class="col-md-3 col-3 col-lg-3 border-bottom m-2"
                  style="border: none;"
                  v-model="item.type"
                >
                  <option selected value="undefined">Text</option>
                  <option selected value="video">Video</option>
                  <option selected value="audio">Audio</option>
                </d-select>
              </div>

              <!--              <div class="m-2" v-if="item.type === 'text'">-->
              <div class="m-2">
                <VueTrix
                  inputId="editor1"
                  v-model="editorContent"
                  placeholder="enter your content..."
                  @trix-attachment-add="handleAttachmentChanges"
                />

                <!--                <d-textarea style="min-height: 100px; border: none;" class="form-control  border-bottom " placeholder="Note in Details"/>-->
              </div>
              <div class="m-2 text-center " v-if="item.type === 'video'">
                <iframe
                  style="width: 100%;"
                  v-bind:src="item.value"
                  frameborder="0"
                  v-if="
                    item.value !== undefined &&
                      item.value !== '' &&
                      item.value !== null &&
                      urlValidator(item.value) === true
                  "
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <!--               -->
                <d-input-group seamless>
                  <d-input
                    class="border-bottom p-3"
                    style="border: none;"
                    v-model="item.value"
                    placeholder="Post a link to your video file "
                  />
                  <div class="input-group-text" style="border: none">
                    <i
                      class="fa fa-eye"
                      @click="replaceYoutubeEmbed(item.value, index)"
                    ></i>
                  </div>
                </d-input-group>
              </div>
              <div class="m-2" v-if="item.type === 'audio'">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/158721013&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
                <d-input
                  class="border-bottom p-3"
                  style="border: none;"
                  placeholder="Post a link to your audio file"
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
            <!--          <Editor />-->
          </div>
          <div class="text-center">
            <d-button
              class="btn btn-outline-light  mt-4  p-3 col-md-8 "
              style="background: #FFFFFF;border: 1px solid #E7E6E6;border-radius: 5px; color: black"
              @click="addValue()"
            >
              <icon name="add" /> <span> Add Lesson</span>
            </d-button>

            <!--Add Quiz-->
            <div class="p-4" v-for="(item, index) in quiz">
              <h5 class="text-dark">Quiz {{ index + 1 }}</h5>
              <d-card>
                <div class="row m-2">
                  <d-input
                    class="col-md-8 col-8 col-lg-8 border-bottom m-2"
                    style="border: none;"
                    v-model="item.title"
                    placeholder="Quiz"
                  />
                  <d-select
                    class="col-md-3 col-3 text-dark col-lg-3 border-bottom m-2"
                    style="border: none;"
                    v-model="questions_type.value"
                  >
                    <option selected value="quiz">Quiz</option>
                    <option selected value="survey">Survey</option>
                    <option selected value="poll">Poll</option>
                  </d-select>
                </div>
                <div>
                  <div
                    class="m-2 d-flex flex-row"
                    v-for="(item2, index2) in quiz[index].fields.option"
                  >
                    <icon
                      class="m-2 "
                      v-model="item2.option"
                      size="lg"
                      name="eclipse"
                    /><d-input
                      class="col-md-4 m-2"
                      v-model="item2.value"
                      placeholder="Option1"
                    />
                    <icon
                      size="lg"
                      class=" m-2"
                      @click="deleteOption(index, index2)"
                      name="bin"
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
            <d-button
              class="btn btn-outline-light  mt-4  p-3 col-md-8 "
              style="background: #FFFFFF;border: 1px solid #E7E6E6;border-radius: 5px; color: black"
              @click="addQuiz()"
            >
              <icon name="add" /> <span> Add Quiz</span>
            </d-button>
          </div>
        </d-col>
        <d-col sm="12" md="6" lg="6" class="mt-5 mt-lg-0 mt-md-0">
          <vue-dropzone
            :options="dropzoneOptions"
            v-model="formData.cover_image"
            :id="formData.cover_image"
            :useCustomSlot="true"
            class="mx-auto"
          >
            <h3 class="p-2 mt-5"><icon size="lg" name="camera" /></h3>
            <div class="subtitle p-2 mt-3">Click to add cover image</div>
            <div class="subtitle p-2 text-danger">
              Image must be 300x300px
            </div>
          </vue-dropzone>
          <p class="text-center mt-2 ">
            <span class="text-black">Create Reminder </span
            ><span>(DD/MM/YY)</span>
          </p>
          <d-input-group class="justify-content-center m-2 ">
            <d-select v-model="time.days" class="col-md-2 mr-2">
              <option :value="'0'">Day:</option>
              <option v-for="i in 31">{{ i }}</option>
            </d-select>
            <d-select class="col-md-2 mr-2" v-model="time.month">
              <option :value="'0'">Month:</option>

              <option v-for="i in 12">{{ i }}</option>
            </d-select>
            <d-select class="col-md-2 mr-2 " v-model="time.year">
              <option value="0">Year:</option>
              <option v-for="year in years" :value="year">{{ year }}</option>
            </d-select>
            <d-input class="col-md-1" v-model="time.hour" />
          </d-input-group>
          <p class="text-center mt-2  text-dark">
            Estimated Time to Complete Course
          </p>
          <d-input-group class="justify-content-center">
            <d-input class="col-md-8 " v-model="formData.estimatedTime" />
          </d-input-group>
          <p class="text-center mt-2 ">
            <span class="text-black">Launch Course </span
            ><span>(DD/MM/YY)</span>
          </p>
          <d-input-group class="justify-content-center m-2 ">
            <d-select v-model="time.days" class="col-md-2 mr-2">
              <option :value="'0'">Day:</option>
              <option v-for="i in 31">{{ i }}</option>
            </d-select>
            <d-select class="col-md-2 mr-2" v-model="time.month">
              <option :value="'0'">Month:</option>

              <option v-for="i in 12">{{ i }}</option>
            </d-select>
            <d-select class="col-md-2 mr-2 " v-model="time.year">
              <option value="0">Year:</option>
              <option v-for="year in years" :value="year">{{ year }}</option>
            </d-select>
            <d-input class="col-md-1" v-model="time.hour" />
          </d-input-group>
          <div class="text-center">
            <d-button
              class=" btn-primary btn-outline-primary p-3 mt-4   col-md-8 "
            >
              SCHEDULE
            </d-button>
            <d-button
              class=" btn-primary btn-outline-primary p-3 mt-4  col-md-6 "
            >
              Save
            </d-button>
            <br />
            <d-button class=" btn-primary  p-3 mt-4  col-md-8 ">
              PUBLISH
            </d-button>
          </div>
        </d-col>
      </d-row>
    </d-form>
  </d-container>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import VueTrix from "vue-trix";
export default {
  name: "course-create",
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 300, // px
        thumbnailHeight: 300,
        addRemoveLinks: true,
        maxFilesize: 2, // MB
        maxFiles: 1
      },
      editorContent: "<h1>Editor contents</h1>",

      formData: {
        title: null,
        description: null,
        category: null,
        requirement: null,
        cover_image: "",
        estimatedTime: null
      },
      time: {
        days: undefined,
        month: undefined,
        year: undefined,
        hour: undefined
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
    Editor: () => import("@/components/add-new-post/Editor"),
    Icon: () => import("@/components/SlaIcon"),
    vueDropzone: vue2Dropzone,
    VueTrix
  },

  methods: {
    handleUpload: e => {
      e.preventDefault();
    },
    deleteValue: function(index) {
      this.lesson.fields.splice(index, 1);
    },
    addValue: function() {
      this.lesson.fields.push({});
      // this.$emit('input', this.fields);
    },
    addQuiz: function() {
      this.quiz.push({ fields: { option: [] } });
      console.log(this.quiz);

      // this.$emit('input', this.fields);
    },
    deleteQuiz: function(index) {
      this.quiz.splice(index, 1);
    },
    addOption: function(index) {
      this.quiz[index].fields.option.push({ option: "", value: "" });
    },
    deleteOption: function(index, index2) {
      this.quiz[index].fields.option.splice(index2, 1);
    },
    urlValidator: string => {
      try {
        new URL(string);
      } catch (_) {
        return false;
      }
      return true;
    },

    replaceYoutubeEmbed(string, index) {
      console.log(this.lesson.fields[index].value);

      this.lesson.fields[index].value = string.replace("watch?v=", "embed/");
    },
    updateEditorContent(value) {
      console.log(value);
      // Update new content into the database via state mutations.
    },

    handleAttachmentChanges(event) {
      const remoteHost = "your remote host";
      // 1. get file object
      let file = event.attachment.file;

      console.log(file);
      // 2. upload file to remote server with FormData
      // ...

      // 3. if upload success, set back the attachment's URL attribute
      // @param object data from remote server response data after upload.
      let attributes = {
        url: remoteHost + data.path,
        href: remoteHost + data.path
      };
      event.attachment.setAttributes(attributes);
    }
  },
  watch: {
    editorContent: {
      handler: "updateEditorContent"
    }
  },
  computed: {
    years: () => {
      const year = new Date().getFullYear();
      return Array.from({ length: year + 20 }, (value, index) => 2001 + index);
    }
  }
};
</script>
<style scoped lang="scss">
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
  background: #03a9f4;
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
  background: #03a9f4;
}
.btn-outline-primary {
  background: #ffffff;
  border-color: #03a9f4;
  color: #03a9f4;
}
</style>
