formPassword.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(formPassword);

  for (let entry of formData.entries()) {
    console.log(entry);
  }
};