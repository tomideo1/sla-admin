import Api from "@/utils/Api.js";

export const getAllCourses = async ({ commit }) => {
  let res = await Api.get(`/course/list`, true);

  if (res.status == 200) {
    commit("setCourses", res.data.data);
  } else {
    return res;
  }
};

export const getAllEngagedCourses = async ({ commit }) => {
  let res = await Api.get(`/course/top-engagements`, true);

  if (res.status == 200) {
    commit("setEngagedCourses", res.data.data);
  } else {
    return res;
  }
};

export const getAllCategories = async ({ commit }) => {
  let res = await Api.get(`/category/admin/list`, true);

  if (res.status == 200) {
    commit("setCategories", res.data.data);
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

export const getAllUsers = async ({ commit }) => {
  let res = await Api.get(`admin/user/getAll`, true);
  if (res.status === 200) {
    commit("setUsers", res.data);
  } else return res;
};

export const getAllAnnouncements = async ({ commit }) => {
  let res = await Api.get(`annoucement/admin/getAll`, true);
  if (res.status === 200) {
    commit("setAnnouncements", res.data);
  } else return res;
};

export const getAllPolls = async ({ commit }) => {
  let res = await Api.get(`poll/getAll`, true);
  if (res.status === 200) {
    commit("setPolls", res.data);
  } else return res;
};

export const getAllGroups = async ({ commit }) => {
  let res = await Api.get(`group/list`, true);
  if (res.status === 200) {
    commit("setGroups", res.data);
  } else return res;
};

export const getAllSurveys = async ({ commit }) => {
  let res = await Api.get(`survey/list`, true);
  if (res.status === 200) {
    commit("setSurveys", res.data);
  } else return res;
};

export const getAllTickets = async ({ commit }) => {
  let res = await Api.get(`help/admin/getAll`, true);
  if (res.status === 200) {
    commit("setTickets", res.data);
  } else return res;
};

export const getAllResources = async ({ commit }) => {
  let res = await Api.get(`resource/admin/getAll`, true);
  if (res.status === 200) {
    commit("setResources", res.data);
  } else return res;
};
