<template>
  <d-container
    fluid
    class="mt-5 mb-3 d-block text-center mx-auto d-md-block d-lg-block"
    v-if="!$route.path.endsWith('single')"
  >
    <div class=" d-lg-flex d-md-flex flex-row  flex-grow-1 ">
      <h5
        v-for="header in navs.title"
        v-if="$route.path === header.path && typeof navs !== 'undefined'"
        class="text-black mt-2  "
      >
        {{ header.name }}
      </h5>
      <div>
        <div class="border-right p-3 m-1 d-none d-lg-block d-md-block"></div>
      </div>
      <div
        class="m-1"
        v-for="action in navs.actions"
        v-if="typeof navs !== 'undefined'"
      >
        <button
          @click="$router.push(action.path)"
          :class="
            $route.path === action.path
              ? 'btn btn-sm btn-primary'
              : 'btn btn-sm btn-light'
          "
          style="border-radius: 10px;"
        >
          {{ action.name }}
        </button>
      </div>
    </div>
  </d-container>
</template>

<script>
export default {
  name: "NavMenu",
  props: ["navs"]
};
</script>

<style scoped>
.btn-primary {
  background: #0087db;
  border: none;
}
</style>
