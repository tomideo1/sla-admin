<template>
  <d-modal v-if="status" @close="status = false" size="lg" v-on="$listeners">
    <div style="border-top: 4px solid #0087DB;" class="modal-header"></div>
    <h6 class="text-center m-2 text-bold text-dark font-poppings">
      {{ modalTitle }} ?
    </h6>
    <d-modal-body>
      <div class="text-center">
        <sla-button
          class="m-2 col-md-12"
          type="filled"
          size="md"
          text="YES, DELETE"
          @click="handleDelete(id)"
        />
        <sla-button
          class="m-2 col-md-12"
          type="outline"
          size="md"
          :text="'CANCEL'"
          @click="hideModal"
        />
      </div>
    </d-modal-body>
  </d-modal>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
export default {
  name: "deleteModal",
  props: {
    status: {
      type: Boolean
    },
    modalTitle: {
      type: String
    },
    deleteUrl: {
      type: String
    },
    id: {
      type: String
    }
  },
  computed: {
    showModal() {
      return (this.status = true);
    },
    hideModal() {
      return (this.status = false);
    }
  },

  components: {
    slaButton: () => import("@/components/SlaButton")
  },
  methods: {
    async handleDelete(id) {
      const self = this;
      const token = store.state.auth.token;
      let res = await axios
        .delete(`${process.env.VUE_APP_API}/` + this.deleteUrl + id, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          setTimeout(function() {
            location.reload();
          }, 2000);
        })
        .catch(ex => {
          self.$toast.error(ex.response.data.message);
        });
    }
  }
};
</script>

<style scoped></style>
