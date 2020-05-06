export const setUserDetails = (state, data) => {
  state.user = data;
  // set role
  state.role = data.type;
};

export const setToken = (state, data) => {
  state.token = data;
  state.isLoggedIn = true;
};

export const logout = state => {
  state.isLoggedIn = false;
};
