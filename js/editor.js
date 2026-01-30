const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameObjects = [];

// Drag and Drop Logic
function drag(ev) {
    ev.dataTransfer.setData("type", ev.target.id);
}

canvas.addEventListener('dragover', (e) => e.preventDefault());

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gameObjects.push({ type, x, y, width: 50, height: 50 });
    draw();
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameObjects.forEach(obj => {
        ctx.fillStyle = obj.type === 'player' ? '#6366f1' : '#ef4444';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    });
}

document.getElementById('exportBtn').addEventListener('click', () => {
    const gameData = {
        version: "1.0",
        objects: gameObjects
    };
    const blob = new Blob([JSON.stringify(gameData)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "my-game-config.json";
    a.click();
    alert("Game configuration exported! You can now publish it.");
});
