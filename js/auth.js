const user = localStorage.getItem("pf_user");

function login(){
const name=document.getElementById("username").value;
if(!name) return alert("Enter name");
localStorage.setItem("pf_user",name);
location.reload();
}

function logout(){
localStorage.removeItem("pf_user");
location.href="index.html";
}

if(user){
document.getElementById("loginBox")?.remove();
document.getElementById("logoutBtn")?.classList.remove("hidden");
document.getElementById("name") && (document.getElementById("name").innerText=user);
}

