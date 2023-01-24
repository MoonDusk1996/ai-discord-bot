module.exports = function updateDonatersRole(guild, donoUsers, role) {
  guild.members.fetch().then((users) =>
    users.map((item) => {
      if (donoUsers.includes(item.id)) {
        item.roles.add(role);
        console.log("donaters role has been fetched ✅");
      }
    })
  );
};
