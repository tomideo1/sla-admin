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

export const getAllIndustry = async ({ commit }) => {
  let res = await Api.get(`industry/list `, true);
  if (res.status === 200) {
    commit("setIndustry", res.data);
  } else {
    return res;
  }
};

export const deleteIndustry = async ({ commit }, id) => {
  let res = await Api.delete(`industry/admin/delete/${id} `, true);
  if (res.status === 200) {
    this.getAllIndustry();
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
export const getCoachesGroups = async ({ commit }) => {
  let res = await Api.get(`group/list-admin-groups`, true);
  if (res.status === 200) {
    commit("setCoachesGroups", res.data);
  } else return res;
};
export const getAllSurveys = async ({ commit }) => {
  let res = await Api.get(`survey/list`, true);
  if (res.status === 200) {
    commit("setSurveys", res.data);
  } else return res;
};

export const getAllCoachSurveys = async ({ commit }) => {
  let res = await Api.get(`survey/coach/list`, true);
  if (res.status === 200) {
    commit("setCoachSurveys", res.data);
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

export const getUserScoreCards = async ({ commit }) => {
  let res = await Api.get(`/scorecard/getAll`, true);

  if (res.status == 200) {
    commit("setUserScoreCards", res.data);
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

export const getAnnouncementDetails = async ({ commit }, payload) => {
  let res = await Api.get(`/annoucement/admin/get/${payload.id}`, true);
  if (res.status == 200) {
    return res.data.data;
  } else {
    return res;
  }
  // commit("populateMessage", {messages: res.data.data.group_messages, groupId: payload.groupId})
};

export const sendChat = async ({ commit }, payload) => {
  let obj = {
    message: payload
  };
  let res = await Api.post(`/group/admin/send-message`, obj, true);
  console.log(res.status);
};

export const sendCoachChat = async ({ commit }, payload) => {
  let obj = {
    message: payload
  };
  let res = await Api.post(`group/admin/send-message`, obj, true);
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

export const getAllCoachTickets = async ({ commit }) => {
  let res = await Api.get(`help/coach/list`, true);
  if (res.status === 200) {
    commit("setCoachTickets", res.data);
  } else return res;
};

export const submitHelp = async ({ commit }, payload) => {
  let res = await Api.post(
    `help/coach/create`,
    {
      feedback: payload.feedback
    },
    true
  );

  if (res && res.status == 200) {
    return res;
  } else {
    return res;
  }
};

export const fetchUserScorecard = async ({ commit }, payload) => {
  let res = await Api.get(`scorecard/${payload.id}/show `, true);

  if (res && res.status == 200) {
    return res.data.scorecard;
  } else {
    return res;
  }
};

export const submitScoreCard = async ({ commit }, payload) => {
  let res = await Api.post(
    `scorecard/create`,
    {
      scorecard: payload.scorecard,
      user: payload.user
    },
    true
  );

  if (res && res.status == 200) {
    return res;
  } else {
    return res;
  }
};

export const deleteCourse = async ({ commit }, payload) => {
  let res = await Api.delete(`course/${payload.id}`, true);
  if (res && res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const deleteResource = async ({ commit }, payload) => {
  let res = await Api.delete(`resource/admin/delete/${payload.id}`, true);
  if (res && res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const deletePoll = async ({ commit }, payload) => {
  let res = await Api.delete(`poll/delete/${payload.id}`, true);
  if (res && res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const deleteAnnouncement = async ({ commit }, payload) => {
  let res = await Api.delete(`annoucement/admin/delete/${payload.id}`, true);
  if (res && res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const deleteSurvey = async ({ commit }, payload) => {
  let res = await Api.delete(`survey/${payload.id}`, true);
  if (res && res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const deleteLesson = async ({ commit }, payload) => {
  let res = await Api.delete(`course/${payload.id}/lesson`, true);
  if (res && res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const updateLesson = async ({ commit }, payload) => {
  let res = await Api.post(
    `course/${payload.id}/lessons/update`,
    payload.lesson,
    true
  );
  if (res && res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const addLesson = async ({ commit }, payload) => {
  let res = await Api.post(
    `course/${payload.id}/lesson/create`,
    payload.lesson,
    true
  );
  if (res && res.status == 200) {
    return true;
  } else {
    return false;
  }
};

export const updateQuiz = async ({ commit }, payload) => {
  let res = await Api.post(
    `course/${payload.id}/quizzes/update`,
    {
      quizzes: payload.quizzes
    },
    true
  );
  if (res && res.status == 200) {
    return true;
  } else {
    return false;
  }
};
