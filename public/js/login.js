const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value;
  const password = document.querySelector('#password-login').value;

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
     fetch('/calendar_route')
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);