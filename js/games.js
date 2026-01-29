const Games = {
    init() {
        const grid = document.getElementById('games-grid');
        if (grid) this.renderLibrary(grid);
        this.initEngine();
    },
    renderLibrary(container) {
        const games = JSON.parse(localStorage.getItem('pf_games') || '[]');
        if (games.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 50px; color:#a0a0a8;">No games found. Be the first to build!</div>';
            return;
        }
        container.innerHTML = games.map(g => `
            <div class="game-card">
                <div style="height:160px; background: linear-gradient(45deg, ${g.color}33, #16161a); display:flex; align-items:center; justify-content:center;">
                    <div style="width:40px; height:40px; background:${g.color}; box-shadow: 0 0 20px ${g.color}66"></div>
                </div>
                <div class="game-info">
                    <h3 style="margin-bottom:5px">${g.title}</h3>
                    <p style="font-size:0.85rem; color:#a0a0a8">Creator: ${g.creator}</p>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                        <span style="font-size:0.8rem; color:var(--primary)">${g.plays} Plays</span>
                        <button class="btn-primary" onclick="Games.playGame(${g.id})">Play</button>
                    </div>
                </div>
            </div>
        `).join('');
    },
    playGame(id) {
        localStorage.setItem('pf_current_game', id);
        window.location.href = 'play.html';
    },
    initEngine() {
        const canvas = document.getElementById('playCanvas');
        if (!canvas) return;

        const gameId = localStorage.getItem('pf_current_game');
        const games = JSON.parse(localStorage.getItem('pf_games') || '[]');
        const gameData = games.find(g => g.id == gameId);
        
        if (!gameData) return;
        document.getElementById('playingTitle').innerText = gameData.title;
        document.getElementById('gameCreator').innerText = gameData.creator;

        // Increment Play Count logic
        const updatedGames = games.map(g => {
            if(g.id == gameId) g.plays += 1;
            return g;
        });
        localStorage.setItem('pf_games', JSON.stringify(updatedGames));

        const ctx = canvas.getContext('2d');
        let player = { x: 400, y: 440, s: 25 };
        let obstacles = [];
        let score = 0;
        let isGameOver = false;

        function spawnObstacle() {
            if (Math.random() < 0.03 * gameData.difficulty) {
                obstacles.push({ x: Math.random() * (canvas.width-30), y: -30, s: 30, speed: 3 + Math.random() * 3 });
            }
        }

        function update() {
            if (isGameOver) return;
            spawnObstacle();
            obstacles.forEach(o => {
                o.y += o.speed;
                // Collision check
                if (player.x < o.x + o.s && player.x + player.s > o.x && player.y < o.y + o.s && player.y + player.s > o.y) {
                    isGameOver = true;
                    alert("Game Over! Score: " + score);
                    location.reload();
                }
            });
            obstacles = obstacles.filter(o => o.y < canvas.height);
            score++;
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Player
            ctx.fillStyle = gameData.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = gameData.color;
            ctx.fillRect(player.x, player.y, player.s, player.s);
            
            // Obstacles
            ctx.shadowBlur = 0;
            ctx.fillStyle = "#ff4444";
            obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.s, o.s));
            
            // UI
            ctx.fillStyle = "white";
            ctx.font = "20px Inter";
            ctx.fillText("Score: " + score, 20, 40);

            update();
            if (!isGameOver) requestAnimationFrame(draw);
        }

        canvas.onmousemove = (e) => {
            const rect = canvas.getBoundingClientRect();
            player.x = e.clientX - rect.left - player.s/2;
        };

        draw();
    }
};
Games.init();
