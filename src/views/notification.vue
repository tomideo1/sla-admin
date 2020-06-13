<template>
  <d-container fluid class="main-content-container px-4 py-4 mt-4">
    <h5 class="text-black font-poppings font-weight-bold">Notifications</h5>
    <d-row no-gutters>
      <div class="col-md-8">
        <div v-show="notifications.length > 0 && isLoaded == true">
          <p class="heading text-bold font-poppings text-dark ">New</p>
          <noty
            :userName="notification.message.substring(0)"
            v-for="notification in this_week_notifications"
            :key="notification._id"
          >
            <span class="d-flex flex-row flex-grow-1 justify-content-lg-start">
              <p class="mt-2">
                <b>
                  {{ notification.message }}
                </b>
                <small class="  ml-3 ">{{
                  notification.createdAt | moment("from")
                }}</small>
              </p>
              <d-card
                class="ml-auto"
                :style="
                  'width:56px!important;height: 56px!important;' +
                    'backgroundImage:url(' +
                    notification.image +
                    ');' +
                    ' background-size:cover; background-position:center'
                "
              >
              </d-card>
            </span>
          </noty>
          <p class="heading text-bold font-poppings text-dark ">Last Week</p>
          <noty
            :userName="notification.message.substring(0)"
            v-for="notification in last_week_notifications"
            :key="notification._id"
          >
            <span class="d-flex flex-row flex-grow-1 justify-content-lg-start">
              <p class="mt-2">
                <b>
                  {{ notification.message }}
                </b>
                <small class="  ml-3 ">{{
                  notification.createdAt | moment("from")
                }}</small>
              </p>
              <d-card
                class="ml-auto"
                :style="
                  'width:56px!important;height: 56px!important;' +
                    'backgroundImage:url(' +
                    'https://res.cloudinary.com/dwpu7jpku/image/upload/v1584548572/auth-bg_i6msdh.png' +
                    ');' +
                    ' background-size:cover; background-position:center'
                "
              >
              </d-card>
            </span>
          </noty>

          <!-- <p class="heading text-bold font-poppings text-dark ">Earlier</p> -->
        </div>
        <div v-show="notifications.length == 0 && !isLoaded" class="col">
          <beat-loader
            class="loader"
            :color="'#0087db'"
            :loading="true"
            :size="'30'"
            :sizeUnit="'px'"
          ></beat-loader>
        </div>
        <div v-show="notifications.length == 0 && isLoaded" class="col">
          <span
            class="font-poppings text-dark justify-content-center d-flex"
            style="font-size: 16px;"
          >
            You don’t have any notification
            <icon name="empty" class="m-3" size="retain" />
          </span>
        </div>
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
  components: {
    Noty: () => import("@/components/slaNotyCard"),
    Icon: () => import("@/components/SlaIcon"),
    BeatLoader
  },
  methods: {},
  async mounted() {
    const self = this;
    let res = axios
      .get(`${process.env.VUE_APP_API}/notification/admin/getAll?page=371`, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        self.notifications = res.data.notifications.slice(
          Math.max(res.data.notifications.length - 10, 0)
        );
        self.this_week_notifications = self.notifications.filter(notif => {
          var this_week = moment(notif.createdAt);
          var last_week = moment().subtract(1, "days");
          return this_week.isAfter(last_week);
        });
        self.last_week_notifications = self.notifications.filter(notif => {
          var this_week = moment(notif.createdAt);
          var last_week = moment().subtract(1, "days");
          return this_week.isBefore(last_week);
        });

        self.isLoaded = true;
      })
      .catch();
  }
};
</script>

<style>
.loader {
  margin: auto 0;
}
</style>
