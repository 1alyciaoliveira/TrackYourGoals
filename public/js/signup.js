const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Email already in use.') {
          alert('This email already exists');
        } else {
          document.location.replace('/profile');
        }
      } else {
        alert(response.statusText);
      }
    }
  };

document.querySelector('#signup').addEventListener('click', signupFormHandler);