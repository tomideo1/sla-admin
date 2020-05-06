<template>
  <div>
    <d-row>
      <d-col lg="6">
        <d-form-row>
          <!-- First Name -->
          <d-col md="12" class="form-group">
            <label for="feFirstName"> Name</label>
            <d-form-input
              type="text"
              id="feFirstName"
              placeholder="First Name"
              v-model="formData.name"
            />
          </d-col>
          <!-- Last Name -->
          <d-col md="12" class="form-group">
            <label for="feLastName"> Email</label>
            <d-form-input
              type="email"
              id="feLastName"
              placeholder="Email"
              v-model="formData.email"
            />
          </d-col>
          <button
            class="btn btn-primary ml-auto m-4 col-lg-4"
            :disabled="button.isLoading"
          >
            {{ button.text }}
          </button>
        </d-form-row>
      </d-col>
    </d-row>
  </div>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      button: {
        text: "Create",
        isLoading: false
      },
      formData: {
        name: null,
        email: null
      }
    };
  }
};
</script>

<style scoped>
.btn-primary {
  background: #0087db;
}
.btn-outline-light {
  background: #ffffff;
  border-color: #0087db;
  color: #0087db;
}
</style>
