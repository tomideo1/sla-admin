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
                <d-nav-item active>Update App Messages </d-nav-item>
              </d-nav>
            </div>

            <d-form class="py-4" @submit="handleInput">
              <d-form-row class="mx-4">
                <d-col lg="12">
                  <d-form-row>
                    <d-col md="12" class="form-group">
                      <label for="name"> Welcome Message</label>
                      <d-input
                        size="lg"
                        class="mb-3"
                        placeholder="Welcome Message"
                        v-model="form.welcome_message"
                      />
                    </d-col>
                    <d-col md="12" class="form-group">
                      <label for="name"> Recommended Courses Message</label>
                      <d-input
                        size="lg"
                        class="mb-3"
                        placeholder="Recommended Courses Message"
                        v-model="form.recommended_courses_message"
                      />
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
                  Update
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
      form: { recommended_courses_message: "", welcome_message: "" }
    };
  },
  mounted() {
    this.getMessages();
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
          `${process.env.VUE_APP_API}/messages/admin/create`,
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        );
        this.isLoading = false;

        this.error.message = "Messages updated successfuly";
        this.error.type = "success";
        this.error.show = true;
      } catch (e) {
        this.isLoading = false;
        this.error.message = e.response.data.message;
        this.error.type = "danger";
        this.error.show = true;
      }
    },
    async getMessages() {
      let token = store.state.auth.token;
      try {
        let res = await axios.get(
          `${process.env.VUE_APP_API}/messages/list`,
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        );
        console.log({ res });
        this.form.welcome_message = res.data.messages.welcome_message;
        this.form.recommended_courses_message =
          res.data.messages.recommended_courses_message;
        console.log(this.form);
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
