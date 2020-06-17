<template>
  <d-container fluid>
    <d-row class=" mt-5">
      <div class="col-lg-12">
        <h6 class="text-dark title text-capitalize m-1">
          Alphabetical Order (A -Z)
        </h6>
        <carousel refs="content" v-if="getPolls.length > 0">
          <div class="scroll m-2" v-for="(poll, idx) in getPolls" :key="idx">
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  poll.cover_image +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
              @click="
                $router.push({
                  path: 'single/' + poll._id
                })
              "
            >
            </d-card>
            <div
              style=" max-width: 200px;!important; word-wrap: break-word!important;"
            >
              <p
                class="title-card  text-capitalize mt-2  text-bold font-open-sans "
              >
                {{ poll.title }}
              </p>
            </div>

            <p class=" text-capitalize mt-n4  " style="color: #999999;">
              <!--              {{ announcement.category.name }}-->
            </p>
          </div>
        </carousel>
        <div v-else class="col">
          <icon name="empty" class="m-3" size="retain" />
          <span
            class="font-poppings text-dark justify-content-center d-flex"
            style="font-size: 16px;"
            >You don’t have any Saved Polls</span
          >
        </div>
      </div>
    </d-row>
    <!-- Page Header -->
    <!-- Using the slider component -->
    <!-- slideritem wrapped package with the components you need -->
  </d-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store/index";
import helper from "@/helpers/helper";
export default {
  name: "polls-home",
  data() {
    return {
      ref_data: "content"
    };
  },
  computed: {
    ...mapGetters({
      Polls: "app/getPolls"
      // maps courses to current computed resource
    }),
    getPolls() {
      return this.Polls.filter(res => res.status === "save");
    }
  },
  methods: {
    ...mapActions("app/", ["getAllPolls"])

    //vuex call to get all courses
  },
  async mounted() {
    this.getAllPolls();
  },
  components: {
    Carousel: () => import("@/components/carousel"),
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped lang="css">
.title-card {
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.15px;

  color: #333333;
}
</style>
