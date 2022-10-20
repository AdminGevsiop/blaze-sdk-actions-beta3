import axios from 'axios';

const API_URL = process.env.REACT_APP_API;
const API_PREFIX = "api/v1";

const getUser = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const headers = {
    Authorization: 'Bearer ' + user.accessToken,
  };

  return headers;
};

class ExampleService {
  // async login(user) {
  //   return axios.post(`${API_URL + API_PREFIX}/mgmt/session`, user);
  // }

  // async chooseShop(shop) {
  //   return axios.post(`${API_URL + API_PREFIX}/mgmt/session/shop`, shop, {
  //     headers: getUser(),
  //   });
  // }
}

export default ExampleService;
