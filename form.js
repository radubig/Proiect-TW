window.onload = function() {
    let dropdown = document.getElementById('dropdown');
    dropdown.addEventListener('mouseover', DropdownCallback);

    function DropdownCallback(e) {
        let dropdownmenu = document.getElementById('dropdown-menu');
        dropdownmenu.classList.add('hovered');
    }

    // handle form data on loading page & on input
    const form = document.querySelector('form');

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const phone_no = form.querySelector('#phone-no');
    const message = form.querySelector('#message');

    name.value = localStorage.getItem('name') || '';
    email.value = localStorage.getItem('email') || '';
    phone_no.value = localStorage.getItem('phone_no') || '';
    message.value = localStorage.getItem('message') || '';

    function addLocalStorageListener(key, element) {
        element.addEventListener('input', () => {
            localStorage.setItem(key, element.value);
        });
    }

    addLocalStorageListener('name', name);
    addLocalStorageListener('email', email);
    addLocalStorageListener('phone_no', phone_no);
    addLocalStorageListener('message', message);

    // reset button
    let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('mousedown', () => {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('phone_no');
        localStorage.removeItem('message');
    })
}