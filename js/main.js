const modal=document.getElementById("modal");
const loginBtn=document.getElementById("loginBtn");
const userName=document.getElementById("userName");

loginBtn && (loginBtn.onclick=()=>modal.classList.remove("hidden"));

function login(){
const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
if(!name||!email) return alert("Fill details");
localStorage.setItem("pf_user",JSON.stringify({name,email}));
location.reload();
}

const user=JSON.parse(localStorage.getItem("pf_user"));
if(user){
loginBtn && (loginBtn.style.display="none");
userName && (userName.innerText=user.name,userName.classList.remove("hidden"));
}

// CREATE GAME
function saveGame(){
const gname=document.getElementById("gameName").value;
const gdesc=document.getElementById("gameDesc").value;
if(!gname) return alert("Game name required");
let games=JSON.parse(localStorage.getItem("pf_games")||"[]");
games.push({name:gname,desc:gdesc,plays:0});
localStorage.setItem("pf_games",JSON.stringify(games));
alert("Game saved");
}

// SHOW GAMES
const gameList=document.getElementById("gameList");
if(gameList){
let games=JSON.parse(localStorage.getItem("pf_games")||"[]");
games.forEach(g=>{
gameList.innerHTML+=`<div class="card"><h4>${g.name}</h4><p>${g.desc}</p></div>`;
});
}

// DASHBOARD
const myGames=document.getElementById("myGames");
const earn=document.getElementById("earn");
if(myGames){
let games=JSON.parse(localStorage.getItem("pf_games")||"[]");
let total=0;
games.forEach(g=>{
g.plays+=Math.floor(Math.random()*50);
total+=g.plays;
myGames.innerHTML+=`<p>${g.name} – ${g.plays} plays</p>`;
});
earn.innerText="$"+(total/1000).toFixed(2)+" (demo)";
}
