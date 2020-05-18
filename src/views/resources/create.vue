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
            <label class="text-grey"> Question</label>
            <d-input
              size="lg"
              class="mb-3"
              placeholder=" Question"
              v-model="formData.question"
            />
          </d-col>
          <d-col md="12" class="form-group">
            <label class="text-grey"> Answer</label>
            <d-textarea
              size="lg"
              class="mb-3"
              placeholder="Answer"
              v-model="formData.answer"
              rows="8"
            />
          </d-col>
          <d-col md="12" class="form-group">
            <label class="text-center"> Category</label>
            <multiselect
              size="lg"
              class="mb-3"
              v-model="formData.list_category"
              placeholder="Category"
              :multiple="true"
              :taggable="true"
              :close-on-select="true"
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
              :close-on-select="true"
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
          </d-col>
        </d-form-row>
      </d-col>
    </d-row>
    <footer class="border-top ">
      <sla-button
        class="btn  m-3  text-uppercase float-right"
        text="Publish"
        type="filled"
        size="sm"
      />
      <sla-button
        class="btn  m-3  text-uppercase float-right"
        text="save"
        type="outline"
        size="sm"
      />
      <sla-button
        class="btn  m-3  text-uppercase float-right"
        text="Schedule"
        type="outline"
        size="sm"
      />
    </footer>
  </d-container>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import Multiselect from "vue-multiselect";
import axios from "axios";
import store from "@/store/index";

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
        text: "Create Group"
      },
      formData: {
        question: null,
        answer: "",
        list_category: [],
        list_tags: [],
        recipients: "everyone"
      }
    };
  },
  methods: {
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
  components: {
    Icon: () => import("@/components/SlaIcon"),
    vueDropzone: vue2Dropzone,
    Multiselect,
    Editor: () => import("@/components/add-new-post/Editor"),
    SlaButton: () => import("@/components/SlaButton")
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
      let l = this.listData.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.listData.slice(start, end);
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped></style>
