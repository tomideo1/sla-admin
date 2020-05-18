<template>
  <d-container fluid>
    <d-row class=" mt-5">
      <div class="col-lg-12 mt-3">
        <h6 class="text-dark title text-capitalize m-1">
          Alphabetical Order (A -Z)
        </h6>
        <carousel refs="content">
          <div class="scroll m-2" v-for="(group, idx) in Groups" :key="idx">
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  group.cover_image +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
            </d-card>
            <div
              style=" max-width: 200px;!important; word-wrap: break-word!important;"
            >
              <p
                class="title-card  text-capitalize mt-2  text-bold font-open-sans "
              >
                {{ group.title }}
              </p>
            </div>

            <p class=" text-capitalize mt-n4  " style="color: #999999;">
              <!--              {{ announcement.category.name }}-->
            </p>
          </div>
        </carousel>
      </div>
      <div class="col-lg-12 mt-3">
        <h6 class="text-dark title text-capitalize m-1">
          Categories
        </h6>
        <carousel refs="content">
          <div
            class="scroll m-2"
            v-for="(category, idx) in Categories"
            :key="idx"
          >
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  categoryImages[
                    Math.floor(Math.random() * categoryImages.length)
                  ] +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
              <p class="category-text text-uppercase mx-auto my-auto">
                {{ category.name }}
              </p>
            </d-card>
          </div>
        </carousel>
      </div>
      <div class="col-lg-12 mt-3 ">
        <h6 class="text-dark title text-capitalize m-1">
          Most Recent
        </h6>
        <carousel refs="content">
          <div class="scroll m-2" v-for="(group, idx) in Groups" :key="idx">
            <d-card
              :style="
                'width:200px!important;height: 120px!important;' +
                  'backgroundImage:url(' +
                  group.cover_image +
                  ');' +
                  ' background-size:cover; background-position:center'
              "
            >
            </d-card>
            <div
              style=" max-width: 200px;!important; word-wrap: break-word!important;"
            >
              <p
                class="title-card  text-capitalize mt-2  text-bold font-open-sans "
              >
                {{ group.title }}
              </p>
            </div>

            <p class=" text-capitalize mt-n4  " style="color: #999999;">
              <!--              {{ announcement.category.name }}-->
            </p>
          </div>
        </carousel>
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
export default {
  name: "polls-home",
  data() {
    return {
      ref_data: "content",
      categoryImages: [
        "https://res.cloudinary.com/dwpu7jpku/image/upload/v1589458917/Rectangle_309_fwpz7p.png",
        "https://res.cloudinary.com/dwpu7jpku/image/upload/v1589808813/Rectangle_529_apeq0b.png",
        "https://res.cloudinary.com/dwpu7jpku/image/upload/v1589808832/Rectangle_530_iw8pgd.png"
      ]
    };
  },
  computed: {
    ...mapGetters({
      Groups: "app/getGroups",
      Categories: "app/getCategories"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", ["getAllGroups", "getAllCategories"])

    //vuex call to get all courses
  },
  async mounted() {
    this.getAllGroups();
    this.getAllCategories();
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
.category-text {
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.15px;
  color: #ffffff;
}
</style>
