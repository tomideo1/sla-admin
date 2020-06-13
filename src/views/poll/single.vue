<template>
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
      <sla-button
        class="btn  m-3  text-uppercase float-right"
        :text="'CLOSE POLL'"
        type="outline"
        size="sm"
      />
      <p
        class="font-open-sans float-right m-4"
        style="color:#0087DB; cursor: pointer; font-size: 14px;"
        @click="$router.push('/poll/edit/' + Polls._id)"
      >
        EDIT
      </p>
      <p
        class="font-open-sans float-right m-4"
        style="color: #FF4133; cursor: pointer; font-size: 14px;"
        @click="deleteModal = true"
      >
        DELETE POLL
      </p>
    </footer>
  </d-container>
</template>

<script>
import { GChart } from "vue-google-charts";
import axios from "axios";
import store from "@/store/index";
export default {
  name: "single-poll",
  data() {
    return {
      isLoaded: false,
      deleteModal: false,
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
  mounted() {
    const self = this;
    const token = store.state.auth.token;
    axios
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
