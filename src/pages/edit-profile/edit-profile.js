formProfile.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(formProfile);
  const value = Object.fromEntries(formData.entries());
  console.log(value);
};