<template>
  <div class="d-md-flex h-md-100 align-items-center">
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="3000"
      :closeable="false"
    ></Toasts>
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
                  <p class="font-poppings text-center login-text  `">
                    Set New Password
                  </p>
                  <p class="mx-auto text-center  w-50 font-open-sans">
                    Password should not be less than 6 characters. It should
                    contain at least one uppercase letter, lower case letter and
                    numbers
                  </p>
                </d-col>
              </d-row>
              <d-row class="mt-5 mt-lg-0 pt-2 pt-lg-0">
                <d-col md="9" lg="8" class="mx-auto">
                  <d-form>
                    <div class="form-group mb-lg-4 mb-5">
                      <label for="password" class="form-text">Password </label>

                      <d-input-group seamless>
                        <d-input-group-text slot="append">
                          <a
                            @click="switchVisibility"
                            href="javascript:void(0)"
                          >
                            <i
                              :class="eye ? 'fa fa-eye' : 'fa fa-eye-slash'"
                            ></i>
                          </a>
                        </d-input-group-text>
                        <d-input
                          :type="type"
                          class="form-control "
                          v-model="form.password"
                          placeholder="Password"
                          required
                        />
                      </d-input-group>
                      <password
                        v-model="form.password"
                        :strength-meter-only="true"
                        :showPassword="false"
                        :badge="false"
                        :toggle="true"
                        @score="showScore"
                      />
                    </div>
                    <div class="form-group mb-lg-4 mb-5">
                      <label for="password" class="form-text"
                        >Re-type Password
                      </label>

                      <d-input-group seamless>
                        <d-input-group-text slot="append">
                          <a
                            @click="switchVisibility2"
                            href="javascript:void(0)"
                          >
                            <i
                              :class="eye ? 'fa fa-eye' : 'fa fa-eye-slash'"
                            ></i>
                          </a>
                        </d-input-group-text>
                        <d-input
                          :type="type"
                          class="form-control "
                          v-model="form.confirm_password"
                          placeholder="Password"
                          required
                        />
                      </d-input-group>
                    </div>
                    <sla-button
                      @click.prevent="handleInput"
                      class="btn col-md-12  text-center text-uppercase font-weight-bold mb-2"
                      :disabled="isLoading"
                      :text="button.text"
                      size="md"
                      type="filled"
                    >
                      <span
                        v-if="isLoading"
                        class="spinner-border spinner-border-sm"
                      ></span>
                    </sla-button>
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
import axios from "axios";
import { mapMutations, mapState } from "vuex";
import Password from "vue-password-strength-meter";
export default {
  components: {
    Password,
    SlaButton: () => import("@/components/SlaButton")
  },
  name: "password-reset",
  data() {
    return {
      button: {
        text: " Reset Password"
      },
      token: null,
      isLoading: false,
      password_strength: null,
      error: {
        message: null,
        type: null,
        show: false
      },
      eye: false,
      type: "password",
      form: {
        password: null,
        confirm_password: null
      }
    };
  },
  methods: {
    ...mapMutations("auth/", ["setUserDetails", "setToken"]),
    handleInput() {
      this.isLoading = true;
      this.error.show = false;
      if (!this.form.password || !this.form.confirm_password) {
        this.isLoading = false;
        this.$toast.error((this.error.message = "All fields are required"));
        this.error.show = true;
        return;
      }

      if (this.form.password !== this.form.confirm_password) {
        console.log("validate password");
        this.isLoading = false;
        this.error.show = true;
        this.$toast.error((this.error.message = "Password must be the same"));
        return;
      }
      console.log(this.password_strength);
      if (this.password_strength < 2) {
        this.isLoading = false;
        this.$toast.error((this.error.message = "The strength is too weak "));
        this.error.show = true;
        return;
      }

      this.submit();
    },
    async submit() {
      try {
        let res = await axios.post(
          `${process.env.VUE_APP_API}/admin/password/update`,
          this.form,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        );
        this.button.text = "Reset Password";
        this.setToken(res.data.token);
        this.setUserDetails(res.data.admin);
        this.error.message = "Password updated successfuly";
        this.error.type = "success";
        this.error.show = true;
        //route to dashboard
        setTimeout(() => {
          this.$router.replace({
            name: "dashboard"
          });
        }, 2000);
      } catch (e) {
        this.button.text = "Reset Password";
        this.isLoading = false;
        this.$toast.error((this.error.message = e.response.data.message));
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
    },
    switchVisibility2() {
      if (this.type === "password") {
        this.type = "text";
        this.eye = true;
      } else {
        this.type = "password";
        this.eye = false;
      }
    },
    showScore(score) {
      console.log("💯", score);
      this.password_strength = score;
    }
  },
  mounted() {
    this.token = this.$route.query.token;
    if (!this.token || typeof this.token != "string") {
      alert("Invalid Token");
    }
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
  background-image: url("https://res.cloudinary.com/dwpu7jpku/image/upload/c_fit,h_900,q_100,y_0/v1593104919/Image_from_iOS_1_1_izhxu5.png");
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
</style>
