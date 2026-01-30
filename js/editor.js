if (!Auth.isLoggedIn()) {
    alert("Please login to access the Builder");
    window.location.href = 'index.html';
}

const canvas = document.getElementById('builderCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let player = { x: 290, y: 190, size: 20, color: '#00ff88' };
    
    function draw() {
        ctx.fillStyle = '#0a0a0c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Grid lines for "studio" look
        ctx.strokeStyle = '#1e1e24';
        for(let i=0; i<canvas.width; i+=40) {
            ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i, canvas.height); ctx.stroke();
        }
        for(let i=0; i<canvas.height; i+=40) {
            ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(canvas.width, i); ctx.stroke();
        }

        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.size, player.size);
        requestAnimationFrame(draw);
    }

    window.onkeydown = (e) => {
        if(e.key === 'ArrowUp') player.y -= 10;
        if(e.key === 'ArrowDown') player.y += 10;
        if(e.key === 'ArrowLeft') player.x -= 10;
        if(e.key === 'ArrowRight') player.x += 10;
    };

    document.getElementById('playerColor').oninput = (e) => {
        player.color = e.target.value;
    };

    document.getElementById('saveGame').onclick = () => {
        const title = document.getElementById('gameTitle').value || "Project X";
        const games = JSON.parse(localStorage.getItem('pf_games') || '[]');
        
        const newGame = {
            id: Date.now(),
            title: title,
            creator: Auth.getUser(),
            color: player.color,
            difficulty: parseInt(document.getElementById('difficulty').value),
            plays: 0
        };

        games.push(newGame);
        localStorage.setItem('pf_games', JSON.stringify(games));
        alert('Game Published Successfully to Mohammad Khan\'s PlayForge!');
        window.location.href = 'games.html';
    };

    draw();
}
