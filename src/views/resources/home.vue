<template>
  <d-container fluid>
    <d-row>
      <div class="col-lg-6 col-md-6 col-12">
        <h6 class="font-poppings text-grey font-weight-bold">Program</h6>
        <d-row>
          <div
            class="col-md-10 m-3"
            v-for="(resource, idx) in Resources"
            :key="idx"
          >
            <resource :header="resource.question" color="#0087DB;">
              <p>{{ resource.answer }}</p>
              <icon name="pencil" size="xs" class="float-right m-2" />
              <icon name="bin" size="xs" class="float-right m-2" />
            </resource>
          </div>
        </d-row>
      </div>
      <!--      <div class="col-lg-6 col-md-6 col-12">-->
      <!--        <h6 class="font-poppings text-grey font-weight-bold">Application</h6>-->
      <!--        <d-row>-->
      <!--          <div class="col-md-10 m-3" v-for="i in 3">-->
      <!--            <resource header="How long is the program? " color="#DAAA55;">-->
      <!--              <p>All our programs last 6 months, typically between 24 weeks.</p>-->
      <!--              <icon name="pencil" size="xs" class="float-right m-2" />-->
      <!--              <icon name="bin" size="xs" class="float-right m-2" />-->
      <!--            </resource>-->
      <!--          </div>-->
      <!--        </d-row>-->
      <!--      </div>-->
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
      Resources: "app/getResources"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", ["getAllResources"])

    //vuex call to get all courses
  },
  async mounted() {
    this.getAllResources();
  }
};
</script>

<style scoped></style>
