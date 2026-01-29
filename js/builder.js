const canvas=document.getElementById("editor");
const ctx=canvas.getContext("2d");

let player={x:50,y:250,w:30,h:30};
let enemy={x:500,y:250,w:30,h:30};

document.addEventListener("keydown",e=>{
if(e.key==="ArrowLeft") player.x-=5;
if(e.key==="ArrowRight") player.x+=5;
});

function draw(){
ctx.clearRect(0,0,600,300);
ctx.fillStyle="cyan";
ctx.fillRect(player.x,player.y,player.w,player.h);
ctx.fillStyle="red";
ctx.fillRect(enemy.x,enemy.y,enemy.w,enemy.h);
requestAnimationFrame(draw);
}
draw();

function saveGame(){
const name=document.getElementById("gameName").value;
if(!name) return alert("Game name required");
let games=JSON.parse(localStorage.getItem("pf_games")||"[]");
games.push({name});
localStorage.setItem("pf_games",JSON.stringify(games));
alert("Game Published!");
}

