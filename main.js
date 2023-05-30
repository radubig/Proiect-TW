window.onload = function() {
    // fix the issue with drop-down animation
    let dropdown = document.getElementById('dropdown');
    dropdown.addEventListener('mouseover', DropdownCallback);

    function DropdownCallback(e) {
        let dropdownmenu = document.getElementById('dropdown-menu');
        dropdownmenu.classList.add('hovered');
    }
}