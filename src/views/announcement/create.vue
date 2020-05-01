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
        <d-form>
          <d-input
            size="lg"
            class="mb-3"
            placeholder="Announcement Title"
            v-model="formData.title"
          />
          <editor v-model="formData.rich_details" />
          <multiselect
            size="lg"
            class="mb-3"
            v-model="formData.list_category"
            placeholder="Category"
            :multiple="true"
            :taggable="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :preselect-first="false"
            :options="categories"
            @tag="addTag"
          >
          </multiselect>
          <multiselect
            size="lg"
            class="mb-3"
            v-model="formData.list_tags"
            placeholder="Tags"
            :multiple="true"
            :taggable="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :preselect-first="false"
            :options="categories"
            @tag="addTag"
          >
          </multiselect>
          <p class="font-poppins text-bold" style="font-weight: bold">
            Recipients
          </p>
          <div class="form-group mt-3 mb-3 ">
            <d-select v-model="formData.recipients" class="col-md-3">
              <option selected value="everyone">To Everyone</option>
              <option value="participant">Participant</option>
              <option value="admin">Admins</option>
              <option value="coaches">Coaches</option>
            </d-select>
          </div>
        </d-form>
      </d-col>

      <d-col sm="12" md="6" lg="6" class="mt-5 mt-lg-0 mt-md-0">
        <vue-dropzone
          v-model="formData.cover_image"
          :options="dropzoneOptions"
          id="dropZone"
          :useCustomSlot="true"
          class="mx-auto"
          ref="courseImage"
          style="width: 300px; height: 300px"
        >
          <h3 class="p-2 mt-5"><icon size="lg" name="camera" /></h3>
          <div class="subtitle p-2 mt-3">Click to add cover image</div>
          <div class="subtitle p-2 text-danger">
            Image must be 300x300px
          </div>
        </vue-dropzone>

        <div class="text-center">
          <br />
          <button
            @click="handleSubmit"
            class=" btn btn-primary  p-3 mt-4  col-md-8 "
            :disabled="buttons.isLoading"
          >
            {{ buttons.text }}
          </button>
        </div>
      </d-col>
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
      buttons: {
        published: false,
        isLoading: false,
        text: "Publish"
      },
      options: [],
      dropzoneOptions: {
        // url:'localhost:8080',
        url: `${process.env.VUE_APP_API}`,
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
        rich_details: "",
        normal_details: "",
        list_category: [],
        list_tags: [],
        recipients: "everyone",
        cover_image: ""
      }
    };
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    vueDropzone: vue2Dropzone,
    Multiselect,
    Editor: () => import("@/components/add-new-post/Editor")
  },
  computed: {
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
    }
  },
  methods: {
    async handleSubmit() {
      this.buttons.isLoading = true;
      this.formData.tags = this.formData.list_tags.join();
      this.formData.category = this.formData.list_category.join();
      this.buttons.text = "Loading...";
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/annoucement/admin/create`,
          this.formData,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          this.buttons.isLoading = false;
          this.buttons.text = "Publish";
          this.$toast.success(
            (this.error.message = res.data
              ? res.data.message
              : "An error occured")
          );
          setTimeout(function() {
            this.$route.push({ path: "announcement/all" });
          }, 2000);

          this.formData = {};
        })
        .catch(ex => {
          this.buttons.isLoading = false;
          this.buttons.text = "Publish";
          this.$toast.error(
            (this.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
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
          this.formData.list_category.push(newTag);
          this.formData.list_rags.push(newTag);
        })
        .catch(ex => {
          this.$toast.error(
            (this.error.message = ex.response.data
              ? ex.response.data.message.message
              : "An error occured")
          );
        });
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
.dropzone {
  width: 330px;
  height: 330px;
}
</style>
