<template>
  <main class="main-content col">
    <d-container no-gutters class=" h-100 py-5 mt-5 ">
      <d-row >
        <d-container class="mx-auto my-auto col-md-6 mx-auto  col-lg-4 col-sm-12">
          <d-container class="card" style="-webkit-box-shadow: inset 0 4px 0 0 #007bff; border-radius: .625rem;">
            <d-container class="card-body" >
              <!---->
              <!----><img src="@/assets/logos/logo.png"  height="70" width="70" alt="Sla Admin  Dashboards - Login Template" class=" d-table mx-auto mb-3">
              <h5 class="auth-form__title text-center mb-4">Reset  Password</h5>
              <d-form class="">
                <d-container class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <d-input id="exampleInputEmail1" type="email" placeholder="Enter email" class="form-control"/>
                </d-container>
                <button type="submit" class="btn btn-pill btn-accent d-table mx-auto">Reset Password</button>
              </d-form>
            </d-container>
          </d-container>
          <div class="p-3 text-center  mt-3">
            <router-link to="login">
              Take me back to login
            </router-link>
          </div>
        </d-container>

      </d-row>
    </d-container>

  </main>
</template>

<script>
    export default {
        name: "forgotPassword"
    }
</script>

<style scoped>

</style>
