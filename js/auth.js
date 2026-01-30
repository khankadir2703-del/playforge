// Authentication Logic
const checkAuthState = (redirectIfLoggedOut = false) => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("User is logged in:", user.email);
            // नेविगेशन बार अपडेट करने के लिए main.js का इस्तेमाल होगा
        } else {
            if (redirectIfLoggedOut) {
                alert("Please login to access this page.");
                window.location.href = "login.html";
            }
        }
    });
};

// Signup Function
const signupUser = async (email, password) => {
    try {
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        return { success: true, user: cred.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Login Function
const loginUser = async (email, password) => {
    try {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: cred.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
