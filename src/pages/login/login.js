loginForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const value = Object.fromEntries(formData.entries());
  console.log(value);

  window.location = '/';
};