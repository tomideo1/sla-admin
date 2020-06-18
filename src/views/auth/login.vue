<template>
  <div class="d-md-flex h-md-100 align-items-center">
    <d-container fluid>
      <d-row no-gutters>
        <d-col lg="6" md="4" class="d-none d-md-flex d-lg-flex bg-image">
        </d-col>
        <d-col lg="6" md="8" class="bg-white">
          <div class="login d-flex align-items-center py-5">
            <div class="container">
              <d-row>
                <d-col
                  md="12"
                  lg="12"
                  sm="12"
                  class="d-none d-lg-block d-md-block"
                >
                  <d-image
                    center
                    class="mb-lg-4 pb-lg-4 "
                    src="https://res.cloudinary.com/dwpu7jpku/image/upload/v1584552409/SLA_Logo_Color_3_yzo3ce.png"
                  />
                </d-col>
                <d-col md="12" lg="12" sm="12">
                  <p class="font-poppings text-center login-text mb-5 `">
                    Login with your email
                  </p>
                </d-col>
              </d-row>
              <d-row class="mt-5 mt-lg-0 pt-2 pt-lg-0">
                <d-col md="9" lg="8" class="mx-auto">
                  <d-form>
                    <div class="form-group mb-lg-4 mb-5">
                      <d-input
                        type="email"
                        id="inputEmail"
                        v-model="form.email"
                        class="form-control"
                        :class="
                          error.type === 'email' || error.type === 'error'
                            ? 'is-invalid'
                            : ''
                        "
                        placeholder="Email address"
                        required
                        autofocus
                      />
                      <div class="invalid-feedback">{{ error.message }}</div>
                    </div>

                    <div class="form-group mb-lg-4 mb-5">
                      <d-input-group seamless>
                        <d-input-group-text slot="append">
                          <button
                            type="button"
                            @click="switchVisibility"
                            class="eye-button"
                          >
                            <i
                              :class="eye ? 'fa fa-eye' : 'fa fa-eye-slash'"
                            ></i>
                          </button>
                        </d-input-group-text>
                        <d-input
                          :type="type"
                          class="form-control"
                          :class="error.type === 'password' ? 'is-invalid' : ''"
                          v-model="form.password"
                          placeholder="Password"
                          required
                        />
                        <div class="invalid-feedback">{{ error.message }}</div>
                      </d-input-group>
                    </div>
                    <div class="text-center">
                      <sla-button
                        @click.prevent="submit"
                        class="btn col-md-8   text-uppercase font-weight-bold mb-2"
                        :disabled="isLoading"
                        :text="button.text"
                        size="md"
                        type="filled"
                      >
                      </sla-button>
                    </div>
                    <div class="text-center mt-4 form-text">
                      Forgot password? &nbsp;<router-link
                        style="color: #0087DB; "
                        to="forgot-password"
                        >Click here</router-link
                      >
                    </div>
                  </d-form>
                </d-col>
              </d-row>
            </div>
          </div>
        </d-col>
      </d-row>
    </d-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "sla-login",
  data() {
    return {
      isLoading: false,
      button: {
        text: "Login"
      },
      theme: "success",
      error: {
        message: null,
        type: null,
        show: false
      },
      eye: false,
      type: "password",
      form: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login"
    }),
    async submit() {
      // console.log('something gets here')
      this.button.text = "Loading....";
      this.isLoading = true;

      let res = await this.login(this.form);
      if (res.status == 200) {
        // route to dashboard
        this.isLoading = false;
        this.button.text = "Login";
        console.log({ res });
        if (res.data.admin.type == "coach") {
          this.$router.replace({
            name: "coach-dashboard"
          });
        } else {
          this.$router.replace({
            name: "dashboard"
          });
        }
      } else {
        this.button.text = "Login";
        this.error.type = res.data.type !== undefined ? res.data.type : "error";
        this.error.message = res.data.message;
        this.isLoading = false;
      }
    },

    switchVisibility() {
      if (this.type === "password") {
        this.type = "text";
        this.eye = true;
      } else {
        this.type = "password";
        this.eye = false;
      }
    }
  },
  components: {
    SlaButton: () => import("@/components/SlaButton")
  }
};
</script>

<style scoped lang="scss">
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url("https://res.cloudinary.com/dwpu7jpku/image/upload/v1592506403/Image_from_iOS_1_1_izhxu5.png");
  background-size: cover;
  background-position: center;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  background: #0087db;
  border-radius: 5px;
}
.form-control {
  background: #f4f4f4;
  border-radius: 5px;
  height: 52px;
}
.form-text {
  color: #999999;
}
.container-fluid {
  padding-left: 0px;
  padding-right: 0px;
}
.login-text {
  color: #333333;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
}
.eye-button {
  padding: 0;
  border: none;
  background: none;
}
</style>
