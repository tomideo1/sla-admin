import Api from "@/utils/Api.js";

export const getAllCourses = async ({ commit }) => {
  let res = await Api.get(`/course/list`, true);

  if (res.status == 200) {
    commit("setCourses", res.data.data);
  } else {
    return res;
  }
};

export const getAllAdmins = async ({ commit }) => {
  let res = await Api.get(`admin/admins/getAll `, true);
  if (res.status === 200) {
    commit("setAdmins", res.data);
  } else {
    return res;
  }
};

export const getAllAssets = async ({ commit }) => {
  let res = await Api.get(`assets/getAll`, true);
  if (res.status === 200) {
    commit("setAssets", res.data);
  } else {
    return res;
  }
};

export const getAllLeaderboard = async ({ commit }) => {
  let res = await Api.get(`admin/leaderboard/getAll`, true);
  if (res.status === 200) {
    commit("setLeaderboard", res.data);
  } else {
    return res;
  }
};
