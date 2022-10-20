import axios from 'axios';
const API_URL = process.env.REACT_APP_API;
const API_PREFIX = "api/v1";

const getUser = () => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  const headers = {
    Authorization: 'Bearer ' + user.accessToken,
  };

  return headers;
};

class AuthService {
  async login(user) {
    return axios.post(`${API_URL + API_PREFIX}/mgmt/session`, user);
  }

  async reviewCompanyAgreement(email, password, token) {
    return axios.post(`${API_URL + API_PREFIX}/mgmt/session/reviewCompanyAgreement`, 
      {email, password}, 
      { headers: {
        Authorization: token 
      } });
  }

  async saveCompanyAgreement(companyId, clickwrapId) {
    return axios.post(`${API_URL + API_PREFIX}/mgmt/docusign/${companyId}/saveCompanyAgreement/${clickwrapId}`, {});
  }

  async chooseShop(shop) {
    return axios.post(`${API_URL + API_PREFIX}/mgmt/session/shop`, shop, {
      headers: getUser(),
    });
  }

  async renewSession(headers={}) {
    return axios.get(`${API_URL + API_PREFIX}/session/renew`, {
      headers: headers
    });
  }
}

export default AuthService;
