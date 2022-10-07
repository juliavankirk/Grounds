import axios from 'axios';

const API_URL =  process.env.VUE_APP_API_ENDPOINT + '/auth/' ||'http://localhost:3000/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      username: user.username,
      forename: user.forename,
      surname: user.surname,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();