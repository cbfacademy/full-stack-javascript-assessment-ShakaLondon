import authHeader from "../axios/header.js";
import api from "../axios/api.js";

const editUser = (userUpdate) => {
  return api.put("users/login/update", userUpdate, { headers: authHeader() });
};

const editAvatar = (userUpdateImage) => {
  return api.post("image/upload/avatar", userUpdateImage, {
    headers: authHeader(),
  });
};

const userData = {
  editUser,
  editAvatar,
};

export default userData