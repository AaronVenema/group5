const loginHandler = (event) => {
   fetch('/login', {
    method: 'GET',
  });
  window.location.href = (`${document.location.origin}/login`)
  }


const signupHandler = (event) => {
   fetch('/signup', {
    method: 'GET',
  });
  window.location.href =(`${document.location.origin}/signup`)
  }


document.getElementById('login').addEventListener('click', loginHandler);

document.getElementById('signUp').addEventListener('click', signupHandler);