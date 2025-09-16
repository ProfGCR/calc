document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let operator = '';
    let firstValue = '';
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;

            if (button.classList.contains('number') || button.classList.contains('zero')) {
                if (shouldResetDisplay) {
                    currentInput = buttonValue;
                    shouldResetDisplay = false;
                } else {
                    currentInput += buttonValue;
                }
                display.value = currentInput;
            }

            if (button.classList.contains('operator')) {
                if (firstValue && operator && !shouldResetDisplay) {
                    calculate();
                }
                firstValue = currentInput;
                operator = buttonValue;
                shouldResetDisplay = true;
            }

            if (button.classList.contains('equals')) {
                calculate();
            }

            if (button.classList.contains('clear')) {
                currentInput = '';
                operator = '';
                firstValue = '';
                shouldResetDisplay = false;
                display.value = '';
            }
        });
    });

    function calculate() {
        if (!firstValue || !operator || !currentInput) return;

        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(currentInput);

        let result = 0;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    alert("Não é possível dividir por zero!");
                    currentInput = '';
                    operator = '';
                    firstValue = '';
                    display.value = '';
                    return;
                }
                result = num1 / num2;
                break;
        }

        display.value = result;
        currentInput = result;
        operator = '';
        firstValue = '';
        shouldResetDisplay = true;
    }
});