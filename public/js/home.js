const loginHandler = (event) => {
   fetch('/login', {
    method: 'GET',
  });
  window.location.href = ('login')
  }


const signupHandler = (event) => {
   fetch('/signup', {
    method: 'GET',
  });
  window.location.href =('signup')
  }


document.getElementById('login').addEventListener('click', loginHandler);

document.getElementById('signUp').addEventListener('click', signupHandler);