<template>
  <d-container fluid>
    <d-row>
      <div class="col-lg-12 col-md-12 col-12" v-if="Resources.length > 0">
        <h6 class="text-dark title text-capitalize m-1">
          Resources
        </h6>
        <div class="row">
          <div
            class="col-lg-6 col-md-6 col-12"
            v-for="(category, index) in Categories"
            :key="index"
          >
            <h6 class="font-poppings text-dark font-weight-bold">
              {{ category.name }}
            </h6>
            <d-row>
              <div
                class="col-md-8 col-lg-8 col-8 m-2 "
                v-for="(resource, idx) in Resources"
                :key="idx"
                v-if="
                  resource.category !== null &&
                    resource.category === category.name
                "
              >
                <resource
                  :header="resource.question"
                  :color="index % 2 == 0 ? '#0087DB;' : '#DAAA55;'"
                >
                  <p>{{ resource.answer }}</p>
                </resource>
              </div>
            </d-row>
          </div>
        </div>
      </div>
      <div v-else class="col-lg-12 col-md-12 col-12">
        <icon name="empty" class="m-3" size="retain" />
        <span
          class="font-poppings text-dark justify-content-center d-flex"
          style="font-size: 16px;"
          >You don’t have any Resources</span
        >
      </div>
    </d-row>
  </d-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import helper from "../../../helpers/helper";
export default {
  name: "home",
  data() {
    return {
      modalStatus: false,
      navigation: {
        title: [{ name: "Resources ", path: "/coach/resources" }]
      }
    };
  },
  components: {
    resource: () => import("@/components/resource"),
    Icon: () => import("@/components/SlaIcon"),
    deleteModal: () => import("@/components/deleteModal"),
    SlaButton: () => import("@/components/SlaButton"),
    NavMenu: () => import("@/components/NavMenu")
  },
  computed: {
    ...mapGetters({
      Resources: "app/getResources",
      Categories: "app/getResourceCategories"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", ["getAllResources", "getAllResourceCategories"]),
    deleteResource(id, Url) {
      return helper.handleDelete(id, Url, "/resources/all");
    }

    //vuex call to get all courses
  },
  async mounted() {
    this.getAllResources();
    this.getAllResourceCategories();
  }
};
</script>

<style scoped></style>
