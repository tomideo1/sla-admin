<template>
  <div class="main-content-container container-fluid h-100 px-4">
    <d-row no-gutters class="h-100">
      <d-col lg="3" md="5" class="auth-form mx-auto my-auto">
        <d-card>
          <d-card-body>
            <!-- Logo -->
            <img class="auth-form__logo d-table mx-auto mb-3" src="@/assets/images/shards-dashboards-logo.svg" alt="Shards Dashboards - Login Template">

            <!-- Title -->
            <h5 class="auth-form__title text-center mb-4">Access Your Account</h5>

            <!-- Form Fields -->
            <d-form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <d-input type="email" v-model="form.email" id="exampleInputEmail1" placeholder="Enter email" />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <d-input type="password" v-model="form.password" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <div class="form-group mb-3 d-table mx-auto">
                <d-checkbox value="remember">Remember me for 30 days.</d-checkbox>
              </div>
              <d-button @click.prevent="submit" pill type="submit" class="btn-accent d-table mx-auto">Access Account</d-button>
            </d-form>
          </d-card-body>

        </d-card>

        <!-- Meta Details -->
        <div class="auth-form__meta d-flex mt-4">
          <d-link tag="a" to="forgot-password">Forgot your password?</d-link>
        </div>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: 'sla-login',
  data () {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    async submit() {
      let res = await this.login(this.form)
      if(res == true) {
        // route to dashboard
        this.$router.replace({
          name: 'dashboard'
        })
      } else {
        // display error messges
        console.log(res)
      }

    },
    ...mapActions({
      login: 'auth/login'
    }),

  }
};
</script>

