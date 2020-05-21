<template>
  <d-container fluid class="main-content-container px-4 py-4 mt-4">
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="3000"
      :closeable="false"
    ></Toasts>
    <h5 class="text-black font-poppings font-weight-bold">Settings</h5>
    <d-row>
      <div class="col-md-6 col-lg-6 col-12">
        <h6 class="text-grey mt-3" style="color: #999999;">Account</h6>
        <div class=" d-flex flex-column justify-content-between  ">
          <p class="text-bold m-2 font-open-sans" style="font-size: 14px">
            Push Notifications
            <span class="float-right">
              <input type="checkbox" checked="checked"
            /></span>
          </p>
          <p class="text-bold m-2  font-open-sans" style="font-size: 14px">
            Email Notifications
            <span class="float-right"> <input type="checkbox"/></span>
          </p>
          <p class="text-bold m-2  font-open-sans" style="font-size: 14px">
            <router-link
              :to="{
                path: '/admin/settings/password-reset?token=' + this.token
              }"
            >
              Reset Password</router-link
            >
          </p>
          <div class="border-bottom mb-4 mt-4"></div>
          <h6 class="text-grey " style="color: #999999;">Connect</h6>

          <div class="m-2" style="border: 1px solid #F4F4F4;">
            <p class="text-bold m-3 ">Share App</p>
          </div>
          <div class="m-2" style="border: 1px solid #F4F4F4;">
            <p class="text-bold m-3 ">Leave a feedback</p>
          </div>
          <div class="border-bottom mb-4 mt-4"></div>

          <h6 class="text-grey " style="color: #999999;">Other</h6>

          <div class="m-2" style="border: 1px solid #F4F4F4;">
            <p class="text-bold m-3 ">Privacy Policy</p>
          </div>
          <div class="m-2" style="border: 1px solid #F4F4F4;">
            <p class="text-bold m-3 ">About This App</p>
          </div>
        </div>
      </div>
    </d-row>
  </d-container>
</template>
<script>
import store from "@/store/index";
const token = store.state.auth.token;
export default {
  data() {
    return {
      error: {
        status: null,
        message: null
      },
      token: token
    };
  },
  components: {
    SlaButton: () => import("@/components/SlaButton"),
    Icon: () => import("@/components/SlaIcon")
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.error.message = this.$route.params.success;
    self.$toast.success(
      (this.error.message = res.data ? res.data.message : "An error occured")
    );
  }
};
</script>
<style lang="scss" scoped>
input[type="checkbox"] {
  position: relative;
  width: 51px;
  height: 31px;
  -webkit-appearance: none;
  background: #c6c6c6;
  outline: none;
  border-radius: 100px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
  top: -5px;
}

input:checked[type="checkbox"] {
  background: #0087db;
}

input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  top: 5px;
  left: 5px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
}

input:checked[type="checkbox"]:before {
  left: 30px;
}
</style>
