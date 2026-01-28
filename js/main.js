// LOGIN / SIGNUP
function login() {
  const user =
    document.getElementById("homeUser")?.value ||
    document.getElementById("dashUser")?.value;

  if (!user) {
    alert("Enter username");
    return;
  }

  localStorage.setItem("playforgeUser", user);
  // If first time login, set balance 0
  if (!localStorage.getItem(user + "_balance")) {
    localStorage.setItem(user + "_balance", 0);
  }
  window.location.href = "dashboard.html";
}

// LOAD DASHBOARD
function loadUser() {
  const user = localStorage.getItem("playforgeUser");
  if (user) {
    document.getElementById("welcomeUser").innerText = user;
    // Load balance
    const balance = localStorage.getItem(user + "_balance") || 0;
    document.getElementById("balance").innerText = "₹" + balance;
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("playforgeUser");
  window.location.href = "index.html";
}

// ADD EARNING (for example: publishing a game)
function addEarning(amount) {
  const user = localStorage.getItem("playforgeUser");
  if (!user) return alert("Login first!");
  
  let balance = parseFloat(localStorage.getItem(user + "_balance") || 0);
  balance += parseFloat(amount);
  localStorage.setItem(user + "_balance", balance);
  document.getElementById("balance").innerText = "₹" + balance;
  alert("You earned ₹" + amount + "!");
}

// WITHDRAW
function withdraw() {
  const user = localStorage.getItem("playforgeUser");
  if (!user) return alert("Login first!");
  
  let balance = parseFloat(localStorage.getItem(user + "_balance") || 0);
  if (balance <= 0) return alert("No balance to withdraw!");

  alert("You withdrew ₹" + balance);
  balance = 0;
  localStorage.setItem(user + "_balance", balance);
  document.getElementById("balance").innerText = "₹0";
}
