<template>
  <d-container class="main-content-container px-4 py-4 " fluid>
    <div class="row ">
      <div class="col-md-8  p-4 ">
        <h3 class="font-poppins text-black text-bold">Help</h3>

        <div class="form-group">
          <label class="text-grey font-open-sans"> Feedback / Complain </label>
          <d-textarea rows="10"> </d-textarea>
        </div>
      </div>
      <div class="col-md-4 border-left p-4">
        <div v-if="Tickets.length > 0" class="col">
          <h5 class="font-poppins text-black text-bold mb-3">My Tickets</h5>

          <d-row class="m-3 border-bottom">
            <div class="m-3">
              <h6 class="font-poppins text-grey" style="color: #999999;">
                344574
              </h6>
              <div style="border: 1px solid #E7E6E6;box-sizing: border-box;">
                <p class="font-open-sans text-dark m-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                  aliquam, purus sit amet luctus venenatis, lectus magna.
                </p>
              </div>
            </div>
            <div class="m-3">
              <h6 class="font-poppins text-grey" style="color: #999999;">
                Response From Admin
              </h6>
              <div style="border: 1px solid #E7E6E6;box-sizing: border-box;">
                <p class="font-open-sans text-dark m-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                  aliquam, purus sit amet luctus venenatis, lectus magna.
                </p>
              </div>
            </div>
          </d-row>
        </div>
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
    await this.getAllTickets();
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
}
</style>
