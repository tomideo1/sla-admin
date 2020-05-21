<template>
  <div>
    <d-container fluid class="main-content-container px-4">
      <d-row>
        <Toasts
          :show-progress="false"
          :rtl="false"
          :max-messages="5"
          :time-out="4000"
          :closeable="false"
        ></Toasts>
        <d-col lg="6">
          <d-form-row>
            <!-- First Name -->
            <d-col md="12" class="form-group">
              <label for="feFirstName"> First Name</label>
              <d-form-input
                type="text"
                placeholder="First Name"
                v-model="formData.first_name"
              />
            </d-col>
            <d-col md="12" class="form-group">
              <label for="feFirstName"> Last Name</label>
              <d-form-input
                type="text"
                placeholder="Last Name"
                v-model="formData.last_name"
              />
            </d-col>
            <d-col md="12" class="form-group">
              <label for="feFirstName"> Phone</label>
              <d-form-input
                type="text"
                id="feFirstName"
                placeholder="Phone Number"
                v-model="formData.phone_number"
              />
            </d-col>
            <!-- Last Name -->
            <d-col md="12" class="form-group">
              <label for="feLastName"> Email</label>
              <d-form-input
                type="email"
                id="feLastName"
                placeholder="Email"
                v-model="formData.email"
              />
            </d-col>
            <button
              class="btn btn-primary ml-auto m-4 col-lg-4"
              :disabled="buttons.isLoading"
              @click="handleSubmit"
            >
              {{ buttons.text }}
            </button>
          </d-form-row>
        </d-col>
      </d-row>
    </d-container>
  </div>
</template>

<script>
import store from "@/store/index";
import axios from "axios";
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
        text: "Create",
        isLoading: false
      },
      formData: {
        first_name: null,
        last_name: null,
        phone_number: null,
        email: null
      }
    };
  },

  methods: {
    async handleSubmit() {
      this.buttons.isLoading = true;
      this.buttons.text = "Loading...";
      const self = this;
      let res = await axios
        .post(`${process.env.VUE_APP_API}/admin/user/create`, this.formData, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          self.buttons.isLoading = false;
          self.buttons.text = "Create";
          self.$toast.success(
            (self.error.message = res.data
              ? res.data.message
              : "An error occured")
          );
          setTimeout(function() {
            self.$router.push({ path: "/users/all" });
          }, 2000);
        })
        .catch(ex => {
          self.buttons.isLoading = false;
          self.buttons.text = "Create";
          self.$toast.error(
            (self.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
        });
    }
  }
};
</script>

<style scoped>
.btn-primary {
  background: #0087db;
}
.btn-outline-light {
  background: #ffffff;
  border-color: #0087db;
  color: #0087db;
}
</style>
