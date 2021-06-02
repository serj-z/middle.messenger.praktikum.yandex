formPassword.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(formPassword);
  const value = Object.fromEntries(formData.entries());
  console.log(value);
};