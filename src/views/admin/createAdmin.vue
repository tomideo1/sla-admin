<template>
  <d-container fluid class="main-content-container px-4">
    <d-alert
      :theme="error.type"
      @alert-dismissed="error.show = false"
      :show="error.show"
      dismissible
    >
      {{ error.message }}
    </d-alert>
    <d-row>
      <d-col lg="8" class="mx-auto mt-4">
        <d-card class="card-small edit-user-details mb-4">
          <d-card-body class="p-0">
            <!-- Nav Wrapper -->
            <div class="border-bottom clearfix d-flex">
              <d-nav tabs class="border-0 mt-auto mx-4 pt-2">
                <d-nav-item active>Create New Admin Account </d-nav-item>
              </d-nav>
            </div>

            <d-form class="py-4" @submit="handleInput" validated>
              <d-form-row class="mx-4">
                <d-col lg="12">
                  <d-form-row>
                    <!-- First Name -->
                    <d-col md="6" class="form-group">
                      <label for="first_name">First Name</label>
                      <d-input
                        type="text"
                        v-model="form.first_name"
                        id="first_name"
                        required
                      />
                      <d-form-invalid-feedback
                        >Please provide your first
                        name!</d-form-invalid-feedback
                      >
                    </d-col>

                    <!-- Last Name -->
                    <d-col md="6" class="form-group">
                      <label for="lastName">Last Name</label>
                      <d-input
                        type="text"
                        v-model="form.last_name"
                        id="lastName"
                        required
                      />
                      <d-form-invalid-feedback
                        >Please provide your last name!</d-form-invalid-feedback
                      >
                    </d-col>

                    <!-- phone_number Number -->
                    <d-col md="6" class="form-group">
                      <label for="phone">phone Number</label>
                      <d-input-group seamless>
                        <d-input-group-text slot="prepend">
                          <i class="material-icons">&#xE0CD;</i>
                        </d-input-group-text>
                        <d-input
                          id="phone"
                          v-model="form.phone_number"
                          type="tel"
                          required
                        />
                      </d-input-group>
                      <d-form-invalid-feedback
                        >Please provide your phone
                        number!</d-form-invalid-feedback
                      >
                    </d-col>

                    <!-- Email Address -->
                    <d-col md="6" class="form-group">
                      <label for="emailAddress">Email</label>
                      <d-input-group seamless>
                        <d-input-group-text slot="prepend">
                          <i class="material-icons">&#xE0BE;</i>
                        </d-input-group-text>
                        <d-form-input
                          id="emailAddress"
                          type="email"
                          v-model="form.email"
                          required
                        >
                          <d-form-invalid-feedback
                            >Invalid email address!</d-form-invalid-feedback
                          >
                        </d-form-input>
                      </d-input-group>
                    </d-col>
                  </d-form-row>
                </d-col>
              </d-form-row>
              <d-card-footer class="border-top">
                <d-button
                  size="sm"
                  type="submit"
                  class="btn-accent ml-auto d-table mr-3"
                >
                  Create Admin
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                </d-button>
              </d-card-footer>
            </d-form>
          </d-card-body>

          <!-- Save Changes -->
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import axios from "axios";
import { mapGetters, mapState } from "vuex";
import store from "@/store/index";
import state from "../../store/auth/state";
import { getToken } from "../../store/auth/getters";
export default {
  name: "createAdmin",
  data() {
    return {
      isLoading: false,
      error: {
        message: null,
        type: null,
        show: false
      },
      form: {
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null
      }
    };
  },
  methods: {
    ...mapGetters("auth/", ["getToken"]),
    handleInput(e) {
      e.preventDefault();
      this.isLoading = true;
      this.submit(this.token);
    },
    async submit() {
      let token = store.state.auth.token;
      try {
        this.form.type = "admin";
        let res = await axios.post(
          `${process.env.VUE_APP_API}/admin/create`,
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        );
        this.isLoading = false;

        this.error.message = "Admin Created successfuly";
        this.error.type = "success";
        this.error.show = true;
      } catch (e) {
        this.isLoading = false;
        this.error.message = e.response.data.message;
        this.error.type = "danger";
        this.error.show = true;
      }
    }
  }
};
</script>

<style scoped></style>
