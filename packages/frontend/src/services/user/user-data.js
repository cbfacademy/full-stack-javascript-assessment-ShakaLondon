import authHeader from "../header.js";
import api from "../api.js";

const editUser = (userUpdate) => {
  return api.put("users/login/update", userUpdate, { headers: authHeader() });
};

const editAvatar = (userUpdateImage) => {
  return api.post("image/upload/avatar", userUpdateImage, {
    headers: authHeader(),
  });
};

// const editCover = (userUpdateCover) => {
//   return api.post("image/upload/cover", userUpdateCover, {
//     headers: authHeader(),
//   });
// };

const userData = {
  editUser,
  editAvatar,
};

export default userData