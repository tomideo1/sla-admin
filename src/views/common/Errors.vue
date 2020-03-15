<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Error -->
    <div class="error">
      <div class="error__content">
        <h2>404</h2>
        <h3>Page Not Found!</h3>
        <p>The Page You Requested For Could Not Be Found</p>
        <d-button pill @click="back">&larr; Go Back</d-button>
      </div>
    </div>
  </d-container>
</template>
<script>
  export default {
    methods:{
      back(){
        this.$router.back();
      }
    }
  }
</script>
