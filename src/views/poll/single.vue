<template>
  <d-container fluid class="main-content-container px-4">
    <top heading="AUDIO VS VIDEO " />
    <d-card>
      <d-card-title>
        Did you enjoy week zero (0) lesson?
      </d-card-title>
      <d-card-body>
        <chartist ratio="ct-chart" type="Pie" :data="chartData.series">
        </chartist>
      </d-card-body>
    </d-card>
  </d-container>
</template>

<script>
export default {
  name: "edit",
  data() {
    return {
      chartData: {
        series: [5, 3, 4]
      },
      chartOptions: {
        lineSmooth: false
      }
    };
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    Top: () => import("@/components/top")
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
