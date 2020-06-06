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
    <nav-menu :navs="navigation" />

    <d-row no-gutters class="container-fluid">
      <input
        type="file"
        ref="file"
        style="display: none"
        v-on:change="handleUpload"
      />
      <d-button
        class="  col-md-2 p-3 mb-3"
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
      <masonry
        v-if="assets.length > 0"
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
      <div v-else class="col">
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any Assets</span
        >
      </div>
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
    Icon: () => import("@/components/SlaIcon"),
    NavMenu: () => import("@/components/NavMenu")
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
      image: null,
      navigation: {
        title: [{ name: "View All Assets", path: "/assets" }],
        actions: [
          { name: "images", path: "/assets" },
          { name: "Gifs", path: "/assets" }
        ]
      }
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
