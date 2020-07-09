<template>
  <d-container fluid class="main-content-container px-4 py-4 mt-4">
    <div v-show="notifications.length == 0 && !isLoaded">
      <beat-loader
        class="loader centered"
        :color="'#0087db'"
        :loading="true"
        :size="30"
        :sizeUnit="'px'"
      ></beat-loader>
    </div>
    <h5 class="text-black font-poppings font-weight-bold">Notifications</h5>
    <d-row no-gutters>
      <div class="col-md-8">
        <div v-show="notifications.length > 0 && isLoaded == true">
          <p class="heading text-bold font-poppings text-dark ">New</p>
          <noty
            :userName="notification.message.substring(0)"
            v-for="notification in this_week_notifications"
            :image="notification.image"
            :key="notification._id"
          >
            <span class="d-flex flex-row flex-grow-1 justify-content-start">
              <p class="mt-2  ">
                <b>
                  {{ notification.message }}
                </b>
                <small class=" ml-lg-3 ml-md-3 ml-0 ">{{
                  notification.createdAt | moment("from")
                }}</small>
              </p>
            </span>
          </noty>
          <div class="col" v-if="this_week_notifications.length === 0">
            <icon name="empty" class="m-3" size="retain" />
            <span
              class="font-poppings text-dark text-center mx-auto  justify-content-center d-flex"
              style="font-size: 16px;"
              >You don’t have any New Notifications</span
            >
            <p class="heading text-bold font-poppings text-dark ">Last Week</p>
            <noty
              :userName="notification.message.substring(0)"
              :image="notification.image"
              v-for="notification in last_week_notifications"
              :key="notification._id"
            >
              <span
                class="d-flex flex-row flex-grow-1 justify-content-lg-start"
              >
                <p class="mt-2  ">
                  <b>
                    {{ notification.message }}
                  </b>
                  <small class=" ml-lg-3 ml-md-3 ml-0 ">{{
                    notification.createdAt | moment("from")
                  }}</small>
                </p>
              </span>
            </noty>
          </div>
        </div>

        <!-- <p class="heading text-bold font-poppings text-dark ">Earlier</p> -->
      </div>

      <div class="col-md-8" v-show="notifications.length == 0 && isLoaded">
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark text-center mx-auto  justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any New Notifications</span
        >
      </div>
      <div class="col-md-4"></div>
    </d-row>
  </d-container>
</template>
<script>
import axios from "axios";
import store from "@/store/index";
import { BeatLoader } from "@saeris/vue-spinners";
import moment from "moment";
const token = store.state.auth.token;
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "notification",
  data() {
    return {
      isLoaded: false,
      notifications: [],
      this_week_notifications: [],
      last_week_notifications: [],
      others: []
    };
  },
  computed: {
    ...mapState("auth/", ["user"])
  },
  components: {
    Noty: () => import("@/components/slaNotyCard"),
    Icon: () => import("@/components/SlaIcon"),
    BeatLoader
  },
  methods: {},
  async mounted() {
    const self = this;
    let res = await axios
      .get(`${process.env.VUE_APP_API}/notification/admin/getAll`, {
        headers: {
          Authorization: `Bearer ${store.state.auth.token} `
        }
      })
      .then(res => {
        self.notifications = res.data.notifications;
        self.user.notificationCounter = 0;
        self.this_week_notifications = self.notifications.filter(notif => {
          let this_week = moment(notif.createdAt);
          let last_week = moment().subtract(1, "days");
          return this_week.isAfter(last_week);
        });
        self.last_week_notifications = self.notifications.filter(notif => {
          let this_week = moment(notif.createdAt);
          let last_week = moment().subtract(1, "days");
          return this_week.isBefore(last_week);
        });

        self.isLoaded = true;
      })
      .catch(ex => {
        console.log(ex.response.data);
      });
  }
};
</script>

<style>
.loader {
  margin: auto 0;
}
</style>
