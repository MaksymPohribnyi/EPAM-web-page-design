document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('registrationForm');
    const ticketSelectors = document.querySelectorAll('.ticket-selector');
    const totalCostDisplay = document.getElementById('totalCost');
    const successMessage = document.getElementById('successMessage');
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');

    // --- Functionality 1: Dynamic Price Calculation ---
    // This satisfies the requirement that JS events affect functionality
    ticketSelectors.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const price = e.target.value;
            totalCostDisplay.textContent = price;
        });
    });

    // --- Functionality 2: Form Validation & Submission ---
    form.addEventListener('submit', (e) => {
        // Prevent default submission to handle validation via JS
        e.preventDefault();

        // Reset previous error states
        resetErrors();

        let isValid = true;

        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Full Name is required');
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // If valid, show success message
        if (isValid) {
            // Simulate form processing
            form.style.display = 'none'; // Hide form
            successMessage.classList.remove('hidden'); // Show success
        }
    });

    // Helper: Show Error
    function showError(inputElement, message) {
        inputElement.classList.add('error');
        const errorSpan = inputElement.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-msg')) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
    }

    // Helper: Reset Errors
    function resetErrors() {
        const inputs = document.querySelectorAll('.form-input');
        const errorSpans = document.querySelectorAll('.error-msg');

        inputs.forEach(input => input.classList.remove('error'));
        errorSpans.forEach(span => span.style.display = 'none');
    }

    // Helper: Simple Email Regex
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});