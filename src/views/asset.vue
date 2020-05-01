<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="4000"
      :closeable="false"
    ></Toasts>
    <d-container fluid class="mt-5 mb-3 d-none d-md-block d-lg-block">
      <div class=" d-lg-flex d-md-flex flex-row  flex-grow-1 ">
        <div class="border-right  ">
          <h5 class="text-black mr-lg-5 mr-1 " v-if="$route.path === '/assets'">
            Assets Library
          </h5>
        </div>
        <div class=" ml-3 mr-4">
          <button
            @click="$router.push('/courses/create')"
            :class="
              $route.path === '/assets'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
            style="border-radius: 10px;"
          >
            GIFs
          </button>
        </div>
        <div class="mr-1">
          <button
            :class="
              $route.path === '/assets/gifs'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
            style="border-radius: 10px;"
          >
            Images
          </button>
        </div>
      </div>
      <input
        type="file"
        ref="file"
        style="display: none"
        v-on:change="handleUpload"
      />
      <d-button
        class=" mt-5 col-md-2 p-3"
        style="
                background: #DAAA55;
                border-radius: 5px;
                border: none;
                "
        :disabled="buttons.isLoading"
        @click="$refs.file.click()"
      >
        {{ buttons.text }}</d-button
      >
    </d-container>
    <d-row no-gutters class="container-fluid">
      <masonry
        :cols="{ default: 4, 1000: 3, 700: 2, 400: 1 }"
        :gutter="{ default: '20px', 700: '5px' }"
        style="max-width: 100%;"
      >
        <div v-for="(asset, idx) in assets" :key="idx">
          <img
            :src="asset.link"
            style="width: 100%; margin:5px auto!important;"
          />
          <br />
        </div>
      </masonry>
    </d-row>
  </d-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import carousel from "vue-owl-carousel";
export default {
  name: "Dashboard",
  components: {
    Icon: () => import("@/components/SlaIcon")
  },
  data() {
    return {
      buttons: {
        isLoading: false,
        text: "UPLOAD"
      },
      error: {
        status: null,
        message: null
      },
      image: null
    };
  },
  computed: {
    ...mapGetters({
      assets: "app/getAssets"
    })
  },
  methods: {
    ...mapActions("app/", ["getAllAssets"]),
    async handleUpload(event) {
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const self = this;
      reader.onload = async () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        self.image = "data:image/jpg/gif/png;base64," + encoded;
        this.buttons.isLoading = true;
        this.buttons.text = "Loading....";
        let res = await axios
          .post(`${process.env.VUE_APP_API}/files/upload`, {
            file_to_upload: self.image
          })
          .then(res => {
            self.buttons.isLoading = false;
            self.buttons.text = "UPLOAD";
            self.$toast.success((this.error.message = res.data.message));
            self.assets;
          })
          .catch(ex => {
            self.buttons.isLoading = false;
            self.buttons.text = "UPLOAD";
            self.$toast.error(
              (self.error.message = ex.response.data
                ? ex.response.data.message.message
                : "An error occured")
            );
          });
      };
    }
  },
  async mounted() {
    this.getAllAssets();
  }
};
</script>

<style lang="scss"></style>
