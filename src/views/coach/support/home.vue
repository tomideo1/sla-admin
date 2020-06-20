<template>
  <d-container class="main-content-container px-4 py-4 " fluid>
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="4000"
      :closeable="false"
    ></Toasts>
    <div class="row ">
      <div class="col-md-8  p-4 ">
        <h3 class="font-poppins text-black text-bold">Help</h3>

        <div class="form-group">
          <label class="text-grey font-open-sans"> Feedback / Complain </label>
          <d-textarea rows="10" v-model="feedback"> </d-textarea>
        </div>
        <sla-button
          type="filled"
          size="md"
          :text="text"
          @click="submitTicket"
          :disabled="isLoading"
          class="btn col-md-4 float-right "
        />
      </div>
      <div
        class="col-md-4 border-left p-4"
        style="max-height:100vh; overflow-y:auto"
      >
        <div v-if="Tickets.length > 0" class="col">
          <h5 class="font-poppins text-black text-bold mb-3">My Tickets</h5>

          <d-row class="m-3 ">
            <div
              class="m-3 border-bottom"
              v-for="(ticket, index) in Tickets"
              :key="index"
            >
              <h6 class="font-poppins text-grey" style="color: #999999;">
                {{ ticket.indicator_num }}
              </h6>
              <div style="border: 1px solid #E7E6E6;box-sizing: border-box;">
                <p class="font-open-sans text-dark m-3">
                  {{ ticket.feedback }}
                </p>
              </div>
              <div class="m-3" v-if="ticket.admin !== null">
                <h6 class="font-poppins text-grey" style="color: #999999;">
                  Response From Admin
                </h6>
                <div style="border: 1px solid #E7E6E6;box-sizing: border-box;">
                  <p class="font-open-sans text-dark m-3">
                    {{ ticket.response }}
                  </p>
                </div>
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
    Icon: () => import("@/components/SlaIcon"),
    SlaButton: () => import("@/components/SlaButton")
  },
  data() {
    return {
      feedback: "",
      isLoading: false,
      text: "SUBMIT TICKET",
      error: {
        message: "",
        data: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      Tickets: "app/getCoachTickets"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", ["getAllCoachTickets", "submitHelp"]),
    getDateFormat(date) {
      return this.$moment(date).format("YYYY/MM/DD");
    },
    async submitTicket() {
      this.isLoading = true;
      this.text = "loading....";
      let res = await this.submitHelp({
        feedback: this.feedback
      });
      if (res && res.status == 201) {
        this.isLoading = false;
        this.text = "SUBMIT TICKET";
        this.$toast.success(
          (this.error.message = res.data
            ? res.data.message
            : "An error occured")
        );
      } else {
        this.isLoading = false;
        this.text = "SUBMIT TICKET";
        this.$toast.error(
          (this.error.message = res.data
            ? res.data.message
            : "An error occured")
        );
      }
    }

    //vuex call to get all courses
  },
  async mounted() {
    await this.getAllCoachTickets();
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
