<template>
  <div>
    <d-container fluid class="mt-5 mb-3 d-none d-md-block d-lg-block">
      <div class=" d-lg-flex d-md-flex flex-row  flex-grow-1 ">
        <div class="border-right  ">
          <h5 class="text-black mr-lg-3 mr-1 " v-if="$route.path === '/polls'">
            Polls Home
          </h5>
          <h5
            class="text-black mr-lg-3  mr-1"
            v-if="$route.path === '/polls/create'"
          >
            Create Polls
          </h5>
          <h5
            class="text-black mr-lg-3 pr-2 "
            v-if="$route.path === '/polls/all'"
          >
            View All Polls
          </h5>
          <h5
            class="text-black mr-lg-3  mr-1"
            v-if="$route.path === '/polls/scheduled'"
          >
            Scheduled Polls
          </h5>
          <h5 class="text-black mr-3 " v-if="$route.path === '/polls/saved'">
            Saved Polls
          </h5>
        </div>
        <div class=" ml-3 mr-1">
          <button
            @click="$router.push('/polls/create')"
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
        <div class="mr-1">
          <button
            @click="$router.push('/polls/all')"
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
        <div class="mr-1">
          <button
            @click="$router.push('/polls/scheduled')"
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
        <div class="mr-1">
          <button
            @click="$router.push('/polls/saved')"
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
  background: #03a9f4;
  border-color: #03a9f4;
  :focus {
    color: #03a9f4;
  }
}
</style>
