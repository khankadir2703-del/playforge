const list=document.getElementById("games");
let games=JSON.parse(localStorage.getItem("pf_games")||"[]");

if(list){
games.forEach((g,i)=>{
list.innerHTML+=`
<div class="card">
<h3>${g.name}</h3>
<button onclick="play(${i})">Play</button>
</div>`;
});
}

function play(i){
localStorage.setItem("play",i);
location.href="play.html";
}

const canvas=document.getElementById("game");
if(canvas){
const ctx=canvas.getContext("2d");
let p={x:50,y:250,w:30,h:30};
document.addEventListener("keydown",e=>{
if(e.key==="ArrowRight") p.x+=5;
});
function loop(){
ctx.clearRect(0,0,600,300);
ctx.fillStyle="lime";
ctx.fillRect(p.x,p.y,p.w,p.h);
requestAnimationFrame(loop);
}
loop();
}

