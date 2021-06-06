import { listenEvent } from '/scripts/globalFunctions.js';

const modalButtons = document.querySelectorAll('.modal-bg, .modal__btn');
if(modalButtons.length) {
  listenEvent(modalButtons, 'click', () => {
    document.querySelectorAll('.modal').forEach(item => item.classList.remove("opened"));
  });
}

const inputs = document.querySelectorAll('.dynamic-label .input__field');
if(inputs.length) {
  listenEvent(inputs, 'keyup', function() {
    this.setAttribute('value', this.value);
  });
}
