<template>
  <div>
    <d-container fluid class="mt-3 mb-3">
      <div class=" d-flex flex-row ">
        <div class="border-right p-1">
          <h5 class="text-black mr-3 " v-if="$route.path === '/courses'">
            Courses Home
          </h5>
          <h5 class="text-black mr-3 " v-if="$route.path === '/courses/create'">
            Create Course
          </h5>
          <h5 class="text-black mr-3 " v-if="$route.path === '/courses/all'">
            Courses Library
          </h5>
          <h5
            class="text-black mr-3 "
            v-if="$route.path === '/courses/scheduled'"
          >
            Scheduled Courses
          </h5>
          <h5 class="text-black mr-3 " v-if="$route.path === '/courses/saved'">
            Saved Courses
          </h5>
        </div>
        <div class="">
          <button
            @click="$router.push('/courses/create')"
            :class="
              $route.path === '/courses/create'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
          >
            Create
          </button>
        </div>
        <div class="">
          <button
            @click="$router.push('/courses/all')"
            :class="
              $route.path === '/courses/all'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
          >
            View All
          </button>
        </div>
        <div class="">
          <button
            @click="$router.push('/courses/scheduled')"
            :class="
              $route.path === '/courses/scheduled'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
          >
            Scheduled
          </button>
        </div>
        <div class="">
          <button
            @click="$router.push('/courses/saved')"
            :class="
              $route.path === '/courses/saved'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
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
  background: #03a9f4;
  border-color: #03a9f4;
  :focus {
    color: #03a9f4;
  }
}
</style>
