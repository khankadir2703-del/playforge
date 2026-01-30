// Auth State Observer
// यह चेक करता है कि यूजर लॉग-इन है या नहीं
auth.onAuthStateChanged((user) => {
    const authSection = document.getElementById('authSection');
    const authOnlyLinks = document.querySelectorAll('.auth-only');

    if (user) {
        // अगर यूजर लॉग-इन है
        if (authSection) {
            authSection.innerHTML = `
                <span class="user-email">${user.email}</span>
                <button onclick="logout()" class="btn secondary">Logout</button>
            `;
        }
        // छुपे हुए लिंक्स (जैसे Dashboard) दिखाएँ
        authOnlyLinks.forEach(link => link.style.display = 'block');
    } else {
        // अगर यूजर लॉग-आउट है
        if (authSection) {
            authSection.innerHTML = `
                <a href="login.html" class="btn secondary">Login</a>
                <a href="signup.html" class="btn primary">Get Started</a>
            `;
        }
        authOnlyLinks.forEach(link => link.style.display = 'none');
    }
});

// Logout Function
function logout() {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Logout Error:', error);
    });
}

// Global UI Animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.boxShadow = '0 0 15px var(--primary)';
    });
    button.addEventListener('mouseout', () => {
        button.style.boxShadow = 'none';
    });
});
