<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboards</span>
        <h3 class="page-title">All Admins</h3>
      </d-col>

      <!-- Page Header - Datepicker -->
    </d-row>
    <d-row v-if="isLoading">
      <d-col sm="12" class="text-center">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </d-col>
    </d-row>
    <v-client-table
      class="dataTables_wrapper"
      :data="tableData"
      :columns="columns"
      :options="clientTableOptions"
    >
      <!-- Actions Column Slot -->
      <d-button-group
        slot="actions"
        slot-scope="props"
        size="small"
        class="d-flex justify-content-center"
      >
        <d-button
          class="btn-white"
          @click="handleActionClick('deleted', props.row.first_name)"
          v-d-tooltip.hover="'Delete'"
        >
          <i class="material-icons">&#xE872;</i>
        </d-button>
      </d-button-group>
    </v-client-table>
  </d-container>
</template>

<script>
import Vue from "vue";
import { ClientTable } from "vue-tables-2";
import "@/assets/scss/vue-tables.scss";

import { mapActions, mapGetters } from "vuex";
Vue.use(ClientTable);

export default {
  components: {
    ClientTable
  },
  data() {
    return {
      columns: ["first_name", "last_name", "phone_number", "email", "actions"],
      isLoading: false,
      /**
       * Table Data
       */

      /**
       * Vue Tables Configuration Options
       * @see https://github.com/matfish2/vue-tables-2
       */
      clientTableOptions: {
        perPage: 5,
        recordsPerPage: [5, 10, 15, 20, 25],
        skin: "transaction-history table dataTable",
        sortIcon: {
          base: "fas float-right mt-1 text-muted",
          up: "fa-caret-up",
          down: "fa-caret-down"
        },
        texts: {
          filterPlaceholder: "",
          limit: "Show"
        },
        pagination: {
          edge: true,
          nav: "scroll"
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      tableData: "app/getAdmins"
    })
  },
  methods: {
    handleActionClick(type, id) {
      alert(`You have ${type} item ${id}`); // eslint-disable-line no-alert
    },
    ...mapActions("app/", ["getAllAdmins"])
  },
  async mounted() {
    const self = this;
    setTimeout(function() {}, 3);
    this.getAllAdmins();
  }
};
</script>

<style scoped>
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #007cff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
