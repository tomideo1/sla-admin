export const setCourses = (state, data) => {
  state.courseObj = data.courses;
};
export const setEngagedCourses = (state, data) => {
  state.engagedCourses = data.courses;
};

export const setPolls = (state, data) => {
  state.Polls = data.data.polls;
};

export const setGroups = (state, data) => {
  state.Groups = data.data.groups;
};

export const setSurveys = (state, data) => {
  state.Surveys = data.data.surveys;
};

export const setTickets = (state, data) => {
  state.Tickets = data.data.help;
};

export const setResources = (state, data) => {
  state.Resources = data.data.resources;
};
export const setCategories = (state, data) => {
  state.Categories = data.categories;
};
export const setAdmins = (state, data) => {
  state.Admins = data.admin;
};

export const setAssets = (state, data) => {
  state.Assets = data.data.assets;
};

export const setAnnouncements = (state, data) => {
  state.Announcements = data.data.annoucements;
};
export const setLeaderboard = (state, data) => {
  state.Leaders = data.data.leaderboard;
};
export const setUsers = (state, data) => {
  state.Users = data.data.user;
};

export const setAnalytics = (state, data) => {
  state.Analytics = data;
};

export const setResourceCategories = (state, data) => {
  state.ResourceCategories = data.categories;
};
