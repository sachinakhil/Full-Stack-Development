document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Form submitted successfully!');
            saveFormAsPDF();
            form.reset();
        }
    });

    function validateForm() {
        let isValid = true;

        // Name validation
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            removeError(name);
        }

        // Email validation
        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(email);
        }

        // Phone validation
        const phone = document.getElementById('phone');
        if (phone.value.trim() === '') {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else {
            removeError(phone);
        }

        // Date of Birth validation
        const dob = document.getElementById('dob');
        if (dob.value === '') {
            showError(dob, 'Date of Birth is required');
            isValid = false;
        } else {
            removeError(dob);
        }

        // Course validation
        const course = document.getElementById('course');
        if (course.value === '') {
            showError(course, 'Please select a course');
            isValid = false;
        } else {
            removeError(course);
        }

        return isValid;
    }

    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.className === 'error') {
            errorElement.textContent = message;
        } else {
            const error = document.createElement('div');
            error.className = 'error';
            error.textContent = message;
            input.parentNode.insertBefore(error, input.nextSibling);
        }
    }

    function removeError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.className === 'error') {
            errorElement.remove();
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone);
    }

    function saveFormAsPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const formData = {
            Name: document.getElementById('name').value,
            Email: document.getElementById('email').value,
            Phone: document.getElementById('phone').value,
            'Date of Birth': document.getElementById('dob').value,
            Course: document.getElementById('course').value
        };

        let yPos = 20;
        doc.setFontSize(16);
        doc.text('Registration Form', 20, yPos);
        yPos += 10;

        doc.setFontSize(12);
        for (const [key, value] of Object.entries(formData)) {
            yPos += 10;
            doc.text(`${key}: ${value}`, 20, yPos);
        }

        doc.save('registration_form.pdf');
    }
});
