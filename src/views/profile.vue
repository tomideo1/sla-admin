<template>
  <div>
    <d-container fluid class="main-content-container px-4 py-4 mt-4">
      <h5 class="text-black font-poppings font-weight-bold">Profile</h5>
      <d-row>
        <div class="col-md-2 col-lg-2 col-12">
          <d-row>
            <div class="mb-3 col-md-12 col-lg-12 col-12  ">
              <div class="text-center">
                <avatar
                  size="150"
                  :url="
                    'https://res.cloudinary.com/dwpu7jpku/image/upload/v1558709245/samples/ecommerce/leather-bag-gray.jpg'
                  "
                />
              </div>
            </div>
          </d-row>
        </div>
        <div class="col-md-6 col-lg-6 col-12">
          <d-form-row>
            <!-- First Name -->
            <d-col md="12" class="form-group">
              <label class="text-grey"> First Name</label>
              <d-form-input type="text" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Last Name</label>
              <d-form-input type="text" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Phone Number</label>
              <d-form-input type="text" />
            </d-col>
            <d-col md="12" class="form-group">
              <label class="text-grey"> Email</label>
              <d-form-input type="text" />
            </d-col>
          </d-form-row>
          <div class="mx-auto">
            <sla-button
              class="font-open-sans m-lg-3 m-md-3 mt-3  col-md-12 col-12 col-lg-12"
              size="md"
              type="filled"
              text="UPDATE PROFILE"
            />
          </div>
        </div>
      </d-row>
    </d-container>
  </div>
</template>

<script>
export default {
  name: "single",
  components: {
    top: () => import("@/components/top"),
    avatar: () => import("@/components/avatar.vue"),
    SlaButton: () => import("@/components/SlaButton.vue")
  }
};
</script>

<style scoped></style>
