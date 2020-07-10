<template>
  <d-container fluid>
    <d-row>
      <div class="col-lg-12 col-md-12 col-12" v-if="Resources.length > 0">
        <div class="row">
          <div
            class="col-lg-6 col-md-6 col-12"
            v-for="(category, index) in Categories"
            :key="index"
            v-if="checkContains(category.name)"
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
                  <icon
                    name="pencil"
                    size="xs"
                    class="float-right m-2"
                    @click="$router.push({ path: 'single/' + resource._id })"
                  />
                  <icon
                    name="bin"
                    size="xs"
                    class="float-right m-2"
                    @click="modalStatus = true"
                  />
                </resource>
                <d-modal
                  v-if="modalStatus"
                  @close="modalStatus = false"
                  size="lg"
                >
                  <div
                    style="border-top: 4px solid #0087DB;"
                    class="modal-header"
                  ></div>
                  <h6 class="text-center m-2 text-bold text-dark font-poppings">
                    Are you sure you want to delete this resource?
                  </h6>
                  <d-modal-body>
                    <div class="text-center">
                      <sla-button
                        class="m-2 col-md-12"
                        type="filled"
                        size="md"
                        text="YES, DELETE"
                        @click="handleDelete(resource._id)"
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
import helper from "@/helpers/helper";
export default {
  name: "home",
  data() {
    return {
      modalStatus: false
    };
  },
  components: {
    resource: () => import("@/components/resource"),
    Icon: () => import("@/components/SlaIcon"),
    deleteModal: () => import("@/components/deleteModal"),
    SlaButton: () => import("@/components/SlaButton")
  },
  computed: {
    ...mapGetters({
      Resources: "app/getResources",
      Categories: "app/getResourceCategories"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", [
      "getAllResources",
      "getAllResourceCategories",
      "deleteResource"
    ]),
    checkContains(name) {
      var found = this.Resources.filter(function(resource) {
        return resource.category === name;
      });
      if (found.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    async handleDelete(id) {
      let res = await this.deleteResource({
        id: id
      });
      if (res) {
        this.$toast.success("resource deleted successfully");
        this.$router.go(-1);
      } else {
        this.$toast.error("something went wrong ");
      }
    }

    //vuex call to get all courses
  },
  async mounted() {
    await this.getAllResources();
    await this.getAllResourceCategories();
  }
};
</script>

<style scoped></style>
