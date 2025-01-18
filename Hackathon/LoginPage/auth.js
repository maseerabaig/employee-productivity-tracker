document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }
});

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // TODO: Implement actual login logic here
  console.log("Login attempt:", { email, password });

  // Simulate successful login
  alert("Login successful!");
  window.location.href = "../role/index.html"; // Redirect to main app page
}

function handleSignup(event) {
  event.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // TODO: Implement actual signup logic here
  console.log("Signup attempt:", { fullName, email, password });

  // Simulate successful signup
  alert("Signup successful! Please log in.");
  window.location.href= "../LoginPage/login.html"; // Redirect to login page
}

function validatePassword(password) {
  // TODO: Implement password validation rules
  return password.length >= 8;
}
