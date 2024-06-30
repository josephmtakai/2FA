function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(message => {
        if (message === '2FA code sent') {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('twoFactorForm').style.display = 'block';
            document.getElementById('message').textContent = 'A 2FA code has been sent to your email.';
        } else {
            document.getElementById('message').textContent = 'Invalid username or password.';
        }
    });
}

function verifyCode() {
    const code = document.getElementById('code').value;

    fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    })
    .then(response => response.text())
    .then(message => {
        document.getElementById('message').textContent = message;
    });
}
