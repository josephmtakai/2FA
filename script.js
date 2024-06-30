document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Document fully loaded and parsed');
    document.getElementById('loginButton').addEventListener('click', login);
    document.getElementById('verifyButton').addEventListener('click', verifyCode);
});

let generatedCode = '';

function login() {
    console.log('Login button clicked');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'password') {
        console.log('Username and password are correct');
        generatedCode = generateCode();
        sendCode(generatedCode);
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('twoFactorForm').style.display = 'block';
        document.getElementById('message').textContent = 'A 2FA code has been sent to your email.';
    } else {
        console.log('Invalid username or password');
        document.getElementById('message').textContent = 'Invalid username or password.';
    }
}

function generateCode() {
    console.log('Generating 2FA code');
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendCode(code) {
    console.log('joseph.mtakai@outlook.com:', code);  // Replace this with actual email sending in a real application
}

function verifyCode() {
    console.log('Verify button clicked');
    const code = document.getElementById('code').value;

    if (code === generatedCode) {
        console.log('2FA code is correct');
        document.getElementById('message').textContent = 'Authentication successful!';
    } else {
        console.log('Invalid 2FA code');
        document.getElementById('message').textContent = 'Invalid 2FA code. Please try again.';
    }
}
