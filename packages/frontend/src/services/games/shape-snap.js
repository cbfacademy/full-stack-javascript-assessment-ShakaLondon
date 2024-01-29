import authHeader from "../axios/header.js";
import api from "../axios/api.js";

const getCurrentGame = async ( gameName ) => {
  const response = await api.get(`/games/single/${gameName}/null`, { headers: authHeader() });
  console.log(response)
  return response.data
};

const createUserGame = async ( gameName ) => {
    const response = await api.get(`/games/single/${gameName}/null`, { headers: authHeader() });
    console.log(response)
    return response.data
  };

const updateGame = (userUpdateImage) => {
  return api.get("games/all/:gameID/:type", userUpdateImage, {
    headers: authHeader(),
  });
};

const submitScore = (userUpdateImage) => {
    return api.post("games/all/:gameID/:type", userUpdateImage, {
      headers: authHeader(),
    });
  };

const shapeSnapData = {
    getCurrentGame,
    createUserGame,
    updateGame,
    submitScore
};

export default shapeSnapData