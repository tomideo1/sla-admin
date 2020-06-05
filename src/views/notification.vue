<template>
  <d-container fluid class="main-content-container px-4 py-4 mt-4">
    <h5 class="text-black font-poppings font-weight-bold">Notifications</h5>
    <d-row no-gutters>
      <div class="col-md-8">
        <div v-show="true">
          <p class="heading text-bold font-poppings text-dark ">New</p>
          <noty userName="Tomide">
            <span class="d-flex flex-row flex-grow-1 justify-content-lg-start">
              <p class="mt-2">
                <b>
                  Lorem ipsum dolor sit amet,
                </b>
                <small class="ml-3 ">3W</small>
              </p>
              <d-card
                class="ml-auto"
                :style="
                  'width:56px!important;height: 56px!important;' +
                    'backgroundImage:url(' +
                    'https://res.cloudinary.com/dwpu7jpku/image/upload/v1584548572/auth-bg_i6msdh.png' +
                    ');' +
                    ' background-size:cover; background-position:center'
                "
              >
              </d-card>
            </span>
          </noty>
          <p class="heading text-bold font-poppings text-dark ">This Week</p>

          <p class="heading text-bold font-poppings text-dark ">Earlier</p>
        </div>
        <div v-show="false" class="col">
          <icon name="empty" class="m-3" size="retain" />
          <span
            class="font-poppings text-dark justify-content-center d-flex"
            style="font-size: 16px;"
          >
            You don’t have any notification
          </span>
        </div>
      </div>
      <div class="col-md-4"></div>
    </d-row>
  </d-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {
    Noty: () => import("@/components/slaNotyCard"),
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style></style>
