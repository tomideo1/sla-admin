<template>
  <d-container fluid>
    <div class="row">
      <div class="col">
        <table class="table mb-0 table-bordered table-responsive-xl ">
          <thead class="bg-white" style="border: none!important;">
            <tr>
              <th scope="col" class="border-0">#</th>
              <th scope="col" class="border-0">Name</th>
              <th scope="col" class="border-0">Feedback</th>
              <th scope="col" class="border-0">Date</th>
              <th scope="col" class="border-0">Resolved</th>
              <th scope="col" class="border-0">Action</th>
              <th scope="col" class="border-0">Indicator Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-4">1</td>
              <td class="p-4">Ali</td>
              <td class="p-4">Kerry</td>
              <td class="p-4">Russian Federation</td>
              <td colspan="0">
                <input
                  class="form-check mx-auto "
                  type="checkbox"
                  disabled
                  :checked="false"
                  style="height: 40px"
                />
              </td>
              <td class="text-center">
                <icon name="arrow-back" class="m-1" size="xs" />
                <icon
                  name="message"
                  class="p1 m-1"
                  size="lg"
                  data-count="1"
                  @click="$router.push({ path: '/support/single' })"
                />
              </td>
              <td class="p-4">107-0339</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </d-container>
</template>

<script>
export default {
  name: "home",
  components: {
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped>
.p1[data-count]:after {
  position: relative;
  right: 15%;
  top: -20%;
  content: attr(data-count);
  width: 15px;
  height: 15px;
  font-size: 40%;
  padding: 0.2em;
  border-radius: 50%;
  line-height: 1em;
  color: white;
  background: red;
  text-align: center;
  z-index: 1;
  //font-weight:bold;
}
</style>
