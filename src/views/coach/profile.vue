<template>
  <div>
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="4000"
      :closeable="false"
    ></Toasts>
    <d-container fluid class="main-content-container px-4 py-4 mt-4">
      <h5 class="text-black font-poppings font-weight-bold">Profile</h5>
      <d-row>
        <div class="col-md-2 col-lg-2 col-12">
          <d-row>
            <div class="mb-3 col-md-12 col-lg-12 col-12  ">
              <div class="d-flex  justify-content-center text-align-center">
                <sla-avatar
                  class="avatar"
                  v-if="user.image === null"
                  size="xl"
                  @click="$refs['upload-image'].click()"
                  :user="{ name: user.first_name }"
                />
                <sla-avatar
                  class="avatar"
                  v-else
                  size="xl"
                  @click="$refs['upload-image'].click()"
                  :user="{ image: user.image }"
                />
                <label class="edit-user-details__avatar__change">
                  <input
                    @change="uploadImage($event)"
                    ref="upload-image"
                    type="file"
                  />
                </label>
              </div>
            </div>
          </d-row>
        </div>
        <div class="col-md-6 col-lg-6 col-12">
          <d-form-row>
            <!-- First Name -->
            <d-col md="12" class="form-group">
              <label class="text-grey"> First Name</label>
              <d-form-input type="text" v-model="user.first_name" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Last Name</label>
              <d-form-input type="text" v-model="user.last_name" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Business Name</label>
              <d-form-input type="text" v-model="user.business_name" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Business Development</label>
              <d-form-input type="text" v-model="user.business_development" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Industry</label>
              <d-form-input type="text" v-model="user.industry" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Location</label>
              <d-form-input type="text" v-model="user.location" />
            </d-col>

            <d-col md="12" class="form-group">
              <label class="text-grey"> Email Address</label>
              <d-form-input type="text" v-model="user.email" />
            </d-col>
          </d-form-row>
          <div class="mx-auto">
            <sla-button
              class="font-open-sans m-lg-3 m-md-3 mt-3  col-md-12 col-12 col-lg-12"
              size="md"
              type="filled"
              :text="button.text"
              :disabled="button.isLoading"
              @click="handleSubmit"
            />
          </div>
        </div>
      </d-row>
    </d-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
const token = store.state.auth.token;
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "single",
  data() {
    return {
      isLoaded: false,
      error: {
        status: null,
        message: null
      },
      button: {
        text: "UPDATE PROFILE",
        isLoading: false
      }
    };
  },
  components: {
    top: () => import("@/components/top"),
    avatar: () => import("@/components/avatar.vue"),
    SlaButton: () => import("@/components/SlaButton.vue"),
    SlaAvatar: () => import("@/components/avatar.vue")
  },
  methods: {
    ...mapActions("auth/", ["uploadProfileImage"]),
    async handleSubmit() {
      this.button.text = "Loading.....";
      this.button.isLoading = true;
      const self = this;
      let res = await axios
        .post(`${process.env.VUE_APP_API}/admin/update`, self.user, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          self.button.text = "UPDATE PROFILE";
          self.button.isLoading = false;
          self.$toast.success(
            (self.error.message = res.data
              ? res.data.message
              : "An error occured")
          );
        })
        .catch(ex => {
          self.button.text = "UPDATE PROFILE";
          self.button.isLoading = false;
          self.$toast.error(
            (self.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
        });
    },
    uploadImage(e) {
      var FR = new FileReader();
      var that = this;
      FR.onloadend = function() {
        that.uploadProfileImage({
          image: FR.result
        });
      };
      FR.readAsDataURL(e.target.files[0]);

      this.user.image = URL.createObjectURL(e.target.files[0]);
    }
  },
  computed: {
    ...mapState("auth/", ["user"])
  }
};
</script>

<style scoped lang="scss">
.edit-user-details {
  .card-header {
    overflow: hidden;
  }
  .card-body {
    z-index: 1;
  }
  &__avatar {
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    // max-width: $eu-avatar-max-width;
    img {
      width: 100%;
    }
    &__change {
      margin: 0;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      position: absolute;
      text-align: center;
      border-radius: 50%;
      // font-size: $eu-avatar-change-font-size;
      // background: $eu-avatar-change-background;
      //transition: $eu-avatar-change-transition;
      .icon-image {
        //height: 50px;
        width: 50px;
        position: center;
        margin-top: 35%;
      }
    }
    &:hover {
      .edit-user-details__avatar__change {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
}
</style>
