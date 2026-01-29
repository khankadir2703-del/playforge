const Auth = {
    init() {
        this.updateNav();
        this.bindEvents();
    },
    bindEvents() {
        const loginBtn = document.getElementById('loginBtn');
        const modal = document.getElementById('authModal');
        const authForm = document.getElementById('authForm');
        
        if (loginBtn) {
            loginBtn.onclick = () => modal.style.display = 'block';
        }

        window.onclick = (e) => { 
            if(e.target == modal) modal.style.display = 'none'; 
        };

        if (authForm) {
            authForm.onsubmit = (e) => {
                e.preventDefault();
                const user = document.getElementById('username').value;
                localStorage.setItem('pf_user', user);
                localStorage.setItem('pf_logged', 'true');
                window.location.href = 'dashboard.html';
            };
        }

        const logout = document.getElementById('logoutBtn');
        if (logout) {
            logout.onclick = () => {
                localStorage.removeItem('pf_logged');
                localStorage.removeItem('pf_user');
                window.location.href = 'index.html';
            };
        }

        const profileName = document.getElementById('profileUser');
        if (profileName) profileName.innerText = this.getUser();
    },
    updateNav() {
        const section = document.getElementById('auth-section');
        const isLogged = localStorage.getItem('pf_logged');
        const user = localStorage.getItem('pf_user');

        if (isLogged && section) {
            section.innerHTML = `
                <a href="dashboard.html">Dashboard</a>
                <a href="account.html" style="color:var(--primary)">👤 ${user}</a>
            `;
        }
    },
    getUser() { 
        return localStorage.getItem('pf_user') || 'Guest'; 
    },
    isLoggedIn() {
        return localStorage.getItem('pf_logged') === 'true';
    }
};

Auth.init();
