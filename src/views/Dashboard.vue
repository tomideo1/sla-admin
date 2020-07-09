<template>
  <d-container fluid class="main-content-container ">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4 my-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <h3 class="page-title font-poppings text-dark">Dashboard</h3>
      </d-col>
    </d-row>
    <d-row no-gutters>
      <d-col class="mt-3">
        <div class="row ">
          <hr class="style1 col-md-4" />
          <h5 class="font-poppings text-bold mx-auto title text-dark">
            Overview
          </h5>
          <hr class="style1 col-md-4" />
        </div>
        <div class="row mt-3">
          <div class="col-md-2 m-1 m-md-2 m-lg-3">
            <d-card
              style="border-left:7px solid #0087DB; max-height:100px;border-radius: 0"
            >
              <p class="font-poppings text-dark m-2">Users</p>
              <p class="card-number  text-center">
                {{ Dashboard.userCount }}
              </p>
            </d-card>
          </div>
          <div class="col-md-2 m-1 m-md-2 m-lg-3">
            <d-card
              style="border-left:7px solid #DAAA55; max-height:100px;border-radius: 0"
            >
              <p class="font-poppings text-dark m-2">Engagements</p>
              <p class="card-number  text-center">
                {{ Dashboard.totalEngagements }}
              </p>
            </d-card>
          </div>
          <div class="col-md-2 m-1 m-md-2 m-lg-3">
            <d-card
              style="border-left:7px solid #F77253; max-height:100px;border-radius: 0"
            >
              <p class="font-poppings text-dark m-2">Messages Sent</p>
              <p class="card-number  text-center">
                {{ Dashboard.totalMessages }}
              </p>
            </d-card>
          </div>
          <div class="col-md-2 m-1 m-md-2 m-lg-3">
            <d-card
              style="border-left:7px solid  #1F497D;max-height:100px; border-radius: 0"
            >
              <p class="font-poppings truncate-2 text-dark m-1">
                Courses Completed
              </p>
              <p class="card-number  text-center">
                {{ Dashboard.completedCourseCount }}
              </p>
            </d-card>
          </div>
          <div class="col-md-2 m-1 m-md-1  m-lg-3">
            <d-card
              style="border-left:7px solid   #8D5524;max-height:100px;  border-radius: 0"
            >
              <p class="font-poppings text-dark m-1">
                Courses in Progress
              </p>
              <p class="card-number  text-center">
                {{ Dashboard.courseInprogressCount }}
              </p>
            </d-card>
          </div>
        </div>
      </d-col>
    </d-row>
    <d-row no-gutters class="p-3">
      <d-card
        class=" col-md-6 col-12  col-lg-6 "
        style="border-radius:0!important; max-height: 300px!important;"
      >
        <p class="text-black font-poppings  m-3">
          Login Activities
        </p>
        <GChart
          type="ColumnChart"
          :data="fetchLoginSessionData"
          :options="loginChartOptions"
        />
        <div class="d-flex flex-row mx-auto ">
          <!--          <div class="legend_block m-1" v-for="legend in loginChartLegends">-->
          <!--            <span>-->
          <!--              <div-->
          <!--                class="legend_circle mr-1 "-->
          <!--                :style="'background-color:' + legend.color + ';'"-->
          <!--              ></div>-->
          <!--            </span>-->
          <!--            <p>{{ legend.name }}</p>-->
          <!--          </div>-->
        </div>
      </d-card>
      <d-card
        class=" col-md-6 col-12  col-lg-5  ml-lg-5 mt-3 mt-lg-0 mt-md-0"
        style="border-radius:0!important;"
      >
        <p class="text-black font-poppings  m-3">
          Heat Map of Popular Times
        </p>
        <apexchart
          type="heatmap"
          :options="options"
          :series="Dashboard.heatMap"
          style="max-height: 300px!important;"
        ></apexchart>
      </d-card>
    </d-row>
    <!--    <d-row class="m-3" no-gutters>-->
    <!--      <div class="col-lg-10 mx-auto ">-->
    <!--        <d-card-->
    <!--          class="  col-md-12  col-lg-12 "-->
    <!--          style="border-radius:0!important;"-->
    <!--        >-->
    <!--          <p class="text-black font-poppings  m-3">-->
    <!--            Time Spent on App-->
    <!--          </p>-->
    <!--          <h4 class="text-dark font-poppings ">5h 40m</h4>-->
    <!--          <div class="row ">-->
    <!--            <div class="col-md-8  col-lg-8 col-12 ">-->
    <!--              <GChart-->
    <!--                type="ColumnChart"-->
    <!--                :data="timeChartData"-->
    <!--                :options="timeChartOptions"-->
    <!--              />-->
    <!--              <div class="d-flex flex-row flex-grow-1 float-lg-right p-3 w-75 ">-->
    <!--                <div-->
    <!--                  class="legend_block m-1  text-center"-->
    <!--                  v-for="legend in timeChartLegends"-->
    <!--                >-->
    <!--                  <span>-->
    <!--                    <div-->
    <!--                      class="legend_circle mr-1 "-->
    <!--                      :style="'background-color:' + legend.color + ';'"-->
    <!--                    ></div>-->
    <!--                  </span>-->
    <!--                  <p class="d-flex flex-column font-open-sans">-->
    <!--                    {{ legend.name }}-->
    <!--                    <span class="text-dark font-poppings">-->
    <!--                      {{ legend.times }}-->
    <!--                    </span>-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            <div class="col-md-4 col-lg-4 col-12">-->
    <!--              <div class="row m-2 mt-lg-n5 ">-->
    <!--                <sla-button-->
    <!--                  text="Users"-->
    <!--                  size="sm"-->
    <!--                  type="outline"-->
    <!--                  class="btn shadow-effect"-->
    <!--                />-->
    <!--                <sla-button-->
    <!--                  text="Coaches"-->
    <!--                  size="sm"-->
    <!--                  type="filled"-->
    <!--                  class="btn ml-3 ml-md-3   shadow-effect"-->
    <!--                />-->
    <!--              </div>-->
    <!--              <div-->
    <!--                class="row mt-3 "-->
    <!--                style="max-height: 300px!important;overflow-y: auto"-->
    <!--              >-->
    <!--                <span-->
    <!--                  v-for="i in 10"-->
    <!--                  style="font-size: 16px;letter-spacing: 0.15px;"-->
    <!--                  :class="[-->
    <!--                    ' font-open-sans text-dark ml-2 mt-n1 mt-lg-4 mt-4 mt-md-4 col-md-12 col-12 col-lg-12' +-->
    <!--                      '  m-3 m-lg-0 m-md-0 d-flex flex-row '-->
    <!--                  ]"-->
    <!--                >-->
    <!--                  <sla-avatar size="md" :user="{ name: 'TOMIDE' }" />-->
    <!--                  <span class="ml-2">-->
    <!--                    Tomide Aina-->
    <!--                    <br />-->
    <!--                    <small-->
    <!--                      class="font-open-sans ml-1"-->
    <!--                      style="color: #999999;-->
    <!--                             line-height: 19px;-->
    <!--                             letter-spacing: 0.15px;"-->
    <!--                    >-->
    <!--                      300XP-->
    <!--                    </small>-->
    <!--                  </span>-->
    <!--                </span>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </d-card>-->
    <!--      </div>-->
    <!--    </d-row>-->
    <!--    <d-row no-gutters>-->
    <!--      <d-col class="mt-5">-->
    <!--        <div class="row ">-->
    <!--          <hr class="style1 col-md-4" />-->
    <!--          <h5 class="font-poppings text-bold mx-auto title text-dark">-->
    <!--            Engagement Rate-->
    <!--          </h5>-->
    <!--          <hr class="style1 col-md-4" />-->
    <!--        </div>-->
    <!--      </d-col>-->
    <!--    </d-row>-->
    <!--    <d-row class="m-3" no-gutters>-->
    <!--      <div class="col-lg-10 mx-auto ">-->
    <!--        <d-card-->
    <!--          class="  col-md-12  col-lg-12 "-->
    <!--          style="border-radius:0!important;"-->
    <!--        >-->
    <!--          <p class="text-black font-poppings  m-3">-->
    <!--            Engagement (Select user to view engagement)-->
    <!--          </p>-->
    <!--          <div class="row ">-->
    <!--            <div class="col-md-8  col-lg-8 col-12 ">-->
    <!--              <GChart-->
    <!--                type="LineChart"-->
    <!--                :data="engagementChartData"-->
    <!--                :options="engagementChartOptions"-->
    <!--              />-->
    <!--              <div class="d-flex flex-row flex-grow-1 float-lg-right p-3 w-75 ">-->
    <!--                <div-->
    <!--                  class="legend_block m-1  text-center"-->
    <!--                  v-for="legend in engagementChartLegends"-->
    <!--                >-->
    <!--                  <span>-->
    <!--                    <div-->
    <!--                      class="legend_circle mr-1 "-->
    <!--                      :style="'background-color:' + legend.color + ';'"-->
    <!--                    ></div>-->
    <!--                  </span>-->
    <!--                  <p>-->
    <!--                    {{ legend.name }}-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            <div class="col-md-4 col-lg-4 col-12">-->
    <!--              <div class="row m-2 mt-lg-n4 ">-->
    <!--                <sla-button-->
    <!--                  text="Users"-->
    <!--                  size="sm"-->
    <!--                  type="outline"-->
    <!--                  class="btn shadow-effect"-->
    <!--                />-->
    <!--                <sla-button-->
    <!--                  text="Coaches"-->
    <!--                  size="sm"-->
    <!--                  type="filled"-->
    <!--                  class="btn ml-3 ml-md-3   shadow-effect"-->
    <!--                />-->
    <!--              </div>-->
    <!--              <div-->
    <!--                class="row mt-3 mb-3 "-->
    <!--                style="max-height: 300px!important;overflow-y: auto"-->
    <!--              >-->
    <!--                <span-->
    <!--                  v-for="i in 10"-->
    <!--                  style="font-size: 16px;letter-spacing: 0.15px;"-->
    <!--                  :class="[-->
    <!--                    ' font-open-sans text-dark ml-2 mt-n1 mt-lg-4 mt-4 mt-md-4 col-md-12 col-12 col-lg-12' +-->
    <!--                      '  m-3 m-lg-0 m-md-0 d-flex flex-row '-->
    <!--                  ]"-->
    <!--                >-->
    <!--                  <sla-avatar size="md" :user="{ name: 'TOMIDE' }" />-->
    <!--                  <span class="ml-2">-->
    <!--                    Tomide Aina-->
    <!--                    <small-->
    <!--                      class="font-open-sans ml-5  text-dark"-->
    <!--                      style="-->
    <!--                             line-height: 19px;-->
    <!--                             letter-spacing: 0.15px;"-->
    <!--                    >-->
    <!--                      300XP-->
    <!--                    </small>-->
    <!--                  </span>-->
    <!--                </span>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </d-card>-->
    <!--      </div>-->
    <!--    </d-row>-->
    <!--    <d-row no-gutters>-->
    <!--      <d-col class="mt-5">-->
    <!--        <div class="row ">-->
    <!--          <hr class="style1 col-md-4" />-->
    <!--          <h5 class="font-poppings text-bold mx-auto title text-dark">-->
    <!--            Scorecard-->
    <!--          </h5>-->
    <!--          <hr class="style1 col-md-4" />-->
    <!--        </div>-->
    <!--      </d-col>-->
    <!--    </d-row>-->
    <!--    <d-row class="m-3" no-gutters>-->
    <!--      <div class="col-lg-10 mx-auto ">-->
    <!--        <d-card-->
    <!--          class="  col-md-12  col-lg-12 "-->
    <!--          style="border-radius:0!important;"-->
    <!--        >-->
    <!--          <div class="row">-->
    <!--            <div class="col-md-12 col-lg-12 col-12">-->
    <!--              <div class="row">-->
    <!--                <div-->
    <!--                  class="col-md-8 border-right text-center text-lg-left col-12 col-lg-8"-->
    <!--                >-->
    <!--                  <p class="text-black font-poppings  m-3">-->
    <!--                    Scorecard-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <div class="col-md-2 text-center border-right col-12 col-lg-2">-->
    <!--                  <p class="text-black font-poppings  m-3">-->
    <!--                    Status-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <div class="col-md-2 text-center col-12 col-lg-2">-->
    <!--                  <p class="text-black font-poppings  m-3">-->
    <!--                    Due Dates-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--              <div-->
    <!--                :class="['row', i % 2 === 0 ? 'scorecard-selected' : '']"-->
    <!--                v-for="i in 5"-->
    <!--              >-->
    <!--                <div class="col-md-8 border-right col-12 col-lg-8">-->
    <!--                  <span-->
    <!--                    style="font-size: 16px;letter-spacing: 0.15px;"-->
    <!--                    class="font-open-sans text-dark-->
    <!--                      col-md-12 col-12 col-lg-12 m-3 m-lg-3 m-md-0 d-flex flex-row"-->
    <!--                  >-->
    <!--                    <sla-avatar size="md" :user="{ name: 'TOMIDE' }" />-->
    <!--                    <span class="m-1 ml-4">-->
    <!--                      Tomide Aina-->
    <!--                    </span>-->
    <!--                  </span>-->
    <!--                </div>-->
    <!--                <div class="col-md-2 border-right text-center col-12 col-lg-2">-->
    <!--                  <d-btn-->
    <!--                    :class="[-->
    <!--                      'btn  mt-3  btn-pill',-->
    <!--                      i % 2 === 0 ? 'btn-primary' : 'btn-warning'-->
    <!--                    ]"-->
    <!--                  >-->
    <!--                    {{ i % 2 === 0 ? "Uploaded" : "Pending" }}-->
    <!--                  </d-btn>-->
    <!--                </div>-->
    <!--                <div class="col-md-2 text-center col-12 col-lg-2">-->
    <!--                  <p class="text-black  font-poppings  m-3">-->
    <!--                    07-May-2020-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </d-card>-->
    <!--      </div>-->
    <!--    </d-row>-->
    <!--    <d-row no-gutters>-->
    <!--      <d-col class="mt-5">-->
    <!--        <div class="row ">-->
    <!--          <hr class="style1 col-md-4" />-->
    <!--          <h5 class="font-poppings text-bold mx-auto title text-dark">-->
    <!--            Posts-->
    <!--          </h5>-->
    <!--          <hr class="style1 col-md-4" />-->
    <!--        </div>-->
    <!--      </d-col>-->
    <!--    </d-row>-->
    <!--    <d-row no-gutters class="p-3 mb-3">-->
    <!--      <d-card-->
    <!--        class=" col-md-6 col-12  col-lg-6 "-->
    <!--        style="border-radius:0!important; max-height: 300px!important;"-->
    <!--      >-->
    <!--        <p class="text-black font-poppings  m-3">-->
    <!--          Post Activity-->
    <!--        </p>-->
    <!--        <GChart-->
    <!--          type="LineChart"-->
    <!--          :data="postActivityChartData"-->
    <!--          :options="postActivityChartOptions"-->
    <!--        />-->
    <!--        <div class="d-flex flex-row mx-auto ">-->
    <!--          <div-->
    <!--            class="legend_block m-1"-->
    <!--            v-for="legend in postActivityChartLegends"-->
    <!--          >-->
    <!--            <span>-->
    <!--              <div-->
    <!--                class="legend_circle mr-1 "-->
    <!--                :style="'background-color:' + legend.color + ';'"-->
    <!--              ></div>-->
    <!--            </span>-->
    <!--            <p>{{ legend.name }}</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </d-card>-->
    <!--      <d-card-->
    <!--        class=" col-md-6 col-12  col-lg-5  ml-lg-5 mt-3 mt-lg-0 mt-md-0"-->
    <!--        style="border-radius:0!important;"-->
    <!--      >-->
    <!--        <p class="text-black font-poppings  m-3">-->
    <!--          Post Interactions-->
    <!--        </p>-->
    <!--        <GChart-->
    <!--          type="LineChart"-->
    <!--          :data="postInteractionsChartData"-->
    <!--          :options="postActivityChartOptions"-->
    <!--        />-->
    <!--        <div class="d-flex flex-row mx-auto ">-->
    <!--          <div-->
    <!--            class="legend_block m-1"-->
    <!--            v-for="legend in postInteractionsChartLegends"-->
    <!--          >-->
    <!--            <span>-->
    <!--              <div-->
    <!--                class="legend_circle mr-1 "-->
    <!--                :style="'background-color:' + legend.color + ';'"-->
    <!--              ></div>-->
    <!--            </span>-->
    <!--            <p>{{ legend.name }}</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </d-card>-->
    <!--    </d-row>-->
    <d-row class="p-3 mb-3" no-gutters>
      <div class="col-lg-12 mx-auto ">
        <d-select class="col-md-3 mb-4">
          <option selected :value="undefined">All</option>
        </d-select>
        <!-- <div class="col-md-4 float-right">
          <div class="d-flex flex-row mx-auto ">
            <div
              class="legend_block m-1"
              v-for="legend in postActivityChartLegends"
            >
              <span>
                <div
                  class="legend_circle mr-1 "
                  :style="'background-color:' + legend.color + ';'"
                ></div>
              </span>
              <p>{{ legend.name }}</p>
            </div>
          </div>
        </div> -->
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <div class="row" style="max-height:500px;overflow-y:auto">
            <div class="col-md-12 col-lg-12 col-12">
              <div class="row sticky-top bg-white">
                <div class="col-md-4  text-center text-lg-left col-12 col-lg-4">
                  <p class="text-black font-poppings  m-3">
                    Posts
                  </p>
                </div>
                <div class="col-md-1 text-center  col-12 col-lg-1">
                  <p class="text-black font-poppings w-100 mx-auto m-3">
                    Type
                  </p>
                </div>
                <div class="col-md-1 text-center  col-12 col-lg-1">
                  <p class="text-black font-poppings w-100 mx-auto m-3">
                    Author
                  </p>
                </div>
                <div class="col-md-2 text-center col-12 col-lg-2">
                  <p class="text-black w-100 mx-auto font-poppings  m-3">
                    Impressions
                  </p>
                </div>
                <div class="col-md-2 text-center col-12 col-lg-2">
                  <p class="text-black mx-auto w-100 font-poppings  m-3">
                    Engagements
                  </p>
                </div>
                <div class="col-md-2 text-center col-12 col-lg-2">
                  <p class="text-black w-100 mx-auto font-poppings  m-3">
                    Engagement Ratio
                  </p>
                </div>
              </div>
              <div
                :class="['row ', idx % 2 === 0 ? 'scorecard-selected' : '']"
                v-for="(data, idx) in fetchTopAnnouncements"
                :key="idx"
              >
                <div class="col-md-4   col-12 col-lg-4">
                  <span
                    style="font-size: 16px;letter-spacing: 0.15px;"
                    class="font-open-sans text-dark
                      col-md-12 col-12 col-lg-12 m-3 m-lg-3 m-md-0 d-flex flex-lg-row flex-grow-1"
                  >
                    <img
                      :src="data.cover_image"
                      :style="'width:87px!important;height: 63px!important;'"
                    />

                    <span class="m-1 ml-4">
                      {{ data.title }}
                    </span>
                  </span>
                </div>
                <div class="col-md-1    text-center col-12 col-lg-1">
                  <div
                    class="legend_circle mt-lg-4  mx-auto "
                    :style="'background-color:' + '#0087DB;' + ';'"
                  ></div>
                </div>
                <div class="col-md-1      text-center col-12 col-lg-1">
                  <p class="text-black  w-100 mx-auto font-open-sanst  m-3">
                    SLA
                  </p>
                </div>
                <div class="col-md-2    text-center col-12 col-lg-2">
                  <p class="text-black  font-open-sanst  m-3">
                    {{ data.likes }}
                  </p>
                </div>
                <div class="col-md-2    text-center col-12 col-lg-2">
                  <p class="text-black  font-open-sanst  m-3">
                    {{ data.engagements }}
                  </p>
                </div>
                <div class="col-md-2    text-center col-12 col-lg-2">
                  <p class="text-black  font-open-sanst  m-3">
                    {{ getEnagegmentRatio(data.engagements, data.likes) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </d-card>
      </div>
    </d-row>

    <!--    <d-row class="p-3 mb-3" no-gutters>-->
    <!--      <div class="col-lg-10 mx-auto ">-->
    <!--        <d-select class="col-md-3 mb-4">-->
    <!--          <option selected :value="undefined">All</option>-->
    <!--        </d-select>-->
    <!--        <div class="col-md-4 float-right">-->
    <!--          <div class="d-flex flex-row mx-auto ">-->
    <!--            <div-->
    <!--              class="legend_block m-1"-->
    <!--              v-for="legend in postActivityChartLegends"-->
    <!--            >-->
    <!--              <span>-->
    <!--                <div-->
    <!--                  class="legend_circle mr-1 "-->
    <!--                  :style="'background-color:' + legend.color + ';'"-->
    <!--                ></div>-->
    <!--              </span>-->
    <!--              <p>{{ legend.name }}</p>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <d-card-->
    <!--          class="  col-md-12  col-lg-12 "-->
    <!--          style="border-radius:0!important;"-->
    <!--        >-->
    <!--          <div class="row">-->
    <!--            <div class="col-md-12 col-lg-12 col-12">-->
    <!--              <div class="row">-->
    <!--                <div class="col-md-7  text-center text-lg-left col-12 col-lg-7">-->
    <!--                  <p class="text-black font-poppings  m-3">-->
    <!--                    Top Posts-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <div class="col-md-1 text-center  col-12 col-lg-1">-->
    <!--                  <p class="text-black font-poppings w-100 mx-auto m-3">-->
    <!--                    Type-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <div class="col-md-1 text-center  col-12 col-lg-1">-->
    <!--                  <p class="text-black font-poppings w-100 mx-auto m-3">-->
    <!--                    Author-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <div class="col-md-1 text-center col-12 col-lg-1">-->
    <!--                  <p class="text-black w-100 mx-auto font-poppings  m-3">-->
    <!--                    Impressions-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <div class="col-md-1 text-center col-12 col-lg-1">-->
    <!--                  <p class="text-black mx-auto w-100 font-poppings  m-3">-->
    <!--                    Engagements-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <div class="col-md-1 text-center col-12 col-lg-1">-->
    <!--                  <p class="text-black w-100 mx-auto font-poppings  m-3">-->
    <!--                    Engagement Ratio-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--              <div-->
    <!--                :class="['row ', i % 2 === 0 ? 'scorecard-selected' : '']"-->
    <!--                v-for="(legend, idx) in postInteractionsChartLegends"-->
    <!--                :key="idx"-->
    <!--              >-->
    <!--                <div class="col-md-7   col-12 col-lg-7">-->
    <!--                  <span-->
    <!--                    style="font-size: 16px;letter-spacing: 0.15px;"-->
    <!--                    class="font-open-sans text-dark-->
    <!--                      col-md-12 col-12 col-lg-12 m-3 m-lg-3 m-md-0 d-flex flex-row"-->
    <!--                  >-->
    <!--                    <d-card-->
    <!--                      :style="-->
    <!--                        'width:87px!important;height: 63px!important;' +-->
    <!--                          'backgroundImage:url(' +-->
    <!--                          'https://res.cloudinary.com/dwpu7jpku/image/upload/v1584548572/auth-bg_i6msdh.png' +-->
    <!--                          ');' +-->
    <!--                          ' background-size:cover; background-position:center'-->
    <!--                      "-->
    <!--                    >-->
    <!--                    </d-card>-->
    <!--                    <span class="m-1 ml-4">-->
    <!--                      Business Analytics for future investment-->
    <!--                    </span>-->
    <!--                  </span>-->
    <!--                </div>-->
    <!--                <div class="col-md-1    text-center col-12 col-lg-1">-->
    <!--                  <div-->
    <!--                    class="legend_circle mt-lg-4  mx-auto "-->
    <!--                    :style="'background-color:' + legend.color + ';'"-->
    <!--                  ></div>-->
    <!--                </div>-->
    <!--                <div-->
    <!--                  class="col-md-1      text-center col-12 col-lg-1"-->
    <!--                >-->
    <!--                  <p class="text-black  w-100 mx-auto font-open-sanst  m-3">-->
    <!--                    SLA-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <div class="col-md-1    text-center col-12 col-lg-1">-->
    <!--                  <p class="text-black  font-open-sanst  m-3">-->
    <!--                    253-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <div class="col-md-1    text-center col-12 col-lg-1">-->
    <!--                  <p class="text-black  font-open-sanst  m-3">-->
    <!--                    642-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <div class="col-md-1    text-center col-12 col-lg-1">-->
    <!--                  <p class="text-black  font-open-sanst  m-3">-->
    <!--                    1.12-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </d-card>-->
    <!--      </div>-->
    <!--    </d-row>-->
    <!--    <d-row class="p-3 mb-3" no-gutters>-->
    <!--      <div class="col-lg-10 mx-auto ">-->
    <!--        <d-card-->
    <!--          class="  col-md-12  col-lg-12 "-->
    <!--          style="border-radius:0!important;"-->
    <!--        >-->
    <!--          <p class="text-black font-poppings  m-3">-->
    <!--            Posts By Day-->
    <!--          </p>-->
    <!--          <GChart-->
    <!--            type="ColumnChart"-->
    <!--            :data="postByDayChartData"-->
    <!--            :options="postByDayChartOptions"-->
    <!--          />-->
    <!--          <div class="d-flex flex-row mx-auto ">-->
    <!--            <div-->
    <!--              class="legend_block m-1"-->
    <!--              v-for="legend in postByDayChartLegends"-->
    <!--            >-->
    <!--              <span>-->
    <!--                <div-->
    <!--                  class="legend_circle mr-1 "-->
    <!--                  :style="'background-color:' + legend.color + ';'"-->
    <!--                ></div>-->
    <!--              </span>-->
    <!--              <p>{{ legend.name }}</p>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </d-card>-->
    <!--      </div>-->
    <!--    </d-row>-->
    <!--    <d-row no-gutters>-->
    <!--      <d-col class="mt-5">-->
    <!--        <div class="row ">-->
    <!--          <hr class="style1 col-md-4" />-->
    <!--          <h5 class="font-poppings text-bold mx-auto title text-dark">-->
    <!--            Users-->
    <!--          </h5>-->
    <!--          <hr class="style1 col-md-4" />-->
    <!--        </div>-->
    <!--      </d-col>-->
    <!--    </d-row>-->
    <!--    <d-row no-gutters class="p-3 mb-3">-->
    <!--      <d-card-->
    <!--        class=" col-md-6 col-12  col-lg-6 "-->
    <!--        style="border-radius:0!important; max-height: 300px!important;"-->
    <!--      >-->
    <!--        <p class="text-black font-poppings  m-3">-->
    <!--          Active users-->
    <!--        </p>-->
    <!--        <GChart-->
    <!--          type="LineChart"-->
    <!--          :data="userActivityChartData"-->
    <!--          :options="userActivityChartOptions"-->
    <!--        />-->
    <!--        <div class="d-flex flex-row mx-auto ">-->
    <!--          <div-->
    <!--            class="legend_block m-1"-->
    <!--            v-for="legend in userActivityChartLegends"-->
    <!--          >-->
    <!--            <span>-->
    <!--              <div-->
    <!--                class="legend_circle mr-1 "-->
    <!--                :style="'background-color:' + legend.color + ';'"-->
    <!--              ></div>-->
    <!--            </span>-->
    <!--            <p>{{ legend.name }}</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </d-card>-->
    <!--&lt;!&ndash;      <d-card&ndash;&gt;-->
    <!--&lt;!&ndash;        class=" col-md-6 col-12  col-lg-5  ml-lg-5 mt-3 mt-lg-0 mt-md-0"&ndash;&gt;-->
    <!--&lt;!&ndash;        style="border-radius:0!important;"&ndash;&gt;-->
    <!--&lt;!&ndash;      >&ndash;&gt;-->
    <!--&lt;!&ndash;        <p class="text-black font-poppings  m-3">&ndash;&gt;-->
    <!--&lt;!&ndash;          User Interactions&ndash;&gt;-->
    <!--&lt;!&ndash;        </p>&ndash;&gt;-->
    <!--&lt;!&ndash;        <GChart&ndash;&gt;-->
    <!--&lt;!&ndash;          type="LineChart"&ndash;&gt;-->
    <!--&lt;!&ndash;          :data="userInteractionsChartData"&ndash;&gt;-->
    <!--&lt;!&ndash;          :options="userActivityChartOptions"&ndash;&gt;-->
    <!--&lt;!&ndash;        />&ndash;&gt;-->
    <!--&lt;!&ndash;        <div class="d-flex flex-row mx-auto ">&ndash;&gt;-->
    <!--&lt;!&ndash;          <div&ndash;&gt;-->
    <!--&lt;!&ndash;            class="legend_block m-1"&ndash;&gt;-->
    <!--&lt;!&ndash;            v-for="legend in userInteractionsChartLegends"&ndash;&gt;-->
    <!--&lt;!&ndash;          >&ndash;&gt;-->
    <!--&lt;!&ndash;            <span>&ndash;&gt;-->
    <!--&lt;!&ndash;              <div&ndash;&gt;-->
    <!--&lt;!&ndash;                class="legend_circle mr-1 "&ndash;&gt;-->
    <!--&lt;!&ndash;                :style="'background-color:' + legend.color + ';'"&ndash;&gt;-->
    <!--&lt;!&ndash;              ></div>&ndash;&gt;-->
    <!--&lt;!&ndash;            </span>&ndash;&gt;-->
    <!--&lt;!&ndash;            <p>{{ legend.name }}</p>&ndash;&gt;-->
    <!--&lt;!&ndash;          </div>&ndash;&gt;-->
    <!--&lt;!&ndash;        </div>&ndash;&gt;-->
    <!--&lt;!&ndash;      </d-card>&ndash;&gt;-->
    <!--    </d-row>-->
    <d-row class="p-3 mb-3" no-gutters>
      <div class="col-lg-12 mx-auto ">
        <select class="form-control col-md-3 mb-4" v-model="current_filter">
          <option :value="undefined">All</option>
          <option value="admin">Admins</option>
          <option value="user">Users</option>
          <option value="coach">Coaches</option>
        </select>
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <div class="row " style="max-height:400px;overflow-y:auto">
            <div class="col-md-12 col-lg-12 col-12">
              <div class="row sticky-top bg-white ">
                <div class="col-md-7  text-center text-lg-left col-12 col-lg-7">
                  <p class="text-black font-poppings  m-3">
                    User
                  </p>
                </div>
                <div class="col-md-1 text-center  col-12 col-lg-1">
                  <p class="text-black font-poppings w-100 mx-auto m-3">
                    Visits
                  </p>
                </div>
                <!-- <div class="col-md-1 text-center  col-12 col-lg-1">
                  <p class="text-black font-poppings w-100 mx-auto m-3">
                    Engagements
                  </p>
                </div>
                <div class="col-md-1 text-center col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto font-poppings  m-3">
                    Posts
                  </p>
                </div>
                <div class="col-md-2 text-center col-12 col-lg-2">
                  <p class="text-black mx-auto w-100 font-poppings  m-3">
                    Messages Sent
                  </p>
                </div> -->
              </div>
              <div
                :class="['row ', idx % 2 === 0 ? 'scorecard-selected' : '']"
                v-for="(user, idx) in filterTopUsers"
                :key="idx"
              >
                <div class="col-md-7   col-12 col-lg-7">
                  <span
                    style="font-size: 16px;letter-spacing: 0.15px;"
                    :class="[
                      ' font-open-sans text-dark mt-lg-3 p-lg-3' +
                        '  m-3 m-lg-0 m-md-0 d-flex flex-row '
                    ]"
                  >
                    <sla-avatar size="md" :user="{ name: user.fullName }" />
                    <span class="ml-2">
                      {{ user.fullName }}
                    </span>
                  </span>
                </div>
                <div class="col-md-1    text-center p-lg-3  col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto  font-open-sanst  m-3">
                    {{ user.count }}
                  </p>
                </div>
                <!-- <div class="col-md-1    text-center p-lg-3  col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto  font-open-sanst  m-3">
                    0
                  </p>
                </div>
                <div class="col-md-1    text-center p-lg-3 col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto  font-open-sanst  m-3">
                    0
                  </p>
                </div>
                <div class="col-md-2    text-center col-12 col-lg-2">
                  <p class="text-black  font-open-sanst  m-3">
                    0
                  </p>
                </div> -->
              </div>
            </div>
          </div>
        </d-card>
      </div>
    </d-row>

    <d-row class="p-3 mb-3" no-gutters>
      <div class="col-lg-12 mx-auto ">
        <d-select class="col-md-3 mb-4">
          <option selected :value="undefined">Top Locations</option>
        </d-select>
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <div class="row " style="max-height400px; overflow-y:auto">
            <div class="col-md-12 col-lg-12 col-12">
              <div class="row sticky-top bg-white ">
                <div class="col-md-4  text-center text-lg-left col-12 col-lg-4">
                  <p class="text-black font-poppings  m-3">
                    Top Locations
                  </p>
                </div>
                <!-- <div class="col-md-1 text-center  col-12 col-lg-1">
                  <p class="text-black font-poppings w-100 mx-auto m-3">
                    Users
                  </p>
                </div>
                <div class="col-md-1 text-center  col-12 col-lg-1">
                  <p class="text-black font-poppings w-100 mx-auto m-3">
                    Active Users
                  </p>
                </div>
                <div class="col-md-2 text-center col-12 col-lg-2">
                  <p class="text-black w-100 mx-auto font-poppings  m-3">
                    Engagements
                  </p>
                </div>
                <div class="col-md-2 text-center col-12 col-lg-2">
                  <p class="text-black mx-auto w-100 font-poppings  m-3">
                    Sessions
                  </p>
                </div>
                <div class="col-md-2 text-center col-12 col-lg-2">
                  <p class="text-black mx-auto w-100 font-poppings  m-3">
                    Retention rates
                  </p>
                </div> -->
              </div>
              <span class="border-top"></span>
              <div
                :class="['row ', idx % 2 === 0 ? 'scorecard-selected' : '']"
                v-for="(location, idx) in fetchTopLocations"
                :key="idx"
              >
                <div class="col-md-4   col-12 col-lg-4">
                  <span
                    style="font-size: 16px;letter-spacing: 0.15px;"
                    :class="[
                      ' font-open-sans text-dark mt-lg-3 p-lg-3' +
                        '  m-3 m-lg-0 m-md-0 d-flex flex-row '
                    ]"
                  >
                    <span class="ml-2">
                      {{ location._id }}
                    </span>
                  </span>
                </div>
                <!-- <div class="col-md-1    text-center col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto  font-open-sanst  m-3">
                    0
                  </p>
                </div>
                <div class="col-md-1    text-center col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto  font-open-sanst  m-3">
                    0
                  </p>
                </div>
                <div class="col-md-2    text-center col-12 col-lg-2">
                  <p class="text-black w-100 mx-auto  font-open-sanst  m-3">
                    0
                  </p>
                </div>
                <div class="col-md-2    text-center col-12 col-lg-2">
                  <p class="text-black  font-open-sanst  m-3">
                    0
                  </p>
                </div>
                <div class="col-md-2    text-center col-12 col-lg-2">
                  <p class="text-black  font-open-sanst  m-3">
                    0
                  </p>
                </div> -->
              </div>
            </div>
          </div>
        </d-card>
      </div>
    </d-row>

    <d-row class="p-3 mb-3" no-gutters>
      <div class="col-lg-12 mx-auto ">
        <d-select class="col-md-3 mb-4">
          <option selected :value="undefined">Top Courses</option>
        </d-select>
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <div class="row" style="max-height:500px;overflow-y:auto">
            <div class="col-md-12 col-lg-12 col-12">
              <div class="row  sticky-top bg-white">
                <div class="col-md-6  text-center text-lg-left col-12 col-lg-6">
                  <p class="text-black font-poppings  m-3">
                    Top Courses
                  </p>
                </div>
                <div class="col-md-2 text-center  col-12 col-lg-2">
                  <p class="text-black font-poppings w-100 mx-auto m-3">
                    Number of Enrollees
                  </p>
                </div>
                <div class="col-md-2 text-center  col-12 col-lg-2">
                  <p class="text-black font-poppings w-100 mx-auto m-3">
                    Completion Rate
                  </p>
                </div>
                <div class="col-md-2 text-center  col-12 col-lg-2">
                  <p class="text-black font-poppings w-100 mx-auto m-3">
                    Engagements
                  </p>
                </div>
              </div>
              <div
                :class="['row ', idx % 2 === 0 ? 'scorecard-selected' : '']"
                v-for="(data, idx) in fetchTopCourses"
                :key="idx"
              >
                <div class="col-md-6  col-12 col-lg-6">
                  <span
                    style="font-size: 16px;letter-spacing: 0.15px;"
                    class="font-open-sans text-dark
                      col-md-12 col-12 col-lg-12 m-3 m-lg-3 m-md-0 d-flex flex-row"
                  >
                    <d-card
                      :style="
                        'width:87px!important;height: 63px!important;' +
                          'backgroundImage:url(' +
                          (data ? data.cover_image : '') +
                          ');' +
                          ' background-size:cover; background-position:center'
                      "
                    >
                    </d-card>
                    <span class="m-1 ml-4">
                      {{ data ? data.title : "" }}
                    </span>
                  </span>
                </div>
                <div
                  class="col-md-2  mt-lg-3  p-lg-3 m-3 m-lg-0 m-md-0 text-center col-12 col-lg-2"
                >
                  {{ data.enrollments }}
                </div>
                <div
                  class="col-md-2  mt-lg-3  p-lg-3 m-3 m-lg-0 m-md-0 text-center col-12 col-lg-2"
                >
                  {{ data.enrollments }}
                </div>
                <div
                  class="col-md-2   mt-lg-3  p-lg-3 m-3 m-lg-0 m-md-0 text-center col-12 col-lg-2"
                >
                  {{ data.engagements }}
                </div>
              </div>
            </div>
          </div>
        </d-card>
      </div>
    </d-row>

    <!--    <d-row no-gutters class="p-3 mb-3">-->
    <!--      <d-card-->
    <!--        class=" col-md-6 col-12  col-lg-6 "-->
    <!--        style="border-radius:0!important; max-height: 300px!important;"-->
    <!--      >-->
    <!--        <p class="text-black text-center  font-poppings  m-3">-->
    <!--          All Users vs Active Users-->
    <!--        </p>-->
    <!--        <div class="d-flex flex-row flex-grow-1">-->

    <!--          <GChart-->
    <!--            type="PieChart"-->
    <!--            :data="compareChartData"-->
    <!--            :options="compareChartOptions"-->
    <!--          />-->
    <!--          <div class=" d-flex flex-column">-->
    <!--            <h4 class="font-poppings text-dark">109</h4>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--      </d-card>-->
    <!--      <d-card-->
    <!--        class=" col-md-6 col-12  col-lg-5  ml-lg-5 mt-3 mt-lg-0 mt-md-0"-->
    <!--        style="border-radius:0!important;"-->
    <!--      >-->
    <!--        <p class="text-black text-center font-poppings  m-3">-->
    <!--          New Users vs Returning Users-->
    <!--        </p>-->
    <!--        <GChart-->
    <!--          type="LineChart"-->
    <!--          :data="postInteractionsChartData"-->
    <!--          :options="postActivityChartOptions"-->
    <!--        />-->

    <!--      </d-card>-->
    <!--    </d-row>-->
  </d-container>
</template>

<script>
import { GChart } from "vue-google-charts";
import VueApexCharts from "vue-apexcharts";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "@/store/index";
import moment from "moment";
import firebase from "@/firebaseConfig.js";
const { messaging } = firebase;
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
      current_filter: undefined,
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
    notificationsPermisionRequest() {
      messaging
        .requestPermission()
        .then(() => {
          this.getMessagingToken();
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    },
    listenTokenRefresh() {
      const currentMessageToken = window.localStorage.getItem("messagingToken");
      if (!!currentMessageToken || currentMessageToken == null) {
        messaging.onTokenRefresh(function() {
          messaging
            .getToken()
            .then(function(token) {
              this.saveToken({ token });
            })
            .catch(function(err) {
              console.log("Unable to retrieve refreshed token ", err);
            });
        });
      }
    },
    ...mapActions({
      getAllAnalysis: "app/getAllAnalysis",
      saveToken: "general/saveToken",
      getMessagingToken: "getMessagingToken"
    }),
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
    },
    getEnagegmentRatio(engagements, impressions) {
      let result = (engagements / impressions) * 100;
      return Math.ceil(result);
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

    filterTopUsers() {
      if (this.current_filter === undefined) {
        return this.fetchTopUsers;
      }
      return this.fetchTopUsers.filter(
        res => res.userType === this.current_filter
      );
      // const self = this
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
  async mounted() {
    if (Notification.permission !== "allow") {
      console.log({ kkkk: Object.entries(messaging).length });
      if (Object.entries(messaging).length > 0) {
        this.notificationsPermisionRequest();
      }
    }
    if (Object.entries(messaging).length > 0) {
      this.listenTokenRefresh();
    }
    await this.getAllAnalysis();
    this.fetchPopularTimesData();
    console.log({ Dashboard: this.getAnalytics });
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
  background: #e7e6e6;
}
.btn-primary {
  background: rgba(0, 135, 219, 0.16) !important;
  border: none;
}
.btn-warning {
  background: #ffdea3 !important;
}
</style>
