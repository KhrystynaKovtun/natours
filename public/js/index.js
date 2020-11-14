/* eslint-disable*/
import '@babel/polyfill';
import { login, logout } from './login.js';
import { updateUserInfo } from './userSettings.js';
import { displayMap } from './mapbox';

const locations = document.getElementById('map');
const loginForm = document.querySelector('.form-login');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-passwords');
const logoutBtn = document.querySelector('.nav__el--logout');

if (locations) {
  displayMap(JSON.parse(locations.dataset.locations));
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('logging out');
    logout();
  });
}

loginForm &&
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    login(email, password);
  });

userDataForm &&
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', document.getElementById('name').value);
    form.append('photo', document.getElementById('photo').files[0]);
    form.append('email', document.getElementById('email').value);

    updateUserInfo(form, 'data');
  });

userPasswordForm &&
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const currentPassword = document.getElementById('password-current').value;
    const confirmPassword = document.getElementById('password-confirm').value;

    await updateUserInfo(
      { password, currentPassword, confirmPassword },
      'password'
    );

    document.getElementById('password').value = '';
    document.getElementById('password-current').value = '';
    document.getElementById('password-confirm').value = '';
  });
