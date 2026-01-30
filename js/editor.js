const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;

// Grid Snapping Function
function snapToGrid(val) {
    return Math.round(val / gridSize) * gridSize;
}

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const rect = canvas.getBoundingClientRect();
    
    // GDevelop style snapping
    const x = snapToGrid(e.clientX - rect.left);
    const y = snapToGrid(e.clientY - rect.top);

    gameObjects.push({ type, x, y, width: 40, height: 40 });
    draw();
    updateProperties(type, x, y);
});

function updateProperties(type, x, y) {
    document.getElementById('props').innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <span>Type:</span> <span style="color:#6366f1">${type}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <span>X Pos:</span> <span>${x}px</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
            <span>Y Pos:</span> <span>${y}px</span>
        </div>
    `;
}
