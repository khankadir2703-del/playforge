const Dashboard = {
    init() {
        if (!Auth.isLoggedIn()) {
            window.location.href = 'index.html';
            return;
        }

        const user = Auth.getUser();
        const games = JSON.parse(localStorage.getItem('pf_games') || '[]');
        const myGames = games.filter(g => g.creator === user);
        
        let totalPlays = 0;
        myGames.forEach(g => totalPlays += g.plays);
        
        // 1000 plays = $1 logic
        const earnings = (totalPlays * 0.001).toFixed(2);
        
        document.getElementById('totalPlays').innerText = totalPlays;
        document.getElementById('totalEarnings').innerText = `$${earnings}`;

        if (parseFloat(earnings) >= 1.00) {
            document.getElementById('withdrawSection').classList.remove('hidden');
        }

        const list = document.getElementById('myGamesList');
        if (myGames.length > 0) {
            list.innerHTML = myGames.map(g => `
                <div class="stat-card" style="margin-bottom:10px; border-top:none; border-left:4px solid var(--primary); display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong style="display:block; font-size:1.1rem;">${g.title}</strong>
                        <span style="font-size:0.8rem; color:var(--text-dim)">Global Play Count</span>
                    </div>
                    <div style="text-align:right">
                        <span style="font-size:1.5rem; font-weight:800">${g.plays}</span>
                    </div>
                </div>
            `).join('');
        } else {
            list.innerHTML = '<div style="color:var(--text-dim)">You haven\'t published any games yet.</div>';
        }
    }
};

Dashboard.init();
