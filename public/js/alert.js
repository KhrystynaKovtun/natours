const hideAlert = () => {
  const alert = document.querySelector('.alert');
  alert && alert.parentElement.removeChild(alert);
}

export const alert = (status, message) => {
  hideAlert();
  const el = `<div class="alert alert--${status}">${message}</div>`;

  document.querySelector('body').insertAdjacentHTML('afterbegin', el)

  setTimeout(hideAlert, 1000);
}