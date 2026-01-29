// ================== ELEMENTS ==================
const loginBtn = document.getElementById("loginBtn");
const authModal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");

const signupBtn = document.getElementById("signupBtn");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");

const authName = document.getElementById("authName");
const authEmail = document.getElementById("authEmail");
const authPass = document.getElementById("authPass");

const userBox = document.getElementById("userBox");
const usernameSpan = document.getElementById("username");
const logoutBtn = document.getElementById("logoutBtn");

// ================== OPEN / CLOSE MODAL ==================
loginBtn.onclick = () => {
  authModal.classList.remove("hidden");
};

closeModal.onclick = () => {
  authModal.classList.add("hidden");
};

// ================== SIGNUP ==================
signupBtn.onclick = () => {
  if (!authName.value || !authEmail.value || !authPass.value) {
    alert("Please fill all fields");
    return;
  }

  const user = {
    name: authName.value,
    email: authEmail.value,
    password: authPass.value
  };

  localStorage.setItem("playforge_user", JSON.stringify(user));
  localStorage.setItem("playforge_loggedin", "yes");

  alert("Signup successful!");
  authModal.classList.add("hidden");
  showUser();
};

// ================== LOGIN ==================
loginSubmitBtn.onclick = () => {
  const savedUser = JSON.parse(localStorage.getItem("playforge_user"));

  if (!savedUser) {
    alert("No account found. Please signup first.");
    return;
  }

  if (
    authEmail.value === savedUser.email &&
    authPass.value === savedUser.password
  ) {
    localStorage.setItem("playforge_loggedin", "yes");
    alert("Login successful!");
    authModal.classList.add("hidden");
    showUser();
  } else {
    alert("Wrong email or password");
  }
};

// ================== SHOW USER ==================
function showUser() {
  const isLoggedIn = localStorage.getItem("playforge_loggedin");
  const savedUser = JSON.parse(localStorage.getItem("playforge_user"));

  if (isLoggedIn === "yes" && savedUser) {
    loginBtn.style.display = "none";
    userBox.classList.remove("hidden");
    usernameSpan.innerText = savedUser.name;
  }
}

// ================== LOGOUT ==================
logoutBtn.onclick = () => {
  localStorage.removeItem("playforge_loggedin");
  alert("Logged out");
  location.reload();
};

// ================== AUTO CHECK LOGIN ==================
showUser();
