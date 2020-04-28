<template>
  <d-container fluid class="main-content-container ">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title text-dark">View All Announcements</h3>
      </d-col>
    </d-row>

    <d-row class="mt-3 col-md-10">
      <d-col lg="4" v-for="i in 5">
        <d-card class="card-small card-post mb-4">
          <d-card-body>
            <h5 class="card-title">Title</h5>
            <p class="card-text text-muted">
              Quisque velit nisi, pretium ut lacinia in, elementum id enim.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
              vel, ullamcorper sit amet ligula. Donec rutrum congue leo
            </p>
          </d-card-body>
          <d-card-footer class=" d-flex">
            <div class="card-post__author d-flex">
              <div class="d-flex flex-column justify-content-center ml-3"></div>
            </div>
            <div class="my-auto ml-auto">
              <icon size="lg" name="pencil" />
              <icon size="lg" name="bin" />
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
      <d-col lg="4" v-for="i in 4">
        <d-card class="card-small card-post mb-4">
          <d-card-body>
            <h5 class="card-title">Title</h5>
            <p class="card-text text-muted">
              Quisque velit nisi, pretium ut lacinia in, elementum id enim.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
              vel, ullamcorper sit amet ligula. Donec rutrum congue leo Quisque
              velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
              ullamcorper sit amet ligula. Donec rutrum congue leo
            </p>
          </d-card-body>
          <d-card-footer class=" d-flex">
            <div class="card-post__author d-flex">
              <div class="d-flex flex-column justify-content-center ml-3"></div>
            </div>
            <div class="my-auto ml-auto">
              <icon size="lg" name="pencil" />
              <icon size="lg" name="bin" />
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
export default {
  name: "home",
  components: {
    Icon: () => import("@/components/SlaIcon.vue")
  }
};
</script>

<style scoped></style>
