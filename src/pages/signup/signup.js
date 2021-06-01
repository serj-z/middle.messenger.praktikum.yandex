signupForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);

  for (let entry of formData.entries()) {
    console.log(entry);
  }
};