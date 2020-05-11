<template>
  <d-container fluid class="main-content-container px-4">
    <top heading="Ticket Name" />
    <d-row>
      <div class="col-md-7 col-lg-7 col-12">
        <d-form-row class="p-4 mt-4">
          <!-- First Name -->
          <div class="form-group col-md-8 col-lg-8 col-12">
            <label class="text-grey"> Name</label>
            <d-form-input type="text" />
          </div>
          <div class="form-group col-md-8 col-lg-8 col-12">
            <label class="text-grey"> Feedback</label>
            <d-textarea rows="5"> </d-textarea>
          </div>
          <div class="form-group col-md-8 col-lg-8 col-12">
            <label class="text-grey"> Response</label>
            <d-textarea rows="5"> </d-textarea>
          </div>
        </d-form-row>
        <div class="form-group col-md-3 col-lg-3 col-6">
          <d-select>
            <option selected :value="undefined">
              Has this issue been resolved ?
            </option>
            <option>
              Yes - Close ticket
            </option>
            <option>
              No - Leave Ticket Open
            </option>
          </d-select>
        </div>
      </div>
    </d-row>
  </d-container>
</template>

<script>
import Top from "../../components/top";
export default {
  name: "single",
  components: { Top }
};
</script>

<style scoped></style>
