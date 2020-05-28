<template>
  <d-container fluid class="main-content-container px-4">
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
          :data="loginChartData"
          :options="loginChartOptions"
        />
        <div class="d-flex flex-row mx-auto ">
          <div class="legend_block m-1" v-for="legend in loginChartLegends">
            <span>
              <div
                class="legend_circle mr-1 "
                :style="'background-color:' + legend.color + ';'"
              ></div>
            </span>
            <p>{{ legend.name }}</p>
          </div>
        </div>
      </d-card>
      <d-card
        class=" col-md-6 col-12  col-lg-5  ml-lg-5 mt-3 mt-lg-0 mt-md-0"
        style="border-radius:0!important;"
      >
        <p class="text-black font-poppings  m-3">
          Heat Map of Popular Times
        </p>
        <!--        <apexchart-->
        <!--          type="heatmap"-->
        <!--          :options="options"-->
        <!--          :series="series"-->
        <!--          style="max-height: 300px!important;"-->
        <!--        ></apexchart>-->
      </d-card>
    </d-row>
    <d-row class="m-3" no-gutters>
      <div class="col-lg-10 mx-auto ">
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <p class="text-black font-poppings  m-3">
            Time Spent on App
          </p>
          <h4 class="text-dark font-poppings ">5h 40m</h4>
          <div class="row ">
            <div class="col-md-8  col-lg-8 col-12 ">
              <GChart
                type="ColumnChart"
                :data="timeChartData"
                :options="timeChartOptions"
              />
              <div class="d-flex flex-row flex-grow-1 float-lg-right p-3 w-75 ">
                <div
                  class="legend_block m-1  text-center"
                  v-for="legend in timeChartLegends"
                >
                  <span>
                    <div
                      class="legend_circle mr-1 "
                      :style="'background-color:' + legend.color + ';'"
                    ></div>
                  </span>
                  <p class="d-flex flex-column font-open-sans">
                    {{ legend.name }}
                    <span class="text-dark font-poppings">
                      {{ legend.times }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-lg-4 col-12">
              <div class="row m-2 mt-lg-n5 ">
                <sla-button
                  text="Users"
                  size="sm"
                  type="outline"
                  class="btn shadow-effect"
                />
                <sla-button
                  text="Coaches"
                  size="sm"
                  type="filled"
                  class="btn ml-3 ml-md-3   shadow-effect"
                />
              </div>
              <div
                class="row mt-3 "
                style="max-height: 300px!important;overflow-y: auto"
              >
                <span
                  v-for="i in 10"
                  :key="i"
                  style="font-size: 16px;letter-spacing: 0.15px;"
                  :class="[
                    ' font-open-sans text-dark ml-2 mt-n1 mt-lg-4 mt-4 mt-md-4 col-md-12 col-12 col-lg-12' +
                      '  m-3 m-lg-0 m-md-0 d-flex flex-row '
                  ]"
                >
                  <sla-avatar size="md" :user="{ name: 'TOMIDE' }" />
                  <span class="ml-2">
                    Tomide Aina
                    <br />
                    <small
                      class="font-open-sans ml-1"
                      style="color: #999999;
                             line-height: 19px;
                             letter-spacing: 0.15px;"
                    >
                      300XP
                    </small>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </d-card>
      </div>
    </d-row>
    <d-row no-gutters>
      <d-col class="mt-5">
        <div class="row ">
          <hr class="style1 col-md-4" />
          <h5 class="font-poppings text-bold mx-auto title text-dark">
            Engagement Rate
          </h5>
          <hr class="style1 col-md-4" />
        </div>
      </d-col>
    </d-row>
    <d-row class="m-3" no-gutters>
      <div class="col-lg-10 mx-auto ">
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <p class="text-black font-poppings  m-3">
            Engagement (Select user to view engagement)
          </p>
          <div class="row ">
            <div class="col-md-8  col-lg-8 col-12 ">
              <GChart
                type="LineChart"
                :data="engagementChartData"
                :options="engagementChartOptions"
              />
              <div class="d-flex flex-row flex-grow-1 float-lg-right p-3 w-75 ">
                <div
                  class="legend_block m-1  text-center"
                  v-for="legend in engagementChartLegends"
                >
                  <span>
                    <div
                      class="legend_circle mr-1 "
                      :style="'background-color:' + legend.color + ';'"
                    ></div>
                  </span>
                  <p>
                    {{ legend.name }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-lg-4 col-12">
              <div class="row m-2 mt-lg-n4 ">
                <sla-button
                  text="Users"
                  size="sm"
                  type="outline"
                  class="btn shadow-effect"
                />
                <sla-button
                  text="Coaches"
                  size="sm"
                  type="filled"
                  class="btn ml-3 ml-md-3   shadow-effect"
                />
              </div>
              <div
                class="row mt-3 mb-3 "
                style="max-height: 300px!important;overflow-y: auto"
              >
                <span
                  v-for="i in 10"
                  :key="i"
                  style="font-size: 16px;letter-spacing: 0.15px;"
                  :class="[
                    ' font-open-sans text-dark ml-2 mt-n1 mt-lg-4 mt-4 mt-md-4 col-md-12 col-12 col-lg-12' +
                      '  m-3 m-lg-0 m-md-0 d-flex flex-row '
                  ]"
                >
                  <sla-avatar size="md" :user="{ name: 'TOMIDE' }" />
                  <span class="ml-2">
                    Tomide Aina
                    <small
                      class="font-open-sans ml-5  text-dark"
                      style="
                             line-height: 19px;
                             letter-spacing: 0.15px;"
                    >
                      300XP
                    </small>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </d-card>
      </div>
    </d-row>
    <d-row no-gutters>
      <d-col class="mt-5">
        <div class="row ">
          <hr class="style1 col-md-4" />
          <h5 class="font-poppings text-bold mx-auto title text-dark">
            Scorecard
          </h5>
          <hr class="style1 col-md-4" />
        </div>
      </d-col>
    </d-row>
    <d-row class="m-3" no-gutters>
      <div class="col-lg-10 mx-auto ">
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <div class="row">
            <div class="col-md-12 col-lg-12 col-12">
              <div class="row">
                <div
                  class="col-md-8 border-right text-center text-lg-left col-12 col-lg-8"
                >
                  <p class="text-black font-poppings  m-3">
                    Scorecard
                  </p>
                </div>
                <div class="col-md-2 text-center border-right col-12 col-lg-2">
                  <p class="text-black font-poppings  m-3">
                    Status
                  </p>
                </div>
                <div class="col-md-2 text-center col-12 col-lg-2">
                  <p class="text-black font-poppings  m-3">
                    Due Dates
                  </p>
                </div>
              </div>
              <div
                :class="['row', i % 2 === 0 ? 'scorecard-selected' : '']"
                v-for="i in 5"
                :key="i"
              >
                <div class="col-md-8 border-right col-12 col-lg-8">
                  <span
                    style="font-size: 16px;letter-spacing: 0.15px;"
                    class="font-open-sans text-dark
                      col-md-12 col-12 col-lg-12 m-3 m-lg-3 m-md-0 d-flex flex-row"
                  >
                    <sla-avatar size="md" :user="{ name: 'TOMIDE' }" />
                    <span class="m-1 ml-4">
                      Tomide Aina
                    </span>
                  </span>
                </div>
                <div class="col-md-2 border-right text-center col-12 col-lg-2">
                  <d-btn
                    :class="[
                      'btn  mt-3  btn-pill',
                      i % 2 === 0 ? 'btn-primary' : 'btn-warning'
                    ]"
                  >
                    {{ i % 2 === 0 ? "Uploaded" : "Pending" }}
                  </d-btn>
                </div>
                <div class="col-md-2 text-center col-12 col-lg-2">
                  <p class="text-black  font-poppings  m-3">
                    07-May-2020
                  </p>
                </div>
              </div>
            </div>
          </div>
        </d-card>
      </div>
    </d-row>
    <d-row no-gutters>
      <d-col class="mt-5">
        <div class="row ">
          <hr class="style1 col-md-4" />
          <h5 class="font-poppings text-bold mx-auto title text-dark">
            Posts
          </h5>
          <hr class="style1 col-md-4" />
        </div>
      </d-col>
    </d-row>
    <d-row no-gutters class="p-3 mb-3">
      <d-card
        class=" col-md-6 col-12  col-lg-6 "
        style="border-radius:0!important; max-height: 300px!important;"
      >
        <p class="text-black font-poppings  m-3">
          Post Activity
        </p>
        <GChart
          type="LineChart"
          :data="postActivityChartData"
          :options="postActivityChartOptions"
        />
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
      </d-card>
      <d-card
        class=" col-md-6 col-12  col-lg-5  ml-lg-5 mt-3 mt-lg-0 mt-md-0"
        style="border-radius:0!important;"
      >
        <p class="text-black font-poppings  m-3">
          Post Interactions
        </p>
        <GChart
          type="LineChart"
          :data="postInteractionsChartData"
          :options="postActivityChartOptions"
        />
        <div class="d-flex flex-row mx-auto ">
          <div
            class="legend_block m-1"
            v-for="legend in postInteractionsChartLegends"
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
      </d-card>
    </d-row>
    <d-row class="p-3 mb-3" no-gutters>
      <div class="col-lg-10 mx-auto ">
        <d-select class="col-md-3 mb-4">
          <option selected :value="undefined">All</option>
        </d-select>
        <div class="col-md-4 float-right">
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
        </div>
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <div class="row">
            <div class="col-md-12 col-lg-12 col-12">
              <div class="row">
                <div class="col-md-7  text-center text-lg-left col-12 col-lg-7">
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
                <div class="col-md-1 text-center col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto font-poppings  m-3">
                    Impressions
                  </p>
                </div>
                <div class="col-md-1 text-center col-12 col-lg-1">
                  <p class="text-black mx-auto w-100 font-poppings  m-3">
                    Engagements
                  </p>
                </div>
                <div class="col-md-1 text-center col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto font-poppings  m-3">
                    Engagement Ratio
                  </p>
                </div>
              </div>
              <div
                :class="['row ', i % 2 === 0 ? 'scorecard-selected' : '']"
                v-for="legend in postInteractionsChartLegends"
                :key="legend"
              >
                <div class="col-md-7 border-right col-12 col-lg-7">
                  <span
                    style="font-size: 16px;letter-spacing: 0.15px;"
                    class="font-open-sans text-dark
                      col-md-12 col-12 col-lg-12 m-3 m-lg-3 m-md-0 d-flex flex-row"
                  >
                    <d-card
                      :style="
                        'width:87px!important;height: 63px!important;' +
                          'backgroundImage:url(' +
                          'https://res.cloudinary.com/dwpu7jpku/image/upload/v1584548572/auth-bg_i6msdh.png' +
                          ');' +
                          ' background-size:cover; background-position:center'
                      "
                    >
                    </d-card>
                    <span class="m-1 ml-4">
                      Business Analytics for future investment
                    </span>
                  </span>
                </div>
                <div class="col-md-1 border-right  text-center col-12 col-lg-1">
                  <div
                    class="legend_circle mt-lg-4  mx-auto "
                    :style="'background-color:' + legend.color + ';'"
                  ></div>
                </div>
                <div
                  class="col-md-1    border-right text-center col-12 col-lg-1"
                >
                  <p class="text-black  w-100 mx-auto font-open-sanst  m-3">
                    SLA
                  </p>
                </div>
                <div class="col-md-1  border-right text-center col-12 col-lg-1">
                  <p class="text-black  font-open-sanst  m-3">
                    253
                  </p>
                </div>
                <div class="col-md-1  border-right text-center col-12 col-lg-1">
                  <p class="text-black  font-open-sanst  m-3">
                    642
                  </p>
                </div>
                <div class="col-md-1  border-right text-center col-12 col-lg-1">
                  <p class="text-black  font-open-sanst  m-3">
                    1.12
                  </p>
                </div>
              </div>
            </div>
          </div>
        </d-card>
      </div>
    </d-row>
    <d-row class="p-3 mb-3" no-gutters>
      <div class="col-lg-10 mx-auto ">
        <d-select class="col-md-3 mb-4">
          <option selected :value="undefined">All</option>
        </d-select>
        <div class="col-md-4 float-right">
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
        </div>
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <div class="row">
            <div class="col-md-12 col-lg-12 col-12">
              <div class="row">
                <div class="col-md-7  text-center text-lg-left col-12 col-lg-7">
                  <p class="text-black font-poppings  m-3">
                    Top Posts
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
                <div class="col-md-1 text-center col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto font-poppings  m-3">
                    Impressions
                  </p>
                </div>
                <div class="col-md-1 text-center col-12 col-lg-1">
                  <p class="text-black mx-auto w-100 font-poppings  m-3">
                    Engagements
                  </p>
                </div>
                <div class="col-md-1 text-center col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto font-poppings  m-3">
                    Engagement Ratio
                  </p>
                </div>
              </div>
              <div
                :class="['row ', i % 2 === 0 ? 'scorecard-selected' : '']"
                v-for="legend in postInteractionsChartLegends"
                :key="legend"
              >
                <div class="col-md-7 border-right col-12 col-lg-7">
                  <span
                    style="font-size: 16px;letter-spacing: 0.15px;"
                    class="font-open-sans text-dark
                      col-md-12 col-12 col-lg-12 m-3 m-lg-3 m-md-0 d-flex flex-row"
                  >
                    <d-card
                      :style="
                        'width:87px!important;height: 63px!important;' +
                          'backgroundImage:url(' +
                          'https://res.cloudinary.com/dwpu7jpku/image/upload/v1584548572/auth-bg_i6msdh.png' +
                          ');' +
                          ' background-size:cover; background-position:center'
                      "
                    >
                    </d-card>
                    <span class="m-1 ml-4">
                      Business Analytics for future investment
                    </span>
                  </span>
                </div>
                <div class="col-md-1 border-right  text-center col-12 col-lg-1">
                  <div
                    class="legend_circle mt-lg-4  mx-auto "
                    :style="'background-color:' + legend.color + ';'"
                  ></div>
                </div>
                <div
                  class="col-md-1    border-right text-center col-12 col-lg-1"
                >
                  <p class="text-black  w-100 mx-auto font-open-sanst  m-3">
                    SLA
                  </p>
                </div>
                <div class="col-md-1  border-right text-center col-12 col-lg-1">
                  <p class="text-black  font-open-sanst  m-3">
                    253
                  </p>
                </div>
                <div class="col-md-1  border-right text-center col-12 col-lg-1">
                  <p class="text-black  font-open-sanst  m-3">
                    642
                  </p>
                </div>
                <div class="col-md-1  border-right text-center col-12 col-lg-1">
                  <p class="text-black  font-open-sanst  m-3">
                    1.12
                  </p>
                </div>
              </div>
            </div>
          </div>
        </d-card>
      </div>
    </d-row>
    <d-row class="p-3 mb-3" no-gutters>
      <div class="col-lg-10 mx-auto ">
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <p class="text-black font-poppings  m-3">
            Posts By Day
          </p>
          <GChart
            type="ColumnChart"
            :data="postByDayChartData"
            :options="postByDayChartOptions"
          />
          <div class="d-flex flex-row mx-auto ">
            <div
              class="legend_block m-1"
              v-for="legend in postByDayChartLegends"
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
        </d-card>
      </div>
    </d-row>
    <d-row no-gutters>
      <d-col class="mt-5">
        <div class="row ">
          <hr class="style1 col-md-4" />
          <h5 class="font-poppings text-bold mx-auto title text-dark">
            Users
          </h5>
          <hr class="style1 col-md-4" />
        </div>
      </d-col>
    </d-row>
    <d-row no-gutters class="p-3 mb-3">
      <d-card
        class=" col-md-6 col-12  col-lg-6 "
        style="border-radius:0!important; max-height: 300px!important;"
      >
        <p class="text-black font-poppings  m-3">
          Active users
        </p>
        <GChart
          type="LineChart"
          :data="userActivityChartData"
          :options="userActivityChartOptions"
        />
        <div class="d-flex flex-row mx-auto ">
          <div
            class="legend_block m-1"
            v-for="legend in userActivityChartLegends"
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
      </d-card>
      <d-card
        class=" col-md-6 col-12  col-lg-5  ml-lg-5 mt-3 mt-lg-0 mt-md-0"
        style="border-radius:0!important;"
      >
        <p class="text-black font-poppings  m-3">
          User Interactions
        </p>
        <GChart
          type="LineChart"
          :data="userInteractionsChartData"
          :options="userActivityChartOptions"
        />
        <div class="d-flex flex-row mx-auto ">
          <div
            class="legend_block m-1"
            v-for="legend in userInteractionsChartLegends"
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
      </d-card>
    </d-row>
    <d-row class="p-3 mb-3" no-gutters>
      <div class="col-lg-10 mx-auto ">
        <d-select class="col-md-3 mb-4">
          <option selected :value="undefined">All</option>
        </d-select>
        <div class="col-md-4 float-right">
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
        </div>
        <d-card
          class="  col-md-12  col-lg-12 "
          style="border-radius:0!important;"
        >
          <div class="row">
            <div class="col-md-12 col-lg-12 col-12">
              <div class="row">
                <div class="col-md-7  text-center text-lg-left col-12 col-lg-7">
                  <p class="text-black font-poppings  m-3">
                    Top Posts
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
                <div class="col-md-1 text-center col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto font-poppings  m-3">
                    Impressions
                  </p>
                </div>
                <div class="col-md-1 text-center col-12 col-lg-1">
                  <p class="text-black mx-auto w-100 font-poppings  m-3">
                    Engagements
                  </p>
                </div>
                <div class="col-md-1 text-center col-12 col-lg-1">
                  <p class="text-black w-100 mx-auto font-poppings  m-3">
                    Engagement Ratio
                  </p>
                </div>
              </div>
              <div
                :class="['row ', i % 2 === 0 ? 'scorecard-selected' : '']"
                v-for="legend in postInteractionsChartLegends"
                :key="legend"
              >
                <div class="col-md-7 border-right col-12 col-lg-7">
                  <span
                    style="font-size: 16px;letter-spacing: 0.15px;"
                    class="font-open-sans text-dark
                      col-md-12 col-12 col-lg-12 m-3 m-lg-3 m-md-0 d-flex flex-row"
                  >
                    <d-card
                      :style="
                        'width:87px!important;height: 63px!important;' +
                          'backgroundImage:url(' +
                          'https://res.cloudinary.com/dwpu7jpku/image/upload/v1584548572/auth-bg_i6msdh.png' +
                          ');' +
                          ' background-size:cover; background-position:center'
                      "
                    >
                    </d-card>
                    <span class="m-1 ml-4">
                      Business Analytics for future investment
                    </span>
                  </span>
                </div>
                <div class="col-md-1 border-right  text-center col-12 col-lg-1">
                  <div
                    class="legend_circle mt-lg-4  mx-auto "
                    :style="'background-color:' + legend.color + ';'"
                  ></div>
                </div>
                <div
                  class="col-md-1    border-right text-center col-12 col-lg-1"
                >
                  <p class="text-black  w-100 mx-auto font-open-sanst  m-3">
                    SLA
                  </p>
                </div>
                <div class="col-md-1  border-right text-center col-12 col-lg-1">
                  <p class="text-black  font-open-sanst  m-3">
                    253
                  </p>
                </div>
                <div class="col-md-1  border-right text-center col-12 col-lg-1">
                  <p class="text-black  font-open-sanst  m-3">
                    642
                  </p>
                </div>
                <div class="col-md-1  border-right text-center col-12 col-lg-1">
                  <p class="text-black  font-open-sanst  m-3">
                    1.12
                  </p>
                </div>
              </div>
            </div>
          </div>
        </d-card>
      </div>
    </d-row>
  </d-container>
</template>

<script>
import { GChart } from "vue-google-charts";
import VueApexCharts from "vue-apexcharts";
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
      // options: {
      //   chart: {
      //     type: "heatmap",
      //     id: "vue-heat-map",
      //     toolbar: {
      //       show: false
      //     }
      //   },
      //   dataLabels: {
      //     enabled: false
      //   },
      //   colors: ["#008FFB"]
      // },
      // series: [
      //   {
      //     data: this.generateData(18, {
      //       min: 0,
      //       max: 90
      //     }),
      //     name: "Metric1",
      //   },
      //   {
      //     name: "Metric2",
      //     data: this.generateData(18, {
      //       min: 0,
      //       max: 90
      //     })
      //   },
      //   {
      //     name: "Metric3",
      //     data: this.generateData(18, {
      //       min: 0,
      //       max: 90
      //     })
      //   },
      // ],

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
      ]
    };
  },
  methods: {
    generateData(n, floor) {
      var data = [],
        p = Math.random() * 11 + 1,
        i;

      floor = !floor && floor !== 0 ? 20 : floor;
      for (i = 0; i < (n || 12); i++) {
        data.push({
          x: i % 12,
          y: Math.floor(Math.max(Math.random() * 100, 20))
        });
      }
      return data;
    }
  },
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
  opacity: 0.7;
}
.btn-primary {
  background: rgba(0, 135, 219, 0.16) !important;
  border: none;
}
.btn-warning {
  background: #ffdea3 !important;
}
</style>
