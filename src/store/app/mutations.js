export const setCourses = (state, data) => {
  state.courseObj = data.courses;
};
export const setAdmins = (state, data) => {
  state.Admins = data.admin;
};

export const setAssets = (state, data) => {
  state.Assets = data.data.assets;
};
