<template>
  <d-container fluid class="main-content-container ">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4 my-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title font-poppings text-dark">Dashboard</h3>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import { GChart } from "vue-google-charts";
import VueApexCharts from "vue-apexcharts";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store/index";
import moment from "moment";
export default {
  name: "Dashboard",
  components: {
    GChart,
    apexchart: VueApexCharts,
    SlaAvatar: () => import("@/components/avatar"),
    SlaButton: () => import("@/components/SlaButton")
  },
  data() {
    return {
      loginChartData: [["Year", "Users", "Coaches"]],
      loginChartOptions: {
        legend: {
          position: "none",
          maxLines: 3,
          fontName: "open-sans",
          fontSize: 10
        },
        bar: { groupWidth: "40%" },
        height: 200,
        isStacked: false,
        colors: ["#0087DB", "#DAAA55"],
        fontName: "open-sans",
        fontSize: 12,
        chartArea: { width: "80%", height: "80%" }
      },
      loginChartLegends: [
        {
          name: "Users",
          color: "#0087DB"
        },
        {
          name: "Coaches",
          color: "#DAAA55"
        }
      ],
      options: {
        chart: {
          type: "heatmap",
          id: "vue-heat-map",
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#008FFB"]
      },
      series: [],

      timeChartData: [
        ["Day", "Announcement", "Polls", "surveys", "Courses"],
        ["Sun", 20, 20, 20, 33],
        ["Mon", 10, 10, 45, 56],
        ["Tue", 30, 40, 22, 47],
        ["Wed", 40, 45, 39, 99],
        ["Thur", 50, 22, 15, 25],
        ["Fri", 60, 40, 11, 28],
        ["Sat", 87, 23, 19, 49]
      ],
      timeChartOptions: {
        legend: {
          position: "none",
          maxLines: 3,
          fontName: "open-sans",
          fontSize: 10
        },
        bar: { groupWidth: "40%" },
        height: 200,
        isStacked: true,
        colors: ["#0087DB", "#DAAA55", "#F77253", "#1F497D"],
        fontName: "open-sans",
        fontSize: 12,
        chartArea: { width: "80%", height: "80%" }
      },
      timeChartLegends: [
        {
          name: "Announcement",
          times: "1h 45m",
          color: "#1F497D"
        },
        {
          name: "Polls",
          times: "1h 45m",
          color: "#F77253"
        },
        {
          name: "Surveys",
          times: "1h 45m",
          color: "#DAAA55"
        },
        {
          name: "Courses",
          times: "1h 45m",
          color: "#0087DB"
        }
      ],

      engagementChartData: [
        ["Day", "Announcement", "Polls", "surveys", "Courses"],
        ["Sun", 20, 20, 20, 33],
        ["Mon", 10, 10, 45, 56],
        ["Tue", 30, 40, 22, 47],
        ["Wed", 40, 45, 39, 99],
        ["Thur", 50, 22, 15, 25],
        ["Fri", 60, 40, 11, 28],
        ["Sat", 87, 23, 19, 49]
      ],
      engagementChartOptions: {
        legend: {
          position: "none",
          maxLines: 3,
          fontName: "open-sans",
          fontSize: 10
        },
        bar: { groupWidth: "40%" },
        height: 200,
        isStacked: true,
        colors: ["#0087DB", "#DAAA55", "#F77253", "#1F497D"],
        fontName: "open-sans",
        fontSize: 12,
        chartArea: { width: "80%", height: "80%" }
      },
      engagementChartLegends: [
        {
          name: "Clicks",
          color: "#1F497D"
        },
        {
          name: "Rections",
          color: "#F77253"
        },
        {
          name: "Comments",
          color: "#DAAA55"
        },
        {
          name: "Posts",
          color: "#0087DB"
        }
      ],

      postActivityChartData: [
        ["Day", "Announcement", "Polls", "surveys", "Courses"],
        ["Sun", 20, 20, 20, 33],
        ["Mon", 10, 10, 45, 56],
        ["Tue", 30, 40, 22, 47],
        ["Wed", 40, 45, 39, 99],
        ["Thur", 50, 22, 15, 25],
        ["Fri", 60, 40, 11, 28],
        ["Sat", 87, 23, 19, 49]
      ],
      postActivityChartOptions: {
        legend: {
          position: "none",
          maxLines: 3,
          fontName: "open-sans",
          fontSize: 10
        },
        bar: { groupWidth: "40%" },
        height: 200,
        isStacked: true,
        colors: ["#0087DB", "#DAAA55", "#F77253", "#1F497D"],
        fontName: "open-sans",
        fontSize: 12,
        chartArea: { width: "80%", height: "80%" }
      },
      postActivityChartLegends: [
        {
          name: "Announcement",
          color: "#1F497D"
        },
        {
          name: "Polls",
          color: "#F77253"
        },
        {
          name: "Surveys",
          color: "#DAAA55"
        },
        {
          name: "Courses",
          color: "#0087DB"
        }
      ],

      postInteractionsChartData: [
        ["Day", "Announcement", "Polls", "surveys", "Courses"],
        ["Sun", 20, 20, 20, 33],
        ["Mon", 10, 10, 45, 56],
        ["Tue", 30, 40, 22, 47],
        ["Wed", 40, 45, 39, 99],
        ["Thur", 50, 22, 15, 25],
        ["Fri", 60, 40, 11, 28],
        ["Sat", 87, 23, 19, 49]
      ],
      postInteractionsChartOptions: {
        legend: {
          position: "none",
          maxLines: 3,
          fontName: "open-sans",
          fontSize: 10
        },
        bar: { groupWidth: "40%" },
        height: 200,
        isStacked: true,
        colors: ["#0087DB", "#DAAA55", "#F77253", "#1F497D"],
        fontName: "open-sans",
        fontSize: 12,
        chartArea: { width: "80%", height: "80%" }
      },
      postInteractionsChartLegends: [
        {
          name: "Clicks",
          color: "#1F497D"
        },
        {
          name: "Rections",
          color: "#F77253"
        },
        {
          name: "Comments",
          color: "#DAAA55"
        },
        {
          name: "Share",
          color: "#0087DB"
        }
      ],

      postByDayChartData: [
        ["Days", "Engagements", "Impressions"],
        ["1", 30, 80],
        ["2", 30, 40],
        ["3", 60, 40],
        ["4", 70, 50],
        ["5", 40, 50],
        ["6", 45, 30],
        ["7", 10, 20],
        ["8", 10, 20],
        ["9", 10, 20],
        ["10", 20, 53],
        ["11", 10, 57],
        ["12", 76, 89],
        ["13", 42, 50],
        ["14", 39, 60],
        ["15", 30, 59],
        ["16", 40, 58],
        ["17", 50, 20],
        ["18", 10, 60],
        ["19", 70, 20],
        ["20", 10, 40]
      ],
      postByDayChartOptions: {
        legend: {
          position: "none",
          maxLines: 3,
          fontName: "open-sans",
          fontSize: 10
        },
        bar: { groupWidth: "20%" },
        height: 200,
        isStacked: false,
        colors: ["#0087DB", "#DAAA55", "#F77253", "#1F497D"],
        fontName: "open-sans",
        fontSize: 12,
        chartArea: { width: "80%", height: "80%" }
      },
      postByDayChartLegends: [
        {
          name: "Engagement",
          color: "#DAAA55"
        },
        {
          name: "Impressions",
          color: "#0087DB"
        }
      ],

      userActivityChartData: [
        ["Day", "Monthly", "weekly", "Daily"],
        ["Sun", 20, 20, 20],
        ["Mon", 10, 10, 45],
        ["Tue", 30, 40, 22],
        ["Wed", 40, 45, 39],
        ["Thur", 50, 22, 15],
        ["Fri", 60, 40, 11],
        ["Sat", 87, 23, 19]
      ],
      userActivityChartOptions: {
        legend: {
          position: "none",
          maxLines: 3,
          fontName: "open-sans",
          fontSize: 10
        },
        bar: { groupWidth: "40%" },
        height: 200,
        isStacked: true,
        colors: ["#0087DB", "#DAAA55", "#F77253", "#1F497D"],
        fontName: "open-sans",
        fontSize: 12,
        chartArea: { width: "80%", height: "80%" }
      },
      userActivityChartLegends: [
        {
          name: "Monthly",
          color: "#F77253"
        },
        {
          name: "Weekly",
          color: "#DAAA55"
        },
        {
          name: "Daily",
          color: "#0087DB"
        }
      ],

      userInteractionsChartData: [
        ["Time", "With Other Members", "With Posts"],
        ["Time", 20, 20],
        ["Time", 40, 20],
        ["Time", 100, 20],
        ["Time", 60, 202],
        ["Time", 40, 3],
        ["Time", 102, 34],
        ["Time", 40, 303],
        ["Time", 40, 2],
        ["Time", 120, 101]
      ],
      userInteractionsChartOptions: {
        legend: {
          position: "none",
          maxLines: 3,
          fontName: "open-sans",
          fontSize: 10
        },
        bar: { groupWidth: "40%" },
        height: 200,
        isStacked: true,
        colors: ["#0087DB", "#DAAA55", "#F77253", "#1F497D"],
        fontName: "open-sans",
        fontSize: 12,
        chartArea: { width: "80%", height: "80%" }
      },
      userInteractionsChartLegends: [
        {
          name: "With Other Members ",
          color: "#DAAA55"
        },
        {
          name: "With Posts",
          color: "#0087DB"
        }
      ],

      compareChartData: [
        ["Users", "Count"],
        ["active", 50],
        ["total", 20]
      ],
      compareChartOptions: {
        pieHole: 0.5,
        pieSliceTextStyle: {
          color: "black"
        },
        colors: ["#0087DB", "#E7E6E6"],
        legend: {
          position: "none"
        },
        chartArea: { right: 300, top: 0, width: "100%", height: "100%" }
      }
    };
  },
  methods: {
    ...mapActions("app/", ["getAllAnalysis"]),
    fetchPopularTimesData() {
      const self = this;
      let day = 0;
      // for (let i = 0; i < self.Dashboard.dailySessions.length; i++) {
      self.Dashboard.dailySessions.forEach(sessions => {
        self.series.push({
          name: day++,
          data: [{ x: sessions.count, y: sessions._id }]
        });
      });
      return self.series;
    }
  },
  computed: {
    ...mapGetters({
      Dashboard: "app/getAnalytics"
      // maps courses to current computed resource
    }),

    fetchLoginSessionData() {
      const self = this;
      for (let i = 0; i < self.Dashboard.monthlySessions.length; i++) {
        self.loginChartData[i + 1] = [
          self.Dashboard.monthlySessions[i].month,
          self.Dashboard.monthlySessions[i].count,
          0
        ];
      }
      return self.loginChartData;
    },

    fetchTopAnnouncements() {
      const self = this;
      let series = [];
      // for (let i = 0; i < self.Dashboard.dailySessions.length; i++) {
      self.Dashboard.topAnnoucement.forEach(sessions => {
        series.push(sessions);
      });
      return series;
    },

    fetchTopLocations() {
      const self = this;
      let series = [];
      // for (let i = 0; i < self.Dashboard.dailySessions.length; i++) {
      self.Dashboard.topLocations.sort(sessions => {
        series.push(sessions);
      });
      return series;
    },

    fetchTopCourses() {
      const self = this;
      let series = [];
      // for (let i = 0; i < self.Dashboard.dailySessions.length; i++) {
      self.Dashboard.topCourses.forEach(sessions => {
        series.push(sessions);
      });
      return series;
    },

    fetchTopUsers() {
      const self = this;
      let series = [];
      // for (let i = 0; i < self.Dashboard.dailySessions.length; i++) {
      return self.Dashboard.topUsers.sort((a, b) =>
        a.count > b.count ? -1 : 1
      );
    }
  },
  mounted() {
    this.getAllAnalysis();
    this.fetchPopularTimesData();
  }
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
.shadow-effect {
  box-shadow: 0px 1px 13px rgba(0, 135, 219, 0.62);
  border-radius: 5px;
}

.selected {
  background: rgba(0, 135, 219, 0.04);
  border-radius: 0px 50px 50px 0px;
  width: 100%;
  padding: 2px;
}

.scorecard-selected {
  background-color: #e7e6e6;
  opacity: 0.6;
}
.btn-primary {
  background: rgba(0, 135, 219, 0.16) !important;
  border: none;
}
.btn-warning {
  background: #ffdea3 !important;
}
</style>
