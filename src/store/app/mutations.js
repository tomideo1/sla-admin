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

export const setCoachesGroups = (state, data) => {
  state.CoachGroups = data.data;
};

export const setSurveys = (state, data) => {
  state.Surveys = data.data.surveys;
};
export const setSchduledSurveys = (state, data) => {
  state.scheduledSurveys = data.data.surveys;
};

export const setSavedSurveys = (state, data) => {
  state.savedSurveys = data.data.surveys;
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
  state.Admins = data.data.admin;
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

export const setAssignedUsers = (state, data) => {
  state.AssignedUsers = data.data.users;
};

export const setAnalytics = (state, data) => {
  state.Analytics = data;
};

export const setResourceCategories = (state, data) => {
  state.ResourceCategories = data.categories;
};

export const SetScoreCard = (state, data) => {
  state.ScoreCard = data.template;
};
export const setUserScoreCards = (state, data) => {
  state.UserScoreCards = data.data.scorecards;
};

export const setCoachTickets = (state, data) => {
  state.CoachTickets = data.data.help;
};
