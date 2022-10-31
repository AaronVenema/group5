const signupFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the signin form
    const name = document.querySelector('#name').value;
    console.log(name)
    const email = document.querySelector('#email').value;
    console.log(email)
    const password = document.querySelector('#password').value;
    console.log(password)

    if (name && email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            fetch('/calendar_routes')
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
