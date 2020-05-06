<template>
  <div>
    <d-container fluid class="mt-5 mb-3 d-none d-md-block d-lg-block">
      <div class=" d-lg-flex d-md-flex flex-row  flex-grow-1 ">
        <div class="border-right  ">
          <h5 class="text-black mr-lg-3 mr-1 " v-if="$route.path === '/users'">
            Users Home
          </h5>
          <h5
            class="text-black mr-lg-3  mr-1"
            v-if="$route.path === '/users/create'"
          >
            Create Participants
          </h5>
          <h5
            class="text-black mr-lg-3 pr-2 "
            v-if="$route.path === '/users/all'"
          >
            View All Participants
          </h5>
          <h5
            class="text-black mr-lg-3  mr-1"
            v-if="$route.path === '/users/coaches/create'"
          >
            Create New Coach
          </h5>
          <h5
            class="text-black mr-3 "
            v-if="$route.path === '/users/coaches/all'"
          >
            View All Coaches
          </h5>
        </div>
        <div class=" ml-3 mr-1">
          <button
            @click="$router.push('/users/create')"
            :class="
              $route.path === '/users/create'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
            style="border-radius: 10px;"
          >
            Create New Participant
          </button>
        </div>
        <div class="mr-1">
          <button
            @click="$router.push('/users/all')"
            :class="
              $route.path === '/users/all'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
            style="border-radius: 10px;"
          >
            View All Participants
          </button>
        </div>
        <div class="mr-1">
          <button
            @click="$router.push('/users/coaches/create')"
            :class="
              $route.path === '/users/coaches/create'
                ? 'btn btn-sm btn-primary'
                : 'btn btn-sm btn-light'
            "
            style="border-radius: 10px;"
          >
            Create New Coach
          </button>
        </div>
        <div class="mr-1">
          <button
            @click="$router.push('/users/coaches/all')"
            :class="
              $route.path === '/users/coaches/all'
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
    console.log("Users Loaded");
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
