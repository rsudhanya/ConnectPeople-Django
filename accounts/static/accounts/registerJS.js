// const regform = document.getElementById('register-form');
const subBtn = document.getElementById('subBtn')
const registerpassword = document.getElementById('register-password');
const confirmPassword = document.getElementById('confirmPassword');

// console.log(regform);

subBtn.addEventListener('click', e => {
  console.log(registerpassword.textContent);
  console.log(confirmPassword.textContent);
});
