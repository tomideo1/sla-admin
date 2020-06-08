<template>
  <d-container fluid>
    <d-row>
      <div
        class="col-lg-12 col-md-12 col-12"
        v-for="(category, index) in Categories"
        :key="index"
      >
        <h6 class="font-poppings text-dark font-weight-bold">
          {{ category.name }}
        </h6>
        <d-row v-if="Resources.length > 0">
          <div
            class="col-md-3 col-lg-3 col-6 m-3"
            v-for="(resource, idx) in Resources"
            :key="idx"
            v-if="resource.category !== null"
          >
            <resource :header="resource.question" color="#0087DB;">
              <p>{{ resource.answer }}</p>
              <icon name="pencil" size="xs" class="float-right m-2" />
              <icon name="bin" size="xs" class="float-right m-2" />
            </resource>
          </div>
        </d-row>
        <div v-else class="col">
          <icon name="empty" class="m-3" size="retain" />
          <span
            class="font-poppings text-dark justify-content-center d-flex"
            style="font-size: 16px;"
            >You don’t have any Resources</span
          >
        </div>
      </div>
    </d-row>
  </d-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    resource: () => import("@/components/resource"),
    Icon: () => import("@/components/SlaIcon")
  },
  computed: {
    ...mapGetters({
      Resources: "app/getResources",
      Categories: "app/getResourceCategories"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", ["getAllResources", "getAllResourceCategories"])

    //vuex call to get all courses
  },
  async mounted() {
    this.getAllResources();
    this.getAllResourceCategories();
  }
};
</script>

<style scoped></style>
