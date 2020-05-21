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
              <div class="">
                <sla-avatar
                  class="avatar"
                  v-if="AdminUser.image === null"
                  size="xl"
                  :user="{ name: AdminUser.first_name }"
                />
                <sla-avatar
                  class="avatar"
                  v-else
                  size="xl"
                  :user="{ image: AdminUser.image }"
                />
              </div>
            </div>
          </d-row>
        </div>
        <div class="col-md-6 col-lg-6 col-12">
          <d-form-row>
            <!-- First Name -->
            <d-col md="12" class="form-group">
              <label class="text-grey"> First Name</label>
              <d-form-input type="text" v-model="AdminUser.first_name" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Last Name</label>
              <d-form-input type="text" v-model="AdminUser.last_name" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Phone Number</label>
              <d-form-input type="text" v-model="AdminUser.phone_number" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Email</label>
              <d-form-input type="text" v-model="AdminUser.email" />
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
export default {
  name: "single",
  data() {
    return {
      AdminUser: null,
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
    async handleSubmit() {
      this.button.text = "Loading.....";
      this.button.isLoading = true;
      const self = this;
      let res = await axios
        .post(`${process.env.VUE_APP_API}/admin/update`, self.AdminUser, {
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
    }
  },
  mounted() {
    this.AdminUser = this.$route.params.admin;
  }
};
</script>

<style scoped></style>
