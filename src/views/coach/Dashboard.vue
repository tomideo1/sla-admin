<template>
  <div>
    <beat-loader
      class="loader centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <d-container fluid class="main-content-container " v-if="isLoaded">
      <!-- Page Header -->
      <d-row no-gutters class="page-header py-4 my-4">
        <div class="col-md-10">
          <d-col col sm="12" class="text-center text-sm-left mb-4 mb-sm-0">
            <h3 class="page-title font-poppings text-black">Dashboard</h3>
          </d-col>
          <d-col col sm="4" class="float-left  mt-5 text-sm-left mb-4 mb-sm-0">
            <h5 class=" font-poppings text-black">Announcement</h5>
            <div
              v-for="(announcement, index) in individual_announcement"
              :key="index"
            ></div>
          </d-col>
        </div>
        <div class="col-md-2">
          <h5 class=" font-poppings text-black">Your Groups</h5>
          <div v-for="group in Groups">
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  group.cover_image +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
              @click="$router.push({ path: 'edit/' + group._id })"
            >
            </d-card>
            <div
              style=" max-width: 200px;!important; word-wrap: break-word!important;"
            >
              <p
                class="title-card text-truncate text-capitalize mt-2  text-bold font-open-sans "
              >
                {{ group.title }}
              </p>
            </div>

            <p class=" text-capitalize mt-n4  " style="color: #999999;">
              <!--              {{ announcement.category.name }}-->
            </p>
          </div>
        </div>
      </d-row>
    </d-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store/index";
export default {
  name: "Dashboard",
  data() {
    return {
      individual_announcement: [],
      isLoaded: false
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      Groups: "app/getGroups",
      announcements: "app/getAnnouncements"
    })
  },
  methods: {
    ...mapActions("app/", [
      "getAllGroups",
      "getAllAnnouncements",
      "getAnnouncementDetails"
    ])
  },
  async mounted() {
    await this.getAllGroups();
    await this.getAllAnnouncements();
    const self = this;
    this.announcements.forEach(res => {
      let data = this.getAnnouncementDetails({ id: res._id });
      self.individual_announcement.push(data);
    });
    self.isLoaded = true;
  }
};
</script>

<style lang="css" scoped>
hr.style1 {
  border-top: 1px solid #ababab !important;
}
.card-number {
  font-weight: 300;
  font-size: 30px;
}
.legend_circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.legend_block > span,
.legend_block > p {
  display: inline-block;
}
.shadow-effect {
  box-shadow: 0px 1px 13px rgba(0, 135, 219, 0.62);
  border-radius: 5px;
}

.selected {
  background: rgba(0, 135, 219, 0.04);
  border-radius: 0px 50px 50px 0px;
  width: 100%;
  padding: 2px;
}

.scorecard-selected {
  background-color: #e7e6e6;
  opacity: 0.6;
}
.btn-primary {
  background: rgba(0, 135, 219, 0.16) !important;
  border: none;
}
.btn-warning {
  background: #ffdea3 !important;
}
</style>
