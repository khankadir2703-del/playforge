// Signup Logic
async function handleSignup(email, password, role) {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        await db.collection('users').doc(res.user.uid).set({
            uid: res.user.uid,
            email: email,
            role: role,
            revenue: 0,
            createdAt: new Date()
        });
        window.location.href = 'dashboard.html';
    } catch (err) { alert(err.message); }
}

// Login Logic
async function handleLogin(email, password) {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        window.location.href = 'dashboard.html';
    } catch (err) { alert(err.message); }
}

// Logout
function logout() {
    auth.signOut().then(() => window.location.href = 'index.html');
}
