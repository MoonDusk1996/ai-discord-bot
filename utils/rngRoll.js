function rngRoll(percent) {
	const totalMax = 100
	const dado = Math.floor(Math.random() * totalMax + 1)
	if (dado < percent) {
		return true
	} else {
		return false
	}
}

module.exports = rngRoll
