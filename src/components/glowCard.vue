<template>
  <div>
    <d-card style="background: #0087DB;border-radius: 5px;" class="shadow">
      <d-card-body
        style="background: rgba(0, 135, 219, 0.55);border-radius: 5px;
      "
      >
        <slot />
      </d-card-body>
    </d-card>
  </div>
</template>

<script>
export default {
  name: "glowCard"
};
</script>

<style scoped></style>
