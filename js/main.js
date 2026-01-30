// Navbar और UI का डायनामिक कंट्रोल
auth.onAuthStateChanged((user) => {
    const authSection = document.getElementById('authSection');
    if (authSection) {
        if (user) {
            authSection.innerHTML = `
                <span style="margin-right:15px; color:#a1a1aa;">${user.email}</span>
                <a href="dashboard.html" class="btn secondary" style="margin-right:10px;">Dashboard</a>
                <button onclick="auth.signOut().then(()=>window.location.reload())" class="btn secondary">Logout</button>
            `;
        } else {
            authSection.innerHTML = `
                <a href="login.html" class="btn secondary" style="margin-right:10px;">Login</a>
                <a href="signup.html" class="btn primary">Join Forge</a>
            `;
        }
    }
});
