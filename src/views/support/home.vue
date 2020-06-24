<template>
  <d-container fluid>
    <div class="row">
      <div v-if="Tickets.length > 0" class="col">
        <table class="table mb-0 table-bordered table-responsive-xl ">
          <thead
            class="bg-white font-poppings"
            style="border: none!important; color: #999999"
          >
            <tr>
              <th scope="col" class="border-0">#</th>
              <th scope="col" class="border-0">Name</th>
              <th scope="col" class="border-0">Feedback</th>
              <th scope="col" class="border-0">Date</th>
              <th scope="col" class="border-0">Resolved</th>
              <!-- <th scope="col" class="border-0">Action</th> -->
              <th scope="col" class="border-0">Indicator Number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ticket, idx) in Tickets" :key="idx">
              <td class="p-4">{{ (idx += 1) }}</td>
              <td
                class="p-4"
                v-if="ticket.user !== null && ticket.user !== undefined"
              >
                {{ ticket.user.first_name + " " + ticket.user.last_name }}
              </td>
              <td
                class="p-4"
                v-if="ticket.coach !== null && ticket.coach !== undefined"
              >
                {{ ticket.coach.first_name + " " + ticket.coach.last_name }}
              </td>
              <td class="p-4">{{ ticket.feedback }}</td>
              <td class="p-4">{{ getDateFormat(ticket.createdAt) }}</td>
              <td colspan="0">
                <input
                  class="form-check mx-auto "
                  type="checkbox"
                  disabled
                  :checked="ticket.isResolved"
                  style="height: 40px"
                />
              </td>
              <!-- <td class="text-center">
                <icon name="arrow-back" class="m-1" size="xs" />
                <icon
                  name="message"
                  :class="!ticket.isResolved ? 'p1 m-1' : 'm-1'"
                  size="lg"
                  :data-count="!ticket.isResolved ? 1 : ''"
                  @click="
                    $router.push({
                      name: 'single-ticket',
                      params: { singleTicket: ticket }
                    })
                  "
                />
              </td> -->
              <td class="p-4">{{ ticket.indicator_num }}</td>
            </tr>
          </tbody>
        </table>
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
  font-weight: bold;
}
</style>
