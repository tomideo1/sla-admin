export const setCourses = (state, data) => {
  state.courseObj = data.courses;
};
export const setEngagedCourses = (state, data) => {
  state.engagedCourses = data.courses;
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
export const setLeaderboard = (state, data) => {
  state.Leaders = data.data.leaderboard;
};
export const setUsers = (state, data) => {
  state.Users = data.data.users;
};
