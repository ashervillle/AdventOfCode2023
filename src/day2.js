const session = "*COOKIE LOGIN SESSION AT https://adventofcode.com/2023/day/2/input*";

function getSumOfValidGamesIds_part1(gamesArr) {
  const maxAvailable = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let sumOfValidGamesIds = 0;
  for (let gameData of gamesArr) {
    if (!gameData.length) continue;

    const [gameIDpart, gameDataPart] = gameData.split(':');
    const gameId = parseInt(gameIDpart.slice(4), 10);
    
    let gameValid = true;
    for (let gameRound of gameDataPart.split(';')) {
      const colorsData = gameRound.split(',');
      const gameRoundObj = {};
      for (let colorData of colorsData) {
        const [value, color] = colorData.trim().split(' ');
        gameRoundObj[color] = parseInt(value, 10);
      }
      for (let [color, colorAmount] of Object.entries(gameRoundObj)) {
        if (colorAmount > maxAvailable[color]) {
          gameValid = false;
          break;
        }
      }
    }
    
    if (gameValid) {
      sumOfValidGamesIds += gameId;
    }
  }

  return sumOfValidGamesIds;
};

async function day2Solution() {
  const fetch = (await import('node-fetch')).default;
  const data = await fetch('https://adventofcode.com/2023/day/2/input', { headers: { Cookie: `session=${session}` }});
  const text = await data.text();

  const gamesArr = text.split('\n');

  let gamePowerSum = 0;

  for (let gameData of gamesArr) {
    if (!gameData.length) continue;

    const gameDataPart = gameData.split(':')[1];
    
    const gameMinAvailable = {
      red: 0,
      blue: 0,
      green: 0
    };

    for (let gameRound of gameDataPart.split(';')) {
      const colorsData = gameRound.split(',');
      const gameRoundObj = {};
      for (let colorData of colorsData) {
        const [value, color] = colorData.trim().split(' ');
        gameRoundObj[color] = parseInt(value, 10);
      }
      for (let [color, colorAmount] of Object.entries(gameRoundObj)) {
        if (colorAmount > gameMinAvailable[color]) {
          gameMinAvailable[color] = colorAmount;
        }
      }
    }
    const gamePower = Object.values(gameMinAvailable).reduce((acc, val) => acc * val, 1);
    gamePowerSum += gamePower;
  }

  console.log(`The answer id ${gamePowerSum}`);
}

module.exports = {
  day2Solution,
};