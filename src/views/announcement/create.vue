<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title text-dark">Create Announcement</h3>
      </d-col>
    </d-row>
    <d-row no-gutters class="py-4">
      <d-form class="col-md-6">
        <d-input size="lg" class="mb-3" placeholder=" Title" />
        <VueTrix
          inputId="editor1"
          v-model="editorContent"
          placeholder="enter your content..."
        />
        <div class="form-group">
          <d-select :value="null" class="col-md-3">
            <option :value="null">To Everyone</option>
            <option>Participant</option>
            <option>Admins</option>
            <option>Coaches</option>
          </d-select>
        </div>
        <d-button class=" btn-outline-primary col-md-5 m-2" outline
          >SCHEDULE</d-button
        >
        <d-button class="btn-primary col-md-5 m-2">PUBLISH</d-button>
      </d-form>
    </d-row>
  </d-container>
</template>

<script>
import VueTrix from "vue-trix";
import vue2Dropzone from "vue2-dropzone";
export default {
  name: "create",
  data() {
    return {
      editorContent: "<h1>Editor contents</h1>"
    };
  },
  components: {
    Editor: () => import("@/components/add-new-post/Editor"),
    Icon: () => import("@/components/SlaIcon"),
    vueDropzone: vue2Dropzone,
    VueTrix
  }
};
</script>

<style scoped>
.btn-primary {
  background-color: #0087db !important;
}
.btn-outline-primary {
  border-color: #0087db !important;
}
</style>
