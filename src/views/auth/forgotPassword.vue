<template>

  <div class="d-md-flex h-md-100 align-items-center">
    <d-container fluid>
      <d-row no-gutters>
        <d-col lg="6" md="4"   class="d-none d-md-flex d-lg-flex bg-image">
        </d-col>
        <d-col lg="6" md="8" class="bg-white"  >
          <div class="login d-flex align-items-center py-5"  >
            <div class="container" v-if="isSuccess">
              <d-row>
                <d-col md="12" lg="12" sm="12" class="d-none d-lg-block d-md-block">
                  <d-image center class="mb-lg-4 pb-lg-4 " src="https://res.cloudinary.com/dwpu7jpku/image/upload/v1584552409/SLA_Logo_Color_3_yzo3ce.png"/>
                </d-col>
                <d-col md="12" lg="12" sm="12">
                  <p class="font-poppings text-center login-text mb-5 `" > Reset   Password</p>
                </d-col>
              </d-row>
              <d-row class="mt-5 mt-lg-0 pt-2 pt-lg-0" >
                <d-col md="9" lg="8" class="mx-auto">
                  <d-form >
                    <div class="form-group mb-lg-4 mb-5">
                      <label for="email" class="form-text d-lg-none d-md-block d-block">Type in your email address </label>
                      <d-input type="email" id="inputEmail" v-model="form.email"  class="form-control" placeholder="Email address" required autofocus/>
                    </div>

                    <button  @click.prevent="submit" class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">
                      Send Reset Notifications
                      <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    </button>
                    <div class="text-center mt-4 form-text" >
                      Remembered password? &nbsp;<router-link to="login">Login here</router-link></div>
                  </d-form>
                </d-col>
              </d-row>
            </div>
            <div class="container" v-if="!isSuccess">
              <d-row>
                <d-col md="12" lg="12" sm="12" class="d-none d-lg-block d-md-block">
                  <d-image center class="mb-lg-4 pb-lg-4 " src="https://res.cloudinary.com/dwpu7jpku/image/upload/v1584552409/SLA_Logo_Color_3_yzo3ce.png"/>
                </d-col>
                <d-col md="12" lg="12" sm="12" class="d-block d-lg-block d-md-block">
                  <img  class="d-block mx-auto" src="@/assets/images/icons/email.png" alt="User Avatar">
                </d-col>
                <d-col md="12" lg="12" sm="12" class="p-lg-3 p-2">
                  <p class="font-poppings text-center login-text mb-5 p-lg-3 " >
                    Instructions have been sent to your email for you to reset your password
                  </p>
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
    import {mapActions} from "vuex";

    export default {
        name: "forgotPassword",
      data (){
          return{
            isLoading:false,
            theme:'success',
            isAlert:false,
            alert_type:null,
            alert_message:null,
            isSuccess:false,
            eye:false,
            type:'password',
            form: {
              email:null
            }
          }
      },
      methods: {
        async submit() {
          // console.log('something gets here')
          this.isLoading = true;
          let res =  await this.login(this.form)
          if(res === true) {
            // route to dashboard
            this.isLoading = false;
            this.$router.replace({
              name: 'dashboard'
            })
          } else {
            this.$toast.error(
              res.data.error
            );
            this.isLoading = false;
          }

        },
        ...mapActions({
          login: 'auth/login'
        }),


      },
    }
</script>

<style scoped  lang="scss">
  :root {
    --input-padding-x: 1.5rem;
    --input-padding-y: 0.75rem;
  }

  .login,
  .image {
    min-height: 100vh;
  }

  .bg-image {
    background-image: linear-gradient(rgba(30, 136, 229, 0.19)), url("https://res.cloudinary.com/dwpu7jpku/image/upload/v1584548572/auth-bg_i6msdh.png");
    background-size: cover;
    background-position: center;
  }


  .btn-login {
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    padding: 0.75rem 1rem;
    background: #0087DB;
    border-radius: 5px;
  }
  .form-control{
    background: #F4F4F4;
    border-radius: 5px;
    height: 52px;
  }
  .form-text{
    color: #999999;
  }
  .container-fluid{
    padding-left: 0px;
    padding-right: 0px;
  }
  .login-text{
    color: #333333;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
  }


</style>
