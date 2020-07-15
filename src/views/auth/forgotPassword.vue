<template>
  <div class="d-md-flex h-md-100 align-items-center">
    <d-container fluid>
      <d-row no-gutters>
        <d-col lg="6" md="4" class="d-none d-md-flex d-lg-flex bg-image">
        </d-col>
        <d-col lg="6" md="8" class="bg-white">
          <div class="login d-flex align-items-center py-5">
            <div class="container" v-if="!isSuccess">
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
                    width="80"
                    height="80"
                    src="https://res.cloudinary.com/sla-sheleadsafrica/image/upload/v1594840037/SLA_Logo_Color_3_ew0uba.png"
                  />
                </d-col>
                <d-col md="12" lg="12" sm="12">
                  <p class="font-poppings text-center login-text mb-5 `">
                    Reset Password
                  </p>
                </d-col>
              </d-row>
              <d-row class="mt-5 mt-lg-0 pt-2 pt-lg-0">
                <d-col md="9" lg="8" class="mx-auto">
                  <d-form @submit="handleInput">
                    <div class="form-group mb-lg-4 mb-5">
                      <label
                        for="email"
                        class="form-text d-lg-none d-md-block d-block"
                        >Type in your email address
                      </label>
                      <d-input
                        id="emailAddress"
                        type="email"
                        class="form-control"
                        :class="
                          error.type === 'danger'
                            ? 'is-invalid'
                            : error.type === 'success'
                            ? 'is-valid'
                            : ''
                        "
                        v-model="form.email"
                        required
                      />
                      <div class="invalid-feedback">{{ error.message }}</div>
                      <div class="valid-feedback">{{ error.message }}</div>
                    </div>
                    <div class="text-center">
                      <sla-button
                        size="md"
                        :text="button.text"
                        type="filled"
                        class="btn col-md-8   text-uppercase font-weight-bold mb-2"
                        :disabled="isLoading"
                      >
                      </sla-button>
                    </div>
                    <div class="text-center mt-4 form-text">
                      Remembered password? &nbsp;<router-link
                        style="color: #0087DB; "
                        to="/login"
                        >Login here</router-link
                      >
                    </div>
                  </d-form>
                </d-col>
              </d-row>
            </div>
            <div class="container " v-if="isSuccess">
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
                <div class="animated bounce">
                  <d-col
                    md="12"
                    lg="12"
                    sm="12"
                    class="d-block d-lg-block d-md-block"
                  >
                    <img
                      class="d-block mx-auto"
                      src="@/assets/images/icons/email.png"
                      alt="User Avatar"
                    />
                  </d-col>
                  <d-col md="12" lg="12" sm="12" class="p-lg-3 p-2">
                    <p
                      class="font-poppings text-center login-text mb-5 p-lg-3 "
                    >
                      Instructions have been sent to your email for you to reset
                      your password
                    </p>
                  </d-col>
                </div>
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
import { mapGetters, mapState } from "vuex";
import store from "@/store/index";

export default {
  name: "forgotPassword",
  data() {
    return {
      button: {
        text: " Send Reset Notifications"
      },
      isLoading: false,
      theme: "success",
      error: {
        message: null,
        type: null,
        show: false
      },
      isSuccess: false,
      eye: false,
      type: "password",
      form: {
        email: null
      }
    };
  },
  methods: {
    ...mapGetters("auth/", ["getToken"]),
    handleInput(e) {
      e.preventDefault();
      this.button.text = "Loading...";
      this.isLoading = true;
      this.submit(this.token);
    },
    async submit() {
      let token = store.state.auth.token;
      try {
        let res = await axios.post(
          `${process.env.VUE_APP_API}/admin/password/reset`,
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        );
        this.button.text = " Send Reset Notifications";
        this.isLoading = false;
        this.error.message = "Email Sent  successfuly";
        this.error.type = "success";
        this.error.show = true;
        setTimeout(() => {
          this.isSuccess = true;
        }, 2000);
      } catch (e) {
        this.button.text = " Send Reset Notifications";
        this.isLoading = false;
        this.error.message = e.response.data.message;
        this.error.type = "danger";
        this.error.show = true;
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
  background-image: url("https://res.cloudinary.com/dwpu7jpku/image/upload/c_fit,h_900,q_100,y_0/v1593104919/Image_from_iOS_1_1_izhxu5.png");
  background-size: cover;
  background-position: center;
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
.animated {
  background-image: url(/css/images/logo.png);
  background-repeat: no-repeat;
  background-position: left top;
  padding-top: 95px;
  margin-bottom: 60px;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    -webkit-transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-30px);
  }
  60% {
    -webkit-transform: translateY(-15px);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.bounce {
  -webkit-animation-name: bounce;
  animation-name: bounce;
}
</style>
