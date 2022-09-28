import { Api } from './Api';

class AuthService {
  login(user) {
    return axios
      .post(Api.post('/auth/login'), {
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
    return axios.post(Api.post('/auth/register'), {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();