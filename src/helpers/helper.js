import axios from "axios";
import store from "@/store/index";

export default {
  GetSortOrder(prop) {
    return function(a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  },
  async handleDelete(id, deleteUrl, redirect) {
    const self = this;
    const token = store.state.auth.token;
    let res = await axios
      .delete(`${process.env.VUE_APP_API}/` + deleteUrl + id, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        setTimeout(function() {
          location.reload();
          // self.$router.push({ path: redirect });
        }, 2000);
      })
      .catch(ex => {
        alert(ex.response.data.message);
      });
  }
};
