window.onload = function() {
    let dropdown = document.getElementById('dropdown');
    dropdown.addEventListener('mouseover', DropdownCallback);

    function DropdownCallback(e) {
        let dropdownmenu = document.getElementById('dropdown-menu');
        dropdownmenu.classList.add('hovered');
    }
}