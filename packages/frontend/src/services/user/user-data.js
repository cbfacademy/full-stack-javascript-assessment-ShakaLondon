import authHeader from "../axios/header.js";
import api from "../axios/api.js";

const editUser = (userUpdate) => {
  return api.put("users/update", userUpdate, { headers: authHeader() });
};

const editAvatar = (userUpdateImage) => {
  return api.post("assets/upload/UserImage", userUpdateImage, {
    headers: authHeader('multipart/form-data'),
  });
};

const updatePassword = (existingPassword, newPassword) => {
  return api.put("users/updatePassword", {existingPassword: existingPassword, newPassword: newPassword}, {
    headers: authHeader(),
  });
};

const userData = {
  editUser,
  editAvatar,
  updatePassword,
};

export default userData