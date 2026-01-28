
// Placeholder JS for future Game Builder & Dashboard
console.log("PlayForge base JS loaded");

// Example: Click handler for CTA
document.addEventListener('DOMContentLoaded', () => {
  const cta = document.querySelector('.cta');
  if(cta){
    cta.addEventListener('click', () => {
      console.log("Start Creating clicked");
    });
  }
});
// Game Builder State
let gameData = {
  player: null,
  enemies: [],
  background: null
};

function addPlayer() {
  gameData.player = { x: 50, y: 350, color: "blue" };
  alert("Player added!");
  drawGame();
}

function addEnemy() {
  const enemy = { x: Math.random() * 500, y: 350, color: "red" };
  gameData.enemies.push(enemy);
  alert("Enemy added!");
  drawGame();
}

function setBackground() {
  gameData.background = "#282c44";
  alert("Background set!");
  drawGame();
}

function drawGame() {
  const canvas = document.getElementById("gameCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Clear canvas
  ctx.fillStyle = gameData.background || "#1a1f35";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Player
  if (gameData.player) {
    ctx.fillStyle = gameData.player.color;
    ctx.fillRect(gameData.player.x, gameData.player.y, 30, 30);
  }

  // Draw Enemies
  gameData.enemies.forEach(enemy => {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, 30, 30);
  });
}

function previewGame() {
  alert("Preview your game in the canvas above!");
  drawGame();
}

function publishGame() {
  // Placeholder: Save game to localStorage (future: Firebase)
  localStorage.setItem("myGame", JSON.stringify(gameData));
  alert("Game published! You can view it in your Dashboard.");
}
// Load published game in dashboard
function loadDashboard() {
  const savedGame = localStorage.getItem("myGame");
  const gamesList = document.getElementById("userGames");
  const gamesCreated = document.getElementById("gamesCreated");
  if (savedGame) {
    gamesList.innerHTML = "<li>My First Game <button class='cta'>Edit</button></li>";
    gamesCreated.textContent = 1;
    document.getElementById("totalViews").textContent = 5200;
    document.getElementById("earnings").textContent = "₹350";
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
});
