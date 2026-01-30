// 1. Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameObjects = [];
const gridSize = 20;

// 2. Grid Snapping (GDevelop Style)
function snapToGrid(val) {
    return Math.round(val / gridSize) * gridSize;
}

// 3. Drag and Drop Logic
function drag(ev) {
    ev.dataTransfer.setData("type", ev.target.id);
}

canvas.addEventListener('dragover', (e) => e.preventDefault());

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const rect = canvas.getBoundingClientRect();
    
    // Mouse Position to Grid
    const x = snapToGrid(e.clientX - rect.left - 20);
    const y = snapToGrid(e.clientY - rect.top - 20);

    // Add Object
    const newObj = { 
        id: Date.now(), 
        type, 
        x, 
        y, 
        width: 40, 
        height: 40,
        color: type === 'sprite' ? '#6366f1' : '#ff4444'
    };
    
    gameObjects.push(newObj);
    draw();
    showProperties(newObj);
});

// 4. Drawing Logic
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Grid Background (Optional but helpful)
    ctx.strokeStyle = '#222';
    for(let i=0; i<canvas.width; i+=gridSize) {
        ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); ctx.stroke();
    }
    for(let i=0; i<canvas.height; i+=gridSize) {
        ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); ctx.stroke();
    }

    // Draw Objects
    gameObjects.forEach(obj => {
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        
        // Selection Border
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
    });
}

// 5. Property Grid Update
function showProperties(obj) {
    const propsDiv = document.getElementById('props');
    propsDiv.innerHTML = `
        <div style="background:#2d2d3d; padding:10px; border-radius:5px;">
            <p><strong>Object:</strong> ${obj.type}</p>
            <p><strong>X:</strong> ${obj.x}</p>
            <p><strong>Y:</strong> ${obj.y}</p>
            <button onclick="deleteObject(${obj.id})" class="btn secondary small" style="width:100%; margin-top:10px; background:#ff4444; border:none;">Delete</button>
        </div>
    `;
}

window.deleteObject = function(id) {
    gameObjects = gameObjects.filter(o => o.id !== id);
    draw();
    document.getElementById('props').innerHTML = "Select an object...";
};

// 6. BUTTON LOGIC (Connecting UI to Functions)
document.addEventListener('DOMContentLoaded', () => {
    // Preview Button
    const previewBtn = document.querySelector('.btn.secondary.small'); // UI में पहला secondary button
    if(previewBtn) {
        previewBtn.onclick = () => {
            alert("Starting Preview Mode...\nUse WASD to test (Simulation only)");
            // यहाँ आप गेम का एक अलग पॉपअप खोल सकते हैं
        };
    }

    // Publish/Export Button
    const publishBtn = document.querySelector('.btn.primary.small'); // UI में पहला primary button
    if(publishBtn) {
        publishBtn.onclick = () => {
            if(gameObjects.length === 0) return alert("Canvas is empty!");
            
            const gameData = JSON.stringify(gameObjects);
            localStorage.setItem('tempGameData', gameData); // पब्लिश पेज के लिए सेव करें
            
            alert("Game Compiled! Redirecting to Publish page...");
            window.location.href = "publish.html";
        };
    }
});
