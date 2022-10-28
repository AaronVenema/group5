const signupFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the signin form
    const userName = document.querySelector('#userName-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (userName && email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ userName, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/calendar');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
