<template>
  <div>
    <beat-loader
      class="loader m-3 centered "
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="4000"
      :closeable="false"
    ></Toasts>
    <d-container fluid v-if="isLoaded">
      <top heading="Assing Participants" />
      <d-row>
        <div
          class="col-md-3 col-lg-3 col-4"
          v-for="(p, idx) in getUsers"
          :key="idx"
        >
          <div class=" d-flex flex-row flex-grow-1 m-3">
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
          <sla-button
            class="btn mt-auto "
            size="sm "
            :text="buttons[idx].text"
            type="filled"
            @click="inviteUser(p._id, idx)"
            :disabled="buttons[idx].isLoading"
          >
          </sla-button>
        </div>
      </d-row>
    </d-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store/index";
const token = store.state.auth.token;
export default {
  name: "home",
  data() {
    return {
      error: {
        status: null,
        message: null
      },
      user: null,
      isLoaded: false,
      buttons: []
    };
  },
  computed: {
    ...mapGetters({
      Users: "app/getUsers"
      // maps courses to current computed resource
    }),
    getUsers() {
      let user = [];
      const self = this;
      this.Users.forEach(res => {
        self.buttons.push({ text: "INVITE", isLoading: false });
        user.push(res);
      });
      let result = this.compareUsers(user, this.user.assignees);

      return result;
    }
  },
  methods: {
    ...mapActions("app/", ["getAllUsers"]),
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
    async inviteUser(assignee, index) {
      this.buttons[index].text = "Inviting...";
      this.buttons[index].isLoading = true;
      const self = this;
      let res = await axios
        .post(
          `${process.env.VUE_APP_API}/admin/coach/assign`,
          {
            user: assignee,
            coach: self.$route.params.id
          },
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          self.buttons[index].isLoading = false;
          self.buttons[index].text = "INVITE";
          self.$toast.success(
            (self.error.message = res.data
              ? res.data.message
              : "An error occured")
          );
          setTimeout(function() {
            self.$router.go(-1);
          }, 2000);
        })
        .catch(ex => {
          self.buttons[index].isLoading = false;
          self.buttons[index].text = "INVITE";
          self.$toast.error(
            (self.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
        });
    }

    //vuex call to get all courses
  },
  mounted() {
    this.getAllUsers();
    const self = this;
    let res = axios
      .get(`${process.env.VUE_APP_API}/admin/coach/` + self.$route.params.id, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        self.user = res.data.data;
        self.isLoaded = true;
      })
      .catch();
  },
  components: {
    SlaAvatar: () => import("@/components/avatar"),
    Icon: () => import("@/components/SlaIcon"),
    Top: () => import("@/components/top"),
    SlaButton: () => import("@/components/SlaButton")
  }
};
</script>

<style scoped>
.avatar {
  display: inline-block !important;
}
</style>
