const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(require("../firebaseService.json")),
});
const db = admin.firestore();
const query = db.collection("transactions");

module.exports = function fetchDb() {
  return new Promise((resolve,reject) => {
    let donorUserIds = [];
    console.log("database fetch update... ⏳");
    query.get().then((snapshot) => {
      const transactions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const userTransactions = transactions.map((data) => data.metadata);
      const donorUsertransactionIds = userTransactions.map(
        (user) => user.discord_id
      );
      donorUserIds = [...new Set(donorUsertransactionIds)];
      console.log("fetchig database sucessfull ✅");
      resolve({ donorUserIds });
      reject(console.log("database fetch error... ⚠️"))
    });
  });
};
