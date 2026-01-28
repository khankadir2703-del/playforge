function login(inputId) {
  const username = document.getElementById(inputId).value;

  if (username === "") {
    alert("Username likho");
    return;
  }

  localStorage.setItem("playforgeUser", username);
  window.location.href = "dashboard.html";
}

function loadUser() {
  const user = localStorage.getItem("playforgeUser");
  if (user) {
    document.getElementById("welcomeUser").innerText = user;
  }
}

function logout() {
  localStorage.removeItem("playforgeUser");
  window.location.href = "index.html";
}
