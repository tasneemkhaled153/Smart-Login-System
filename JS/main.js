function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(user) {
  let users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

// Show register form, hide others
function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('homePage').style.display = 'none';
}

// Show login form, hide others
function showLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('homePage').style.display = 'none';
}

// Handle registration
function handleRegister() {
  let name = document.getElementById('regName').value.trim();
  let email = document.getElementById('regEmail').value.trim().toLowerCase();
  let password = document.getElementById('regPassword').value;

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  let users = getUsers();

  let userExists = users.some(u => u.email === email);

  if (userExists) {
    alert("This email is already registered!");
    return;
  }

  saveUser({ name, email, password });
  alert("Registration successful! You can now log in.");
  showLogin();
}

// Handle login
function handleLogin() {
  let email = document.getElementById('loginEmail').value.trim().toLowerCase();
  let password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  let users = getUsers();
  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  // Show home page
  document.getElementById('displayName').textContent = user.name;
  document.getElementById('homePage').style.display = 'block';

  // Hide forms
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'none';
}

// Handle logout
function handleLogout() {
  document.getElementById('homePage').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
  // Buttons
  let registerBtn = document.getElementById('registerBtn');
  let loginBtn = document.getElementById('loginBtn');
  let logoutBtn = document.getElementById('logoutBtn');

  let goToRegisterLink = document.getElementById('goToRegister');
  let goToLoginLink = document.getElementById('goToLogin');

  // Attach events
  registerBtn.addEventListener('click', handleRegister);
  loginBtn.addEventListener('click', handleLogin);
  logoutBtn.addEventListener('click', handleLogout);

  goToRegisterLink.addEventListener('click', function(e) {
    e.preventDefault();
    showRegister();
  });

  goToLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    showLogin();
  });

  // Default view
  showLogin();
});