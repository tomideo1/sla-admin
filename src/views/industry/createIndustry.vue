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
                <d-nav-item active>Create New Industry </d-nav-item>
              </d-nav>
            </div>

            <d-form class="py-4" @submit="handleInput" validated>
              <d-form-row class="mx-4">
                <d-col lg="12">
                  <d-form-row>
                    <!-- First Name -->
                    <d-col md="6" class="form-group">
                      <label for="name"> Name</label>
                      <d-input
                        type="text"
                        v-model="form.name"
                        id="name"
                        required
                      />
                      <d-form-invalid-feedback
                        >Please provide name!</d-form-invalid-feedback
                      >
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
                  Create Industry
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
        name: null
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
        let res = await axios.post(
          `${process.env.VUE_APP_API}/industry/admin/create`,
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        );
        this.isLoading = false;

        this.error.message = "Industry Created successfuly";
        this.error.type = "success";
        this.form = {};
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
