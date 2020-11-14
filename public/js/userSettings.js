import axios from 'axios'; 
import { alert } from './alert'

export const updateUserInfo = async (data, type) => {
  const url = `http://127.0.0.1:8080/api/v1/users/${type === 'password' ? 'updateMyPassword' : 'updateMe'}`;
  try {
    const res = await axios({
      method: 'patch',
      url,
      data,
    });

    if(res.data.status === 'success') {
      alert('success', `You successfully updated ${type}!`)
    }
  } catch (err) {
    alert('error', err.response.data.message)
    console.log(err);
  }
}