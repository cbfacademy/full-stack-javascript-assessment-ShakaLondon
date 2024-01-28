import api from "../axios/api.js";

const register = (userObject) => {
  return api.post("users/register", userObject).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    const userData = response.data;

    return userData;
  });
};

const login = (email, password) => {
  return api
    .post("users/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      const userData = response.data;

      return userData;
    })
    .catch((err) => {
        return {
            status: err.response.status,
            message: err.response.data.message
        };
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const userAuth = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default userAuth;