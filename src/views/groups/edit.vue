<template>
  <d-container fluid class="main-content-container px-4" v-if="isLoaded">
    <!-- Page Header -->
    <top :heading="Group.title" />
    <small class="text-uppercase text-grey-500 font-open-sans ml-4">{{
      Group.category
    }}</small>
    <br />

    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="4000"
      :closeable="false"
    ></Toasts>
    <d-row no-gutters class="page-header py-4">
      <div>
        <img class="p-3 w-100 h-100 border-bottom" :src="Group.cover_image" />
      </div>
      <div class="col-md-4 col-lg-4 col-12">
        <glow-card class="col-md-8 col-lg-6 col-6 ">
          <div class="d-flex flex-row ">
            <h4 class="text-white">
              {{ Group.comments + Group.likes + Group.engagements }}
            </h4>
            <span class="ml-3 mt-n1 "
              ><icon name="arrow-up-white" size="xs" />
            </span>
          </div>
          <span class="text-white">Total Responses</span>
        </glow-card>
      </div>
    </d-row>
    <d-modal v-if="modalStatus" @close="modalStatus = false" size="lg">
      <div style="border-top: 4px solid #0087DB;" class="modal-header"></div>
      <h6 class="text-center m-2 text-bold text-dark font-poppings">
        Are you sure you want to delete this announcement?
      </h6>
      <d-modal-body>
        <div class="text-center">
          <sla-button
            class="m-2 col-md-12"
            type="filled"
            size="md"
            text="YES, DELETE"
            @click="deleteGroup(Group._id, 'annoucement/admin/delete/')"
          />
          <sla-button
            class="m-2 col-md-12"
            type="outline"
            size="md"
            :text="'CANCEL'"
            @click="modalStatus = false"
          />
        </div>
      </d-modal-body>
    </d-modal>
    <footer class="border-top m-5 ">
      <sla-button
        class="btn  m-3  text-uppercase float-right"
        :text="'EXPORT'"
        type="filled"
        size="sm"
      />
      <sla-button
        class="btn  m-3  text-uppercase float-right"
        :text="'EDIT'"
        type="outline"
        size="sm"
        @click="
          $router.push({
            path: '/announcements/edit/' + Group._id
          })
        "
      />
      <p
        class="font-open-sans float-right m-4"
        style="color: #FF4133; cursor: pointer; font-size: 14px;"
        @click="modalStatus = true"
      >
        DELETE
      </p>
    </footer>
  </d-container>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import helper from "../../helpers/helper";
const token = store.state.auth.token;
export default {
  name: "create",
  data() {
    return {
      isLoaded: false,
      modalStatus: false,
      error: {
        status: null,
        message: null
      },
      Group: undefined,
      scheduleModal: false,
      buttons: {
        publish: false,
        published: false,
        save: false,
        isLoading: false,
        text: "PUBLISH",
        text1: "SAVE"
      },
      options: [],

      picker: "",
      content: ""
    };
  },
  components: {
    SlaAvatar: () => import("@/components/avatar"),
    Icon: () => import("@/components/SlaIcon"),
    SlaButton: () => import("@/components/SlaButton"),
    Top: () => import("@/components/top")
  },

  methods: {
    getTimeDiff(date) {
      let now = moment(new Date()); //todays date
      let end = moment(date); // another date
      let duration = moment.duration(now.diff(end));
      let hours = duration.asHours();
      return parseInt(hours);
    },
    deleteGroup(id, Url) {
      return this.handleDelete(id, Url, "/announcements/all");
    },

    async handleDelete(id, deleteUrl, redirect) {
      const self = this;
      const token = store.state.auth.token;
      let res = await axios
        .delete(`${process.env.VUE_APP_API}/` + deleteUrl + id, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          setTimeout(function() {
            self.$router.push({ path: "/announcements/all" });
          }, 2000);
        })
        .catch(ex => {
          alert(ex.response.data.message);
        });
    },

    async sendComment(commentObj) {
      const self = this;
      let res = await axios
        .post(`${process.env.VUE_APP_API}/comment/admin/create/`, commentObj, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          self.$toast.success((self.error.message = res.data.message));
          return true;
        })
        .catch(ex => {
          self.$toast.error(
            (self.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
          return false;
        });
    }
  },
  mounted() {
    const token = store.state.auth.token;
    const self = this;
    axios
      .get(
        `${process.env.VUE_APP_API}/group/` +
          self.$route.params.id +
          `/group-details`,
        {
          headers: {
            Authorization: `Bearer ${token} `
          }
        }
      )
      .then(res => {
        self.Group = res.data.data.group;
        self.isLoaded = true;
      })
      .catch(ex => {});
  },
  computed: {}
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
.btn-primary {
  background-color: #0087db !important;
}
.btn-outline-primary {
  border-color: #0087db !important;
}
.dropzone {
  width: 330px;
  height: 330px;
}
</style>
