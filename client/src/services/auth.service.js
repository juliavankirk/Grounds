import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
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