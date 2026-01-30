// Database Operations

// 1. गेम डेटा को Firestore में सेव करना
const saveGameToDB = async (gameData) => {
    try {
        const res = await db.collection('games').add({
            ...gameData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            views: 0,
            revenue: 0
        });
        return { success: true, id: res.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// 2. किसी स्पेसिफिक गेम का डेटा लाना
const getGameById = async (id) => {
    try {
        const doc = await db.collection('games').doc(id).get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error("Error fetching game:", error);
    }
};

// 3. व्यू काउंट बढ़ाना (Monetization Logic)
const incrementViews = async (id) => {
    const gameRef = db.collection('games').doc(id);
    return gameRef.update({
        views: firebase.firestore.FieldValue.increment(1)
    });
};
