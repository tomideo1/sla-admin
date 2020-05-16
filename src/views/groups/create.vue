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
        <d-form-row>
          <d-col md="12" class="form-group">
            <label for="feFirstName"> Ttile</label>
            <d-input
              size="lg"
              class="mb-3"
              placeholder="Group Title"
              v-model="formData.title"
            />
          </d-col>
          <d-col md="12" class="form-group">
            <label for="feFirstName"> Description</label>
            <d-input
              size="lg"
              class="mb-3"
              placeholder="Group Description"
              v-model="formData.description"
            />
          </d-col>
          <d-col md="12" class="form-group">
            <label for="feFirstName"> Category</label>
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
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :preselect-first="false"
              :options="categories"
            >
            </multiselect>
          </d-col>
          <sla-button
            class="btn col-md-5 m-1 text-uppercase font-weight-bold mb-2"
            size="md"
            type="outline"
            :text="'Invite Participant'"
            @click="showParticipant = true"
          />
          <sla-button
            size="md"
            type="filled"
            text="Assign Coach"
            class="btn  col-md-5 m-1  "
            @click="showCoach = true"
          />
        </d-form-row>
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

    <d-modal
      v-if="showParticipant"
      size="sm"
      @close="showParticipant = false"
      :size="modalSize"
    >
      <d-modal-header class="text-center" style="border: none!important;">
        <d-modal-title
          class="text-dark text-bold font-poppings w-100"
          style="margin: 0 30% 0 30% "
          >Invite Participants</d-modal-title
        >
      </d-modal-header>
      <d-modal-body>
        <d-row>
          <div
            v-for="p in paginatedData"
            md="6"
            sm="6"
            class="col-lg-6 col-md-6 col-6 p-2"
          >
            <d-row>
              <d-col md="8">
                <div class="d-flex flex-row flex-grow-1">
                  <sla-avatar
                    v-if="p.image === null"
                    size="lg"
                    :user="{ name: p.first_name }"
                  />
                  <sla-avatar v-else size="lg" :user="{ image: p.image }" />
                  <span class="m-3">
                    {{ p.first_name + " " + p.last_name }}
                  </span>
                </div>
              </d-col>
              <d-col md="4">
                <sla-button
                  class="btn  "
                  size="sm "
                  text="INVITE"
                  type="filled"
                  @click="formData.users.push(p._id)"
                  v-if="!formData.users.includes(p._id)"
                >
                </sla-button>
                <sla-button
                  class="btn "
                  size="sm "
                  style="background: #000000!important;"
                  text="UNINVITE"
                  type="filled"
                  @click="
                    formData.users.splice(formData.users.indexOf(p._id), 1)
                  "
                  v-if="formData.users.includes(p._id)"
                >
                </sla-button>
              </d-col>
            </d-row>
          </div>
        </d-row>
      </d-modal-body>
      <d-modal-footer style="border: none!important;">
        <div class="d-flex flex-column flex-grow-1">
          <div class="mx-auto m-3">
            {{ pageNumber + 1 }} of {{ pageCount }}
            <span
              ><icon
                size="sm"
                @click="prevPage"
                style="transform: rotate(180deg);"
                name="arrow-right"/>
              &nbsp; <icon size="sm" name="arrow-right" @click="nextPage"
            /></span>
          </div>
          <button
            @click="Users.filter(addAll)"
            v-if="Users.length !== formData.users.length"
            class="btn p-3 m-1 mx-auto col-md-5  btn-primary "
          >
            INVITE ALL
          </button>
          <button
            @click="Users.filter(removeAll)"
            v-else
            class="btn p-3 m-1 mx-auto col-md-5  btn-primary "
            style="background: #000000!important;"
          >
            UNINVITE ALL
          </button>
        </div>
      </d-modal-footer>
    </d-modal>
    <d-modal v-if="showCoach" size="sm" @close="showCoach = false" :size="'md'">
      <d-modal-header>
        <d-modal-title>Assign Coach</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <d-row class="text-center">
          <div v-for="i in 5" class="col-lg-12 col-md-12 col-12 p-2 ">
            <d-row class="col-md-12 col-lg-12 col-12 mx-auto">
              <d-col>
                <img
                  class="avatar   "
                  src="@/assets/images/user-profile/leader.png"
                />
                Jane Ogunsola
              </d-col>
              <d-col md="6">
                <d-btn class="btn btn-primary">
                  Assign
                </d-btn>
              </d-col>
            </d-row>
          </div>
        </d-row>
      </d-modal-body>
      <d-modal-footer>
        <button class="btn p-3 m-1 mx-auto col-md-5  btn-primary ">
          INVITE ALL
        </button>
      </d-modal-footer>
    </d-modal>
  </d-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import VueTrix from "vue-trix";
import axios from "axios";
import Multiselect from "vue-multiselect";
import store from "@/store/index";

import { mapActions, mapGetters } from "vuex";

const token = store.state.auth.token;

export default {
  name: "create",
  data() {
    return {
      showParticipant: false,
      showCoach: false,
      pageNumber: 0,
      size: 10,
      modalSize: "lg",
      error: {
        status: null,
        message: null
      },
      buttons: {
        published: false,
        isLoading: false,
        text: "Create Group"
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
        description: null,
        list_category: [],
        list_tags: [],
        cover_image: "",
        users: []
      }
    };
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    vueDropzone: vue2Dropzone,
    Multiselect,
    Editor: () => import("@/components/add-new-post/Editor"),
    SlaButton: () => import("@/components/SlaButton"),
    SlaAvatar: () => import("@/components/avatar")
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
    },
    pageCount() {
      let l = this.Users.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.Users.slice(start, end);
    },
    ...mapGetters({
      Users: "app/getUsers"
      // maps courses to current computed resource
    })
  },
  methods: {
    async handleSubmit() {
      this.buttons.isLoading = true;
      this.formData.tags = this.formData.list_tags.join();
      this.formData.category = this.formData.list_category.join();
      this.buttons.text = "Loading...";
      const self = this;
      let res = await axios
        .post(`${process.env.VUE_APP_API}/group/create`, this.formData, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          self.buttons.isLoading = false;
          self.buttons.text = "Create Group";
          self.$toast.success(
            (self.error.message = res.data
              ? res.data.message
              : "An error occured")
          );
          setTimeout(function() {
            self.$router.push({ path: "/groups/all" });
          }, 2000);

          self.formData = {};
        })
        .catch(ex => {
          self.buttons.isLoading = false;
          self.buttons.text = "Create Group";
          self.$toast.error(
            (self.error.message = ex.response.data
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
    },
    nextPage() {
      if (!this.pageNumber < 1) {
        this.pageNumber++;
      }
    },
    prevPage() {
      if (this.pageNumber !== 0) {
        this.pageNumber--;
      }
    },
    ...mapActions("app/", ["getAllUsers"]),
    addAll(user) {
      if (!this.formData.users.includes(user._id)) {
        return this.formData.users.push(user._id);
      }
    },
    removeAll(user) {
      if (this.formData.users.includes(user._id)) {
        return this.formData.users.splice(
          this.formData.users.indexOf(user._id),
          1
        );
      }
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
    this.getAllUsers();
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
.btn-primary {
  background-color: #0087db !important;
}
.dropzone {
  width: 330px;
  height: 330px;
}
.avatar {
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
}
</style>
