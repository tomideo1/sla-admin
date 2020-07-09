import Api from "@/utils/Api.js";
import state from "./state";

export const login = async ({ commit }, payload) => {
  let res = await Api.post("/admin/login", payload);

  if (res.status == 200) {
    commit("setToken", res.data.token);
    commit("setUserDetails", res.data.admin);
    return res;
  } else {
    return res;
  }
};

export const uploadProfileImage = async ({ commit }, payload) => {
  let res = await Api.post(`/admin/profile/image`, payload, true);
  commit("setProfileImage", res.data.user.image);
};

export const getMessageToken = async ({ commit }) => {
  let res = await Api.get("/admin/messaging-token", true);
  commit("setSocketToken", res.data.token);
};

export const Logout = async ({ commit }) => {
  commit("setToken", {});
  commit("setUserDetails", {});
  commit("logout");
};
