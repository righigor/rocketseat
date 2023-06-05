const openModalButton = document.getElementById('openModal');
const modalWrapper = document.querySelector('.modal-wrapper');

openModalButton.addEventListener('click', () => {
  modalWrapper.classList.remove('invisible');
});

document.addEventListener('keydown', (e) => {
  const key = e.key === 'Escape'
  if (key) {
    modalWrapper.classList.add('invisible');
  }
});