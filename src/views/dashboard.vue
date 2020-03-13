<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Admin Dashboard</h3>
      </d-col>
    </d-row>

    <d-row>
      <!-- New Draft -->
      <d-col lg="4" md="6" sm="12" class="mb-4">
        <bo-new-draft />
      </d-col>

      <!-- Discussions -->
      <d-col lg="5" md="12" sm="12" class="mb-4">
        <bo-discussions @approve="handleApprove" @reject="handleReject" @edit="handleEdit" @view-all-comments="handleViewAllComments" />
      </d-col>

      <!-- Top Referrals -->
      <d-col lg="3" md="12" sm="12" class="mb-4">
        <bo-top-referrals />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>

  export default {
    name:'dashboard',
    components: {

    },
    data() {
      return {
      };
    },
    methods: {

    },
    computed: {}
  };
</script>

