<template>
  <div>
    <beat-loader
      class="loader m-3 centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
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
        <div class="col-md-8 " style="box-sizing: border-box">
          <div>
            <img
              class="p-3 w-100 h-100 border-bottom"
              :src="Group.cover_image"
            />
          </div>
          <sla-button
            class="btn  m-3  text-uppercase float-right"
            :text="'INVITE MEMBERS'"
            type="filled"
            size="sm"
            @click="showParticipant = true"
          />
          <sla-button
            class="btn  m-3  text-uppercase float-right"
            :text="'PROCESS INVITATIONS'"
            type="outline"
            size="sm"
            @click="handleInvite()"
          />
        </div>
        <div class="col-md-4 col-lg-4 col-12">
          <div class="row">
            <span class="d-flex flex-row col-md-12 ml-4 mt-3 font-open-sans">
              <small>Created by </small>
              <small class="ml-auto text-bold"
                ><b>{{ Admin.first_name }} </b></small
              >
            </span>
            <span class="d-flex flex-row col-md-12 ml-4  mt-3 font-open-sans">
              <small>Date Created </small>
              <small class="ml-auto text-bold"
                ><b>{{ $moment(Group.created_at) }} </b></small
              >
            </span>
            <p class="text-bold font-open-sans text-black ml-5 mt-4">Members</p>
            <div v-for="p in Users" class="col-md-12 ml-5">
              <div class="d-flex flex-row">
                <sla-avatar
                  v-if="p.image === null"
                  size="md"
                  :user="{ name: p.first_name }"
                />
                <sla-avatar v-else size="md" :user="{ image: p.image }" />
                <span class="m-3">
                  {{ p.first_name + " " + p.last_name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </d-row>
      <d-modal
        v-if="showParticipant"
        @close="showParticipant = false"
        size="lg"
      >
        <d-modal-header class="text-center" style="border: none!important;">
          <d-modal-title
            class="text-dark text-bold font-poppings w-100"
            style="margin: 0 30% 0 30% "
            >Invite Participants</d-modal-title
          >
        </d-modal-header>
        <d-modal-body>
          <d-row>
            <div v-for="p in paginatedData" class="col-lg-6 col-md-6 col-6 p-2">
              <d-row>
                <d-col md="8">
                  <div class="d-flex flex-row flex-grow-1">
                    <sla-avatar
                      v-if="p.image === null"
                      size="lg"
                      :user="{ name: p.first_name }"
                    />
                    <sla-avatar v-else size="lg" :user="{ image: p.image }" />
                    <span class="m-3">
                      {{ p.first_name + " " + p.last_name }}
                    </span>
                  </div>
                </d-col>
                <d-col md="4">
                  <sla-button
                    class="btn  "
                    size="sm "
                    text="INVITE"
                    type="filled"
                    @click="formData.users.push(p._id)"
                    v-if="!formData.users.includes(p._id)"
                  >
                  </sla-button>
                  <sla-button
                    class="btn "
                    size="sm "
                    style="background: #000000!important;"
                    text="UNINVITE"
                    type="filled"
                    @click="
                      formData.users.splice(formData.users.indexOf(p._id), 1)
                    "
                    v-if="formData.users.includes(p._id)"
                  >
                  </sla-button>
                </d-col>
              </d-row>
            </div>
          </d-row>
        </d-modal-body>
        <d-modal-footer style="border: none!important;">
          <div class="d-flex flex-column flex-grow-1">
            <div class="mx-auto m-3">
              {{ pageNumber + 1 }} of {{ pageCount }}
              <span
                ><icon
                  size="sm"
                  @click="prevPage"
                  style="transform: rotate(180deg);"
                  name="arrow-right"/>
                &nbsp; <icon size="sm" name="arrow-right" @click="nextPage"
              /></span>
            </div>
            <button
              @click="paginatedData.filter(addAll)"
              v-if="paginatedData.length !== formData.users.length"
              class="btn p-3 m-1 mx-auto col-md-5  btn-primary "
            >
              INVITE ALL
            </button>
            <button
              @click="paginatedData.filter(removeAll)"
              v-else
              class="btn p-3 m-1 mx-auto col-md-5  btn-primary "
              style="background: #000000!important;"
            >
              UNINVITE ALL
            </button>
          </div>
        </d-modal-footer>
      </d-modal>
    </d-container>
  </div>
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
      showParticipant: false,
      showCoach: false,
      isLoaded: false,
      modalStatus: false,
      pageNumber: 0,
      size: 10,
      error: {
        status: null,
        message: null
      },
      Group: undefined,
      Admin: undefined,
      Users: [],
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
      formData: { users: [] },
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
    ...mapActions("app/", ["getAllGroups", "getAllUsers"]),

    compareUsers: (arr1, arr2) => {
      let valuesA = arr1.reduce(function(a, c) {
        a[c._id] = c._id;
        return a;
      }, {});
      let valuesB = arr2.reduce(function(a, c) {
        a[c._id] = c._id;
        return a;
      }, {});
      let result = arr1
        .filter(function(c) {
          return !valuesB[c._id];
        })
        .concat(
          arr2.filter(function(c) {
            return !valuesA[c._id];
          })
        );
      return result;
    },
    nextPage() {
      if (this.pageNumber + 1 < this.pageCount) {
        this.pageNumber++;
      }
    },
    prevPage() {
      if (this.pageNumber !== 0) {
        this.pageNumber--;
      }
    },
    ...mapActions("app/", ["getAllUsers"]),
    addAll(user) {
      if (!this.formData.users.includes(user._id)) {
        return this.formData.users.push(user._id);
      }
    },
    removeAll(user) {
      if (this.formData.users.includes(user._id)) {
        return this.formData.users.splice(
          this.formData.users.indexOf(user._id),
          1
        );
      }
    },
    async handleInvite() {
      const self = this;
      self.formData.group = self.Group._id;
      let res = await axios
        .post(`${process.env.VUE_APP_API}/group/send-invite`, this.formData, {
          headers: {
            Authorization: `Bearer ${token} `
          }
        })
        .then(res => {
          self.buttons.isLoading = false;
          self.buttons.text = "Create Group";
          self.$toast.success(
            (self.error.message = res.data
              ? res.data.message
              : "An error occured")
          );
          setTimeout(function() {
            location.reload();
          }, 2000);
        })
        .catch(ex => {
          self.buttons.isLoading = false;
          self.buttons.text = "Create Group";
          self.$toast.error(
            (self.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
        });
    }
  },
  computed: {
    ...mapGetters({
      AllUsers: "app/getUsers"
      // maps courses to current computed resource
    }),
    pageCount() {
      let l = this.Users.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      let unInvitedUsers = this.compareUsers(this.AllUsers, this.Users);

      return unInvitedUsers.slice(start, end);
      // return this.Users.slice(start, end);
    }
  },
  mounted() {
    this.getAllUsers();
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
        self.Group = res.data.group;
        axios
          .get(`${process.env.VUE_APP_API}/admin/admins/` + self.Group.admin, {
            headers: {
              Authorization: `Bearer ${token} `
            }
          })
          .then(res => {
            self.Admin = res.data.data.admin;
          })
          .catch(ex => {});
        axios
          .get(
            `${process.env.VUE_APP_API}/group/` +
              self.Group._id +
              `/group-users`,
            {
              headers: {
                Authorization: `Bearer ${token} `
              }
            }
          )
          .then(res => {
            res.data.data.forEach(res => self.Users.push(res.user));
            self.isLoaded = true;
          })
          .catch(ex => {});
      })
      .catch(ex => {});
  }
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
