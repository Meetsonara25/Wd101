document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#registrationForm');
    const dobInput = document.getElementById('dob');
    const table = document.querySelector('#dataTable tbody');

    // Date validation for age between 18 and 55
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = new Date(dobInput.value);
        const acceptedTerms = document.getElementById('terms').checked;

        const age = calculateAge(dob);

        if (age < 18 || age > 55) {
            alert('Your age must be between 18 and 55.');
            return;
        }

        // Retrieve existing data or initialize an empty array
        const usersData = JSON.parse(localStorage.getItem('formData')) || [];

        // Save form data to localStorage
        const userData = { name, email, password, dob: dobInput.value, acceptedTerms };
        usersData.push(userData);
        localStorage.setItem('formData', JSON.stringify(usersData));

        // Display the new data in the table
        appendRowToTable(userData);
        
        // Reset the form after submission
        form.reset();
    });

    // Load saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        savedData.forEach(user => appendRowToTable(user));
    }

    // Function to calculate age based on date of birth
    function calculateAge(dob) {
        const diff = Date.now() - dob.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    // Function to append a new row to the table
    function appendRowToTable(user) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptedTerms ? 'true' : 'false'}</td>
        `;
        table.appendChild(row);
    }
});