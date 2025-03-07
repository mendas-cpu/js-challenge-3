document.addEventListener('DOMContentLoaded', () => {
    const urlList = document.getElementById('url-list');
    const modifyForm = document.getElementById('modify-form');
    const modifyInput = document.getElementById('modify-input');
    let currentUrlElement = null;

    urlList.addEventListener('click', (event) => {
        if (event.target.classList.contains('modify-btn')) {
            currentUrlElement = event.target.parentElement.querySelector('.url');
            modifyInput.value = currentUrlElement.textContent;
            modifyForm.style.display = 'block';
        }
    });

    modifyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (currentUrlElement) {
            currentUrlElement.textContent = modifyInput.value;
            modifyForm.style.display = 'none';
            modifyInput.value = '';
            currentUrlElement = null;
        }
    });
});