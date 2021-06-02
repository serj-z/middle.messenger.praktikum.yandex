formProfile.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(formProfile);

  for (let entry of formData.entries()) {
    console.log(entry);
  }
};