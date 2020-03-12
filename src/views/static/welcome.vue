<template>
  <main class="main-content col">
    <d-container fluid class="main-content-container px-4 container-fluid h-100 px-5">
      <!-- Page Header -->
      <d-row no-gutters class="page-header py-4">
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <h3 class="page-title">Welcome</h3>
        </d-col>
      </d-row>
      <d-container no-gutters class=" h-100 py-5">
        <d-row>
          <d-container class="mx-auto my-auto col-md-6  col-lg-4 col-sm-12">
            <d-container class="card" style="-webkit-box-shadow: inset 0 4px 0 0 #007bff; border-radius: .625rem;">
              <d-container class="card-body" >
                <!---->
                <!----><img src="@/assets/logos/logo.png"  height="100" width="100" alt="Sla Admin  Dashboards - Login Template" class=" d-table mx-auto mb-3">
                <h5 class="auth-form__title text-center mb-4">Access Your Account</h5>
                <d-form class="">
                  <d-container class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <d-input id="exampleInputEmail1" type="email" placeholder="Enter email" class="form-control"/>
                  </d-container>
                  <d-container class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <d-input id="exampleInputPassword1" type="password" placeholder="Password" class="form-control"/>
                  </d-container>
                  <d-container class="form-group mb-3 d-table mx-auto">
                    <label class="custom-control custom-checkbox">
                      <d-input type="checkbox" autocomplete="off" id="dr-checkbox-1aa6d34d-d8a7-4be3-b016-25d6a3f86964" true-value="orange" class="custom-control-input" value="orange"/>
                      <label for="dr-checkbox-1aa6d34d-d8a7-4be3-b016-25d6a3f86964" aria-hidden="true" class="custom-control-label"></label> <span class="custom-control-description">Remember me for 30 days.</span></label>
                  </d-container>
                  <button type="submit" class="btn btn-pill btn-accent d-table mx-auto">Access Account</button>
                </d-form>
              </d-container>
            </d-container>
            <d-container class="auth-form__meta d-flex mt-4">
              <a href="/demo/shards-dashboard-vue/forgot-password" class="" target="_self">Forgot your password?</a>
            </d-container>
          </d-container>

        </d-row>
      </d-container>
    </d-container>

  </main>
</template>

<script>
    export default {
        name: "welcome.vue"
    }
</script>

<style scoped>

</style>
