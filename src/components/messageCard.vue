<template>
  <d-card @click="$emit('click', $event)" class="p-3 m-2">
    <div class="d-flex align-items-center justify-content-even chat mt-1 m-1">
      <div>
        <avatar size="lg" :user="{ image: dataObj.cover_image }" />
      </div>
      <div class="ml-4 w-100">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <div class="text-black">{{ dataObj.title }}</div>
          <small>6:34 PM</small>
        </div>
        <div class="d-flex">
          <div class="w-100 text-truncate ">
            <!-- {{ dataObj.last_message.message }} -->
            Last Message in the group
          </div>
          <div
            class="counter p-1 text-white d-flex align-items-center justify-content-center"
          >
            <small>{{ dataObj.group_unread }}</small>
          </div>
        </div>
      </div>
    </div>
  </d-card>
</template>
<script>
export default {
  props: ["dataObj"],
  components: {
    Avatar: () => import("@/components/avatar")
  }
};
</script>
<style>
.counter {
  background-color: red;
  border-radius: 50%;
  height: 18px;
  width: 18px;
}
</style>
