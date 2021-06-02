loginForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);

  for (let entry of formData.entries()) {
    console.log(entry);
  }

  window.location = '/';
};