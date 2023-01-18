function rollDice(chance) {
  const dado = Math.floor(Math.random() * 100 + 1);
  if (dado < chance) {
    return true;
  } else {
    return false;
  }
}

module.exports = rollDice