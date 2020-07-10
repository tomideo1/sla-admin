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
      <top :heading="Survey.title" />

      <div class="mt-5 mb-3 d-block text-center mx-auto d-md-block d-lg-block">
        <div class=" d-lg-flex d-md-flex flex-row  flex-grow-1 ">
          <div>
            <div
              class="border-right p-3 m-1 d-none d-lg-block d-md-block"
            ></div>
          </div>
          <div class="m-1">
            <button
              @click="toggleResponse = false"
              :class="
                toggleResponse === false
                  ? 'btn btn-sm btn-primary'
                  : 'btn btn-sm btn-light'
              "
              style="border-radius: 10px;"
            >
              Summary Response
            </button>
            <button
              @click="toggleResponse = true"
              :class="
                toggleResponse === true
                  ? 'btn btn-sm btn-primary'
                  : 'btn btn-sm btn-light'
              "
              style="border-radius: 10px;"
            >
              Individual Response
            </button>
          </div>
        </div>
      </div>

      <div v-if="!toggleResponse">
        <h4 class="m-3 text-bold font-poppings text-black">
          {{ Survey.total_responses }} responses
        </h4>
        <div v-if="Survey.responses !== null || Survey.responses !== undefined">
          <div v-for="(response, idx) in Survey.responses" :key="idx">
            <d-card
              class=" col-md-6 col-12 col-lg-6  m-2"
              style="border:1px solid #E7E6E6; box-sizing:border-box; "
            >
              <d-card-header class="text-black font-open-sans border-bottom">
                {{ response._id }}
              </d-card-header>
              <d-card-body
                v-if="!response.response[0].has_option"
                style="max-height:200px; overflow-y:auto"
              >
                <div v-for="(answer, idx) in response.response" :key="idx">
                  <div
                    v-if="!answer.has_option"
                    class="m-2 p-2"
                    style="background:#F4F4F4;"
                  >
                    {{ answer.answers }}
                  </div>
                </div>
              </d-card-body>
              <d-card-body v-else>
                <GChart
                  type="PieChart"
                  :data="fetchChartData(response.response)"
                  :options="chartOptions"
                />
              </d-card-body>
            </d-card>
          </div>
        </div>
      </div>
      <div class="mx-auto m-3" v-else>
        {{ pageNumber + 1 }} of {{ pageCount }}
        <span
          ><icon
            size="sm"
            @click="prevPage"
            style="transform: rotate(180deg);"
            name="arrow-right"/>
          &nbsp; <icon size="sm" name="arrow-right" @click="nextPage"
        /></span>
        <div
          v-if="
            Survey.individualResponses !== null ||
              (Survey.individualResponses !== undefined &&
                data.has_option === false)
          "
        >
          <div v-for="(data, idx) in paginatedData" :key="idx">
            <h5
              class="text-black p-3 "
              v-if="
                data.user_details.length > 0 && data.user_details !== undefined
              "
            >
              {{ data.user_details[0].first_name }}
            </h5>
            <d-card
              v-for="(response, idx) in data.response"
              :key="idx"
              class=" col-md-6 col-12 col-lg-6  m-2"
              style="border:1px solid #E7E6E6; box-sizing:border-box; max-height:200px; overflow-y:auto"
            >
              <d-card-header class="text-black font-open-sans border-bottom">
                {{ response.question }}
              </d-card-header>
              <d-card-body v-if="!response.has_option">
                <div class="m-2 p-2">
                  {{ response.answers }}
                </div>
              </d-card-body>
              <d-card-body v-else>
                <div class="m-2 p-2">
                  <div class="form-check">
                    <div
                      class="form-check"
                      v-for="(option, idx) in response.options"
                      :key="idx"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        :checked="option === response.answers"
                      />
                      <label class="form-check-label" for="exampleRadios2">
                        {{ option }}
                      </label>
                    </div>
                  </div>
                </div>
              </d-card-body>
            </d-card>
          </div>
        </div>
      </div>
      <footer class="border-top m-5 ">
        <p
          class="font-open-sans float-right m-4"
          style="color:#0087DB; cursor: pointer; font-size: 14px;"
          @click="
            $router.push({
              path: '/surveys/edit/' + Survey._id
            })
          "
        >
          EDIT SURVEY
        </p>
        <p
          class="font-open-sans float-right m-4"
          style="color: #FF4133; cursor: pointer; font-size: 14px;"
          @click="deleteModal = true"
        >
          DELETE SURVEY
        </p>
      </footer>
      <d-modal-body>
        <div class="text-center">
          <sla-button
            class="m-2 col-md-12"
            type="filled"
            size="md"
            text="YES, DELETE"
            @click="deleteCourse(Survey._id, 'courses/admin/delete/')"
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
    </d-container>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import axios from "axios";
import store from "@/store/index";
import { mapGetters } from "vuex";
import { BeatLoader } from "@saeris/vue-spinners";
export default {
  name: "single-survey",
  data() {
    return {
      isLoaded: false,
      deleteModal: false,
      pageNumber: 0,
      toggleResponse: false,
      deleteModal: false,
      tabs: [{ name: "Summary Response" }, { name: "Individual Response" }],
      size: 1,
      chartData: [["value", "count"]],
      chartOptions: {
        chart: {
          width: 800,
          height: 800,
          legend: { position: "top", maxLines: 3 },
          bar: { groupWidth: "75%" }
        }
      },
      Survey: undefined
    };
  },
  components: {
    Icon: () => import("@/components/SlaIcon"),
    Top: () => import("@/components/top"),
    SlaButton: () => import("@/components/SlaButton"),
    GChart,
    BeatLoader
  },
  async mounted() {
    const self = this;
    const token = store.state.auth.token;
    await axios
      .get(
        `${process.env.VUE_APP_API}/survey/` + self.$route.params.id + `/show`,
        {
          headers: {
            Authorization: `Bearer ${token} `
          }
        }
      )
      .then(res => {
        self.Survey = res.data.survey;
        axios
          .get(
            `${process.env.VUE_APP_API}/survey/list/` +
              self.$route.params.id +
              `/fetch-feedback`,
            {
              headers: {
                Authorization: `Bearer ${token} `
              }
            }
          )
          .then(res => {
            self.Survey.responses = res.data.data;

            axios
              .get(
                `${process.env.VUE_APP_API}/survey/list/` +
                  self.$route.params.id +
                  `/fetch-individual-feedback`,
                {
                  headers: {
                    Authorization: `Bearer ${token} `
                  }
                }
              )
              .then(res => {
                self.Survey.individualResponses = res.data.data;
                self.Survey.total_responses =
                  self.Survey.individualResponses.length;
                self.isLoaded = true;
              })
              .catch(ex => {});
          })
          .catch(ex => {});
      })
      .catch(ex => {});
  },
  computed: {
    pageCount() {
      let l = this.Survey.individualResponses.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.Survey.individualResponses.slice(start, end);
    }
  },
  methods: {
    nextPage() {
      if (this.pageNumber + 1 < this.pageCount) {
        this.pageNumber++;
      }
    },
    prevPage() {
      if (this.pageNumber !== 0) {
        this.pageNumber--;
      }
    },
    fetchChartData(dataObj) {
      let chartData = [["value", "count"]];
      dataObj[0].options.forEach(option => {
        let count = this.countData(dataObj, option);
        chartData.push([option, count]);
      });
      console.log(chartData);
      return chartData;
    },
    countData(dataObj, needle) {
      const self = this;
      let count = 0;
      dataObj.forEach(res => {
        if (res.answers === needle) {
          count++;
        }
      });
      return count;
    }
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
