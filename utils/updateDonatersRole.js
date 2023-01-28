module.exports = function updateDonatersRole(officialGuild, donoUsers) {
	const specialUsersRoles = officialGuild.roles.cache.get("1064834781315088444")

	officialGuild.members.fetch().then((users) =>
		users.map((item) => {
			if (donoUsers.includes(item.id)) {
				item.roles.add(specialUsersRoles)
				console.log("donaters role has been fetched ✅")
			}
		})
	)
}
