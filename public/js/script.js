const signUpLink = document.querySelector("#signup-link");
const loginForm = document.querySelector("#login-form");
const signUpForm = document.querySelector("#signup-form");

signUpLink.onclick = function (event) {
    event.preventDefault();
    loginForm.parentNode.innerHTML = signUpForm.outerHTML; //to be fixed
};


const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    /*
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }

    */

    console.log(email, password);
  
  };
  

  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

   /* 
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }

      */

    console.log(username, email, password);
  };

  

const loginBtn = document.querySelector("#login");
loginBtn.onclick = loginFormHandler;

const signBtn = document.querySelector("#signup");
signBtn.onclick = signupFormHandler;
