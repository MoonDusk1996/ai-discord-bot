const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(require("../firebaseService.json")),
});
const db = admin.firestore();
const query = db.collection("transactions");

var donatersDiscordId;

function updateDonatersRole(client) {
  console.log("database fetch update... ⏳");
  const observer = query.onSnapshot((querySnapshot) => {
    donatersDiscordId = querySnapshot.docs.map(
      (data) => data.data().metadata.discord_id
    );
    console.log("fetchig database sucessfull ✅");
    const guild = client.guilds.cache.get(process.env.OFFICIAL_GUILD_ID);
    const role = guild.roles.cache.get(process.env.SPECIAL_USER_ROLE_ID);
    setDonatersRole();
    async function setDonatersRole() {
      console.log("set donaters role ⏳...");
      await guild.members
        .fetch()
        .then((users) =>
          users.map((item) => {
            const userslist = item;
            if (donatersDiscordId.includes(userslist.id)) {
              userslist.roles.add(role);
            }
          })
        )
        .then(console.log("donaters role has added ✅"));
    }
  });
}
module.exports = updateDonatersRole;
