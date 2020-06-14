<template>
  <d-container fluid>
    <top heading="Assing Participants" />
  </d-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      Users: "app/getUsers"
      // maps courses to current computed resource
    })
  },
  methods: {
    ...mapActions("app/", ["getAllUsers"]),
    compareUsers: (arr1, arr2) => {
      let valuesA = arr1.reduce(function(a, c) {
        a[c._id] = c._id;
        return a;
      }, {});
      let valuesB = arr2.reduce(function(a, c) {
        a[c._id] = c._id;
        return a;
      }, {});
      let result = arr1
        .filter(function(c) {
          return !valuesB[c._id];
        })
        .concat(
          arr2.filter(function(c) {
            return !valuesA[c._id];
          })
        );
      return result;
    }

    //vuex call to get all courses
  },
  mounted() {
    this.getAllAdmins();
    let res = axios
      .get(`${process.env.VUE_APP_API}/admin/coach/` + userId, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        self.user = res.data.data;
        self.isLoaded = true;
      })
      .catch();
  },
  components: {
    SlaAvatar: () => import("@/components/avatar"),
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped>
.avatar {
  display: inline-block !important;
}
</style>
