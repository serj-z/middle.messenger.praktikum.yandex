import {listenEvent} from '/scripts/globalFunctions.js';

listenEvent('.profile__avatar', 'click', () => {
  document.querySelector('.change-avatar').classList.add('opened');
});

listenEvent(avatar, 'change', () => {
  const file = avatar.files[0];
  const label = document.querySelector('.avatar-label');
  label.textContent = file.name;
  label.classList.remove('t-purple');
  console.log(file.name);
});