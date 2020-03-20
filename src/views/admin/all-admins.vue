<template>
  <d-container fluid class="main-content-container px-4 pb-4">

    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboards</span>
        <h3 class="page-title">All  Admins</h3>
      </d-col>

      <!-- Page Header - Datepicker -->
    </d-row>
    <v-client-table class="dataTables_wrapper" :data="tableData" :columns="columns" :options="clientTableOptions">
      <!-- Actions Column Slot -->
      <d-button-group slot="actions" slot-scope="props" size="small" class="d-flex justify-content-center">
        <d-button class="btn-white" @click="handleActionClick('deleted', props.row.id)" v-d-tooltip.hover="'Delete'">
          <i class="material-icons">&#xE872;</i>
        </d-button>
      </d-button-group>

      <!-- Status Column Slot -->
      <span slot="status" slot-scope="props" :class="[getStatusClass(props.row.status)]">
        {{ props.row.status }}
      </span>

      <!-- Total Column Slot -->
      <span slot="total" slot-scope="props" class="text-success">
        {{ props.row.total }}
      </span>
    </v-client-table>
  </d-container>
</template>

<script>
  import Vue from 'vue';
  import { ClientTable } from 'vue-tables-2';
  import transactionHistoryData from '@/data/transaction-history-data.json';
  import '@/assets/scss/vue-tables.scss';

  Vue.use(ClientTable);

  export default {
    components: {
      ClientTable,
    },
    data() {
      return {
        dateRange: {
          from: null,
          to: null,
        },

        columns: ['id', 'date', 'customer', 'products', 'status', 'total', 'actions'],

        /**
         * Table Data
         */
        tableData: transactionHistoryData,

        /**
         * Vue Tables Configuration Options
         * @see https://github.com/matfish2/vue-tables-2
         */
        clientTableOptions: {
          perPage: 10,
          recordsPerPage: [10, 25, 50, 100],
          skin: 'transaction-history table dataTable',
          sortIcon: {
            base: 'fas float-right mt-1 text-muted',
            up: 'fa-caret-up',
            down: 'fa-caret-down',
          },
          texts: {
            filterPlaceholder: '',
            limit: 'Show',
          },
          pagination: {
            edge: true,
            nav: 'scroll',
          },
        },
      };
    },
    methods: {
      handleActionClick(type, id) {
        alert(`You have ${type} item ${id}`); // eslint-disable-line no-alert
      },
      getStatusClass(status) {
        const map = {
          Pending: 'warning',
          Complete: 'success',
          Cancelled: 'danger',
        };

        return `text-${map[status]}`;
      },
    },
  };
</script>

<style scoped>

</style>
