const logout = async function() {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
      alert('logged out!')
    } else {
      console.log(response.ok);
      alert('Failed to log out');
    }
  };
  
  document.querySelector('#logout-link').addEventListener('click', logout);