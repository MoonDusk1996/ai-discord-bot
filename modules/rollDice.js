function rollDice(percent) {
  const dado = Math.floor(Math.random() * 100 + 1);
  if (dado < percent) {
    return true;
  } else {
    return false;
  }
}

module.exports = rollDice