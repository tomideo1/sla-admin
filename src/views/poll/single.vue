<template>
  <div>
    <beat-loader
      class="loader m-3 centered"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <d-container fluid class="main-content-container px-4" v-if="isLoaded">
      <top :heading="Polls.title" />
      <h4 class="m-3 text-bold font-poppings text-black">
        {{ Polls.responses }} responses
      </h4>
      <d-card class=" col-md-6 col-12 col-lg-6 ">
        <d-card-header class="text-black font-open-sans border-bottom">
          {{ Polls.question }}
        </d-card-header>
        <d-card-body>
          <GChart type="PieChart" :data="chartData" :options="chartOptions" />
        </d-card-body>
      </d-card>
      <footer class="border-top m-5 ">
        <sla-button
          class="btn  m-3  text-uppercase float-right"
          :text="'EXPORT'"
          type="filled"
          size="sm"
        />

        <p
          class="font-open-sans float-right m-4"
          style="color:#0087DB; cursor: pointer; font-size: 14px;"
          @click="$router.push('/polls/edit/' + Polls._id)"
        >
          EDIT
        </p>
        <p
          class="font-open-sans float-right m-4"
          style="color: #FF4133; cursor: pointer; font-size: 14px;"
          @click="modalStatus = true"
        >
          DELETE POLL
        </p>
      </footer>
      <d-modal v-if="modalStatus" @close="modalStatus = false" size="lg">
        <div style="border-top: 4px solid #0087DB;" class="modal-header"></div>
        <h6 class="text-center m-2 text-bold text-dark font-poppings">
          Are you sure you want to delete this polls?
        </h6>
        <d-modal-body>
          <div class="text-center">
            <sla-button
              class="m-2 col-md-12"
              type="filled"
              size="md"
              text="YES, DELETE"
              @click="handleDelete(Polls._id)"
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
    </d-container>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import axios from "axios";
import store from "@/store/index";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "single-poll",
  data() {
    return {
      isLoaded: false,
      modalStatus: false,
      chartData: [["value", "count"]],
      chartOptions: {
        chart: {
          width: 800,
          height: 800,
          legend: { position: "top", maxLines: 3 },
          bar: { groupWidth: "75%" }
        }
      },
      Polls: undefined
    };
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    Top: () => import("@/components/top"),
    SlaButton: () => import("@/components/SlaButton"),
    GChart
  },
  methods: {
    ...mapActions("app/", ["deletePoll"]),
    async handleDelete(id) {
      let res = await this.deletePoll({
        id: id
      });
      if (res) {
        this.$toast.success("announcement deleted successfully");
        this.$router.go(-1);
      } else {
        this.$toast.error("something went wrong ");
      }
    }
  },
  async mounted() {
    const self = this;
    const token = store.state.auth.token;
    await axios
      .get(`${process.env.VUE_APP_API}/poll/get/` + self.$route.params.id, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        self.Polls = res.data.data.poll;
        self.isLoaded = true;
        self.Polls.options.forEach(data => {
          self.chartData.push([data.value, data.count]);
        });
        self.Polls.responses = self.Polls.options.reduce(
          (accum, item) => accum + item.count,
          0
        );
      })
      .catch(ex => {});
  }
};
</script>

<style scoped>
.btn-primary {
  background-color: #0087db !important;
}
.btn-outline-primary {
  border-color: #0087db !important;
}
</style>
