<template>
  <div>
    <img
      class="avatar rounded-circle"
      :src="url"
      :width="size"
      :height="size"
    />
  </div>
</template>

<script>
export default {
  name: "avatar",
  props: ["url", "size"]
};
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffffff;
  box-sizing: border-box;
}
</style>
