<template>
  <div @click="$emit('click', $event)">
    <div class="d-flex align-items-center justify-content-even chat mt-1 mx-1">
      <div>
        <avatar size="xl" :user="{ image: dataObj.group.cover_image }" />
      </div>
      <div class="ml-8 width-100">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <div class="text-bold">{{ dataObj.group.title }}</div>
          <small>6:34 PM</small>
        </div>
        <div class="d-flex">
          <div class="w-100 text-truncate ">
            {{ dataObj.last_message.message }}
          </div>
          <div
            class="counter p-1 text-white d-flex align-items-center justify-content-center"
          >
            <small>{{ dataObj.group_unread }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
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
