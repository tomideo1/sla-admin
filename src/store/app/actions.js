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

export const getAssignedUsers = async ({ commit }) => {
  let res = await Api.get(`admin/coach/users`, true);
  if (res.status === 200) {
    commit("setAssignedUsers", res.data);
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

export const getScheduledSurveys = async ({ commit }) => {
  let res = await Api.get(`survey/list/scheduled`, true);
  if (res.status === 200) {
    commit("setSchduledSurveys", res.data);
  } else return res;
};

export const getSavedSurveys = async ({ commit }) => {
  let res = await Api.get(`survey/list/saved`, true);
  if (res.status === 200) {
    commit("setSavedSurveys", res.data);
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

export const getAllAnalysis = async ({ commit }) => {
  let res = await Api.get(`admin/dashboard`, true);
  if (res.status === 200) {
    commit("setAnalytics", res.data);
  } else return res;
};

export const getAllResourceCategories = async ({ commit }) => {
  let res = await Api.get(`/resource-category/admin/list`, true);
  console.log({ res });
  if (res.status == 200) {
    commit("setResourceCategories", res.data.data);
  } else {
    return res;
  }
};

export const showScoreCard = async ({ commit }) => {
  let res = await Api.get(`/scorecard/show`, true);

  if (res.status == 200) {
    commit("SetScoreCard", res.data);
  } else {
    return res;
  }
};

export const getGroupMessages = async ({ commit }, payload) => {
  let res = await Api.get(`/group/${payload.groupId}/group-messages`, true);
  console.log({ res });
  let msg = res.data.data.group_messages.map(x => x.message);
  return msg;
  // commit("populateMessage", {messages: res.data.data.group_messages, groupId: payload.groupId})
};

export const sendChat = async ({ commit }, payload) => {
  let obj = {
    message: payload
  };
  let res = await Api.post(`/group/admin/send-message`, obj, true);
  console.log(res.status);
};

export const submitSurveyApi = async ({ commit }, payload) => {
  let res = await Api.post(
    `survey/coach/${payload.id}/submit`,
    {
      answers: payload.answers
    },
    true
  );
  if (res && res.status == 200) {
    return res;
  } else {
    return res;
  }
};
