import axios from 'axios';

const API_PREFIX = "api/v1";
const API_URL = process.env.REACT_APP_API;
const appTarget = "AuthenticationApp";

const getUser = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const headers = {
    Authorization: 'Bearer ' + user.accessToken,
  };

  return headers;
};

class AiRecommendationService {
  async refreshList(type, skip=0, limit=0) {
    return axios.get(`${API_URL + API_PREFIX}/ai/recommendations/refresh?appTarget=${appTarget}&type=${type}&skip=${skip}&limit=${limit}`, {
      headers: getUser(),
    });
  }

  async run(body) {
    return axios.post(`${API_URL + API_PREFIX}/ai/recommendations/run`, body, {
      headers: getUser(),
    });
  }
}

export default AiRecommendationService;
