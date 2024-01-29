import axiosInstance from "./api";
import TokenService from "./tokenService";
import { logout } from "../../redux/slices/user-state-slice.js";


const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();

      if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (
        (originalConfig.url !== "/users/register" ||
          originalConfig.url !== "/users/business/register") &&
        err.response
      ) {
        // Access Token was expired
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("/auth/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;

            dispatch(refreshToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (err) {

            return Promise.reject(err);
          }
        } else 
        if (err.response.status === 403) 
        {
          try {
            dispatch(logout());
            TokenService.removeUser();

            return Promise.reject(err);
          } catch (err) {

            return Promise.reject(err);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;