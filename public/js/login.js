/* eslint-disable*/
import axios from 'axios'; 
import { alert } from './alert'

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if(res.data.status === 'success') {
      alert('success', 'You are successfully logged in!')
      setTimeout(() => { location.assign('/')}, 500);
    }
  } catch (err) {
    alert('error', err.response.data.message)
    console.log(err);
  }
};

export const logout = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/api/v1/users/logout'
      });

      if(res.data.status === 'success') {
        alert('success', 'You are successfully logged out!')
        location.reload(true);
        location.assign('/');
      }
  } catch(err) {
    alert('error', 'We have difficulties to log you out!')
  }
}
