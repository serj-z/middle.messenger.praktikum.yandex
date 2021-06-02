signupForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  const value = Object.fromEntries(formData.entries());
  console.log(value);
};