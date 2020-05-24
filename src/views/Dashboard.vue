<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4 my-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title font-poppings text-dark">Dashboard</h3>
      </d-col>
    </d-row>
    <d-row>
      <d-col class="mt-3">
        <div class="row ">
          <hr class="style1 col-md-4" />
          <h5 class="font-poppings text-bold mx-auto title text-dark">
            Overview
          </h5>
          <hr class="style1 col-md-4" />
        </div>
        <div class="row mt-3">
          <div class="col-md-2 m-3 m-md-2 m-lg-3">
            <d-card
              style="border-left:7px solid #0087DB; max-height:100px;border-radius: 0"
            >
              <p class="font-poppings text-dark m-2">Users</p>
              <p class="card-number  text-center">
                100
              </p>
            </d-card>
          </div>
          <div class="col-md-2 m-3 m-md-2 m-lg-3">
            <d-card
              style="border-left:7px solid #DAAA55; max-height:100px;border-radius: 0"
            >
              <p class="font-poppings text-dark m-2">Engagements</p>
              <p class="card-number  text-center">
                23.6K
              </p>
            </d-card>
          </div>
          <div class="col-md-2 m-3 m-md-2 m-lg-3">
            <d-card
              style="border-left:7px solid #F77253; max-height:100px;border-radius: 0"
            >
              <p class="font-poppings text-dark m-2">Messages Sent</p>
              <p class="card-number  text-center">
                30K
              </p>
            </d-card>
          </div>
          <div class="col-md-2 m-3 m-md-2 m-lg-3">
            <d-card
              style="border-left:7px solid  #1F497D;max-height:100px; border-radius: 0"
            >
              <p class="font-poppings truncate-2 text-dark m-2">
                Courses Completed
              </p>
              <p class="card-number  text-center">
                22
              </p>
            </d-card>
          </div>
          <div class="col-md-2 m-3 m-md-1  m-lg-3">
            <d-card
              style="border-left:7px solid   #8D5524;max-height:100px;  border-radius: 0"
            >
              <p class="font-poppings text-dark m-2">
                Courses in Progress
              </p>
              <p class="card-number  text-center">
                5
              </p>
            </d-card>
          </div>
        </div>
      </d-col>
    </d-row>
    <d-row no-gutters>
      <d-card
        class=" col-md-6 col-12  col-lg-6 "
        style="border-radius:0!important;"
      >
        <p class="text-black font-poppings  m-3">
          Login Activities
        </p>
        <GChart
          type="ColumnChart"
          :data="loginChartData"
          :options="loginChartOptions"
        />
        <div class="d-flex flex-row mx-auto">
          <div class="legend_block m-1">
            <span>
              <div
                class="legend_circle mr-1 "
                style="background-color: #DAAA55;"
              ></div>
            </span>
            <p>Coaches</p>
          </div>
          <div class="legend_block m-1">
            <span>
              <div
                class="legend_circle mr-1 "
                style="background-color: #0087DB;"
              ></div>
            </span>
            <p>Users</p>
          </div>
        </div>
      </d-card>
      <!--        <d-card-->
      <!--          class=" col-md-6 col-12 m-4 col-lg-5 "-->
      <!--          style="border-radius:0!important;"-->
      <!--        >-->
      <!--          <p class="text-black font-poppings  m-3">-->
      <!--            Heat Map of Popular Times-->
      <!--          </p>-->
      <!--          <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />-->
      <!--        </d-card>-->
    </d-row>
  </d-container>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "Dashboard",
  components: {
    GChart
  },
  data() {
    return {
      loginChartData: [
        ["Year", "Coaches", "Users"],
        ["Dec", 20, 20],
        ["Nov", 10, 10],
        ["Oct", 30, 40],
        ["Sept", 40, 45],
        ["Aug", 50, 22],
        ["Jul", 60, 40]
      ],
      loginChartOptions: {
        legend: {
          position: "none",
          maxLines: 3,
          fontName: "open-sans",
          fontSize: 10
        },
        bar: { groupWidth: "40%" },
        height: 200,
        isStacked: true,
        colors: ["#0087DB", "#DAAA55"],
        fontName: "open-sans",
        fontSize: 12,
        chartArea: { width: "80%", height: "80%" }
      }
    };
  },
  methods: {},
  computed: {}
};
</script>

<style lang="css" scoped>
hr.style1 {
  border-top: 1px solid #ababab !important;
}
.card-number {
  font-weight: 300;
  font-size: 30px;
}
.legend_circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.legend_block > span,
.legend_block > p {
  display: inline-block;
}
</style>
