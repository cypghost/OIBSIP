function toggleForm(formType) {
    if (formType === 'login') {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    } else if (formType === 'register') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    }
}

const users = [];

// Function to generate a salt using the Web Crypto API
async function generateSalt() {
    const buffer = new Uint8Array(16);
    await window.crypto.getRandomValues(buffer);
    return Array.from(buffer, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

// Function to hash the password with the given salt using the Web Crypto API
async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const buffer = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, '0')).join('');
}

function isPasswordStrong(password) {
    // Use a regular expression to check multiple criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
}

async function register(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    // Check if the password meets certain criteria (e.g., minimum length)
    if (!isPasswordStrong(password)) {
        alert('Password does not meet the criteria for strength.');
        return;
    }

    // Check if the password and confirm password match
    if (password !== confirm_password) {
        alert('Passwords do not match.');
        return;
    }

    // Use a proper password hashing library in a real-world scenario
    const salt = await generateSalt();

    // Hash and salt the password
    const hashedPassword = await hashPassword(password, salt);

    // Check if the username is already taken
    if (users.some(user => user.name === name)){
        alert('Name is already taken!');
        return;
    }

    if(users.some(user => user.email === email)) {
        alert('Email is already taken.');
        return;
    }

    // Store the user information
    users.push({ name, email, password: hashedPassword, salt });

    alert('Registration successful. Please log in.');
    toggleForm('login');
    console.log(users);
}

async function login(event) {
    event.preventDefault();

    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;

    // Find the user by username
    const user = users.find(user => user.email === email);

    if(email == ""){
        alert('Please enter your email');
        return;
    }

    if(password == ""){
        alert('Please enter your password');
        return;
    }

    if (!user) {
        alert('User not found. Please register.');
        return;
    }

    const hashedEnteredPassword = await hashPassword(password, user.salt);
    // Verify the password (use a proper password hashing library)
    if (user.password === hashedEnteredPassword) {
        // Hide login and register forms
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('secured').style.display = 'block';
        document.getElementById('userName').textContent = user.name;
        setTimeout(function () {
            // Simulating redirect after 3 seconds
            showLoader();
        }, 3000);
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function showLoader() {
    document.getElementById('secured').style.display = 'none';
    document.getElementById('loader').style.display = 'block';

    setTimeout(function () {
        // Simulating redirect after 3 seconds
        window.location.href = 'secured-page.html';
    }, 3000);
}
