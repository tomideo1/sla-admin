<template>
  <div>
    <top heading="Chioma’s Scorecard" />
    <d-container fluid class="main-content-container px-4 py-4">
      <d-row>
        <div class="col-md-2 col-lg-2 col-12">
          <d-row>
            <div class="mb-3 col-md-12 col-lg-12 col-12  ">
              <div class="text-center">
                <avatar
                  size="150"
                  :url="
                    'https://res.cloudinary.com/dwpu7jpku/image/upload/v1558709245/samples/ecommerce/leather-bag-gray.jpg'
                  "
                />
                <h6 class="font-weight-bold text-black font-open-sans ">
                  Chioma Nnam
                </h6>
                <p class="text-black font-open-sans">
                  Design lover and a tech enthusiast
                </p>
                <p class="text-grey font-open-sans">Lagos, Nigeria</p>
                <sla-button
                  type="filled"
                  text="Export"
                  size="md"
                  class="btn col-md-12"
                />
              </div>
            </div>
          </d-row>
        </div>
        <div class="col-md-10 col-lg-10 col-12">
          <d-form-row>
            <!-- First Name -->
            <d-col md="8" class="form-group">
              <label class="text-grey"> Name of Mentee</label>
              <d-form-input type="text" />
            </d-col>
            <d-col md="8" class="form-group">
              <label class="text-grey"> Weekly Course Completion</label>
              <d-select>
                <option selected :value="undefined">
                  Completion of 10% to 30% Weekly Course...
                </option>
              </d-select>
            </d-col>
            <d-col md="8" class="form-group">
              <label class="text-grey"> Weekly Worksheets Completion</label>
              <d-select>
                <option selected :value="undefined">
                  Completion of 1/2 Weekly Worksheets
                </option>
              </d-select>
            </d-col>
            <d-col md="8" class="form-group">
              <label class="text-grey">
                Agreed Goal (s)
              </label>
              <d-form-input type="text" />
            </d-col>
            <d-col md="8" class="form-group">
              <label class="text-grey">
                Percieved Challenges
              </label>
              <d-form-input type="text" />
            </d-col>
            <d-col md="8" class="form-group">
              <label class="text-grey">
                Progress on weekly goals
              </label>
              <d-select>
                <option selected :value="undefined">
                  Completed goals (10 Marks)
                </option>
              </d-select>
            </d-col>
            <d-col md="8" class="form-group">
              <label class="text-grey">
                Business Coach’s Comments
              </label>
              <d-form-input type="text" />
            </d-col>
          </d-form-row>
        </div>
      </d-row>
    </d-container>
  </div>
</template>

<script>
export default {
  name: "single",
  components: {
    top: () => import("@/components/top"),
    avatar: () => import("@/components/avatar.vue"),
    SlaButton: () => import("@/components/SlaButton.vue")
  }
};
</script>

<style scoped></style>
