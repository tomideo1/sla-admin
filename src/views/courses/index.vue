<template>
  <div>
    <d-container
      fluid
      class="mt-5 mb-3 d-block text-center mx-auto d-md-block d-lg-block"
    >
      <div class=" d-lg-flex d-md-flex flex-row  flex-grow-1 ">
        <div class="border-right mr-lg-3  ">
          <h5
            class="text-black mr-lg-3 mr-md-1 "
            v-if="$route.path === '/courses'"
          >
            Courses Home
          </h5>
          <h5
            class="text-black mr-lg-3 "
            v-if="$route.path === '/courses/create'"
          >
            Create Course
          </h5>
          <h5
            class="text-black mr-lg-3 pr-2 "
            v-if="$route.path === '/courses/all'"
          >
            Courses Library
          </h5>
          <h5
            class="text-black mr-lg-3  mr-1"
            v-if="$route.path === '/courses/scheduled'"
          >
            Scheduled Courses
          </h5>
          <h5
            class="text-black mr-lg-3 "
            v-if="$route.path === '/courses/saved'"
          >
            Saved Courses
          </h5>
        </div>
        <div class="mr-lg-2">
          <button
            @click="$router.push('/courses/create')"
            :class="
              $route.path === '/courses/create'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
            style="border-radius: 10px;"
          >
            Create
          </button>
        </div>
        <div class="mr-lg-2">
          <button
            @click="$router.push('/courses/all')"
            :class="
              $route.path === '/courses/all'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
            style="border-radius: 10px;"
          >
            View All
          </button>
        </div>
        <div class="mr-lg-2">
          <button
            @click="$router.push('/courses/scheduled')"
            :class="
              $route.path === '/courses/scheduled'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
            style="border-radius: 10px;"
          >
            Scheduled
          </button>
        </div>
        <div class="mr-lg-2">
          <button
            @click="$router.push('/courses/saved')"
            :class="
              $route.path === '/courses/saved'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
            style="border-radius: 10px;"
          >
            Saved
          </button>
        </div>
      </div>
    </d-container>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    console.log("COURSES_LOADED");
  }
};
</script>
<style lang="scss" scoped>
.btn-primary {
  background: #0087db;
  border-color: #0087db;
  :focus {
    color: #0087db;
  }
}
</style>
