<template>
  <d-container fluid>
    <div class="row">
      <div class="col-md-8">
        <d-row>
          <div class="col-md-7 col-lg-7 col-12">
            <d-form-row class="p-4 mt-4">
              <div class="form-group col-md-8 col-lg-8 col-12">
                <label class="text-grey"> Feedback</label>
                <d-form-textarea
                  rows="5"
                  v-model="feedback"
                  placeholder="feedback"
                  :readonly="true"
                >
                </d-form-textarea>
              </div>
            </d-form-row>
            <!-- <div>
              <sla-button
                type="filled"
                class="btn col-md-6 m-2"
                size="md"
                :disabled="button.isLoading"
                :text="button.text"
                @click="handleSubmit"
              />
            </div> -->
          </div>
        </d-row>
      </div>
      <div class="col-md-4">
        <div v-if="Tickets.length < 1" class="col"></div>
        <div v-else class="col">
          <icon name="empty" class="m-3" size="retain" />
          <span
            class="font-poppings text-dark justify-content-center d-flex"
            style="font-size: 16px;"
            >You don’t have any ticket</span
          >
        </div>
      </div>
    </div>
  </d-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store/index";
export default {
  name: "home",
  components: {
    Icon: () => import("@/components/SlaIcon")
  },
  data() {
    return {
      feedback: ""
    };
  },
  computed: {
    ...mapGetters({
      Tickets: "app/getTickets"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", ["getAllTickets"]),
    getDateFormat(date) {
      return this.$moment(date).format("YYYY/MM/DD");
    }

    //vuex call to get all courses
  },
  async mounted() {
    this.getAllTickets();
  }
};
</script>

<style scoped>
.p1[data-count]:after {
  position: relative;
  right: 15%;
  top: -20%;
  content: attr(data-count);
  width: 15px;
  height: 15px;
  font-size: 40%;
  padding: 0.2em;
  border-radius: 50%;
  line-height: 1em;
  color: white;
  background: red;
  text-align: center;
  z-index: 1;
  //font-weight:bold;
}
</style>
