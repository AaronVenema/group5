const logOutHandler = async (event) => {
    event.preventDefault();

    // Collect values from the logout form
    const logout = document.querySelector('#logout').value;

    if (logout) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            // body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            //fetch('/')
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#logout')
    .addEventListener('click', loginOutHandler);