<template>
  <d-container fluid class="main-content-container px-4">
    <d-row>
      <d-col lg="8" class="mx-auto mt-4">
        <d-card class="card-small edit-user-details mb-4">
          <d-card-body class="p-0">

            <!-- Nav Wrapper -->
            <div class="border-bottom clearfix d-flex">
              <d-nav tabs class="border-0 mt-auto mx-4 pt-2">
                <d-nav-item active>Create Admin</d-nav-item>
              </d-nav>
            </div>

            <d-form class="py-4">

              <d-form-row class="mx-4">
                <d-col lg="12">
                  <d-form-row>

                    <!-- First Name -->
                    <d-col md="6" class="form-group">
                      <label for="firstName">First Name</label>
                      <d-input type="text" id="firstName"  />
                    </d-col>

                    <!-- Last Name -->
                    <d-col md="6" class="form-group">
                      <label for="lastName">Last Name</label>
                      <d-input type="text" id="lastName"  />
                    </d-col>



                    <!-- Phone Number -->
                    <d-col md="6" class="form-group">
                      <label for="phoneNumber">Phone Number</label>
                      <d-input-group seamless>
                        <d-input-group-text slot="prepend">
                          <i class="material-icons">&#xE0CD;</i>
                        </d-input-group-text>
                        <d-input id="phoneNumber"  />
                      </d-input-group>
                    </d-col>

                    <!-- Email Address -->
                    <d-col md="6" class="form-group">
                      <label for="emailAddress">Email</label>
                      <d-input-group seamless>
                        <d-input-group-text slot="prepend">
                          <i class="material-icons">&#xE0BE;</i>
                        </d-input-group-text>
                        <d-input id="emailAddress" />
                      </d-input-group>
                    </d-col>



                  </d-form-row>
                </d-col>



              </d-form-row>




            </d-form>
          </d-card-body>

          <!-- Save Changes -->
          <d-card-footer class="border-top">
            <d-button size="sm" class="btn-accent ml-auto d-table mr-3">
              Create Admin
            </d-button>
          </d-card-footer>

        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
    export default {
        name: "createAdmin"
    }
</script>

<style scoped>

</style>
