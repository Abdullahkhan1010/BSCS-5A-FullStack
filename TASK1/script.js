// Modern calculator theme toggle
const themeSwitch = document.getElementById('themeSwitch');
const themeLabel = document.getElementById('themeLabel');

themeSwitch.addEventListener('change', function() {
    if (themeSwitch.checked) {
        document.body.classList.add('dark');
        themeLabel.textContent = 'Switch to Light Theme';
    } else {
        document.body.classList.remove('dark');
        themeLabel.textContent = 'Switch to Dark Theme';
    }
});
