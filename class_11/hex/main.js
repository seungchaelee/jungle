const button = document.querySelector('#btn');

// Add Event Listener
button.addEventListener('click', () => {
    const hexNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    const value = document.querySelector('#hex-value');
    const body = document.querySelector('body');
    var hex = '#';

    // Code Generate Loop Through
    for (var i = 0; i <= 5; i++) {
        const index = Math.floor(Math.random() * hexNumbers.length);
        hex += hexNumbers[index];
    };

    //Show On Screen
    value.textContent = hex;
    body.style.background = hex;

});