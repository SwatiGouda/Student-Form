document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!username || !password) {
    message.style.color = '#c62828'; // red color
    message.textContent = "Both fields are required.";
    return;
  }

  // Simple hardcoded validation
  if (username === "admin" && password === "1234")
      {
    message.style.color = "green";
    message.textContent = "Login successful! Redirecting...";
    
    // Redirect after short delay so user can see message
    setTimeout(() => {
      window.location.href = "dashboard.html"; // change to your target page
    }, 1500);
    
  } else {
    message.style.color = '#c62828';
    message.textContent = "Invalid username or password.";
  }
  window.location.href = "dashboard.html";

});
