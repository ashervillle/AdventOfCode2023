const session = "*COOKIE LOGIN SESSION AT https://adventofcode.com/2023/day/4/input*";

function findMatchesInCardsData(tokensArr) {
  let cardId = 1;
  const cardsMatches = {};

  for (let token of tokensArr) {
    if (!token.length) continue;
    
    const cardData = token.split(':')[1];
    const [winningNumbers, cardNumbers] = cardData.split('|');
    const winningNumbersArr = winningNumbers.split(' ');
    const cardNumbersArr = cardNumbers.split(' ');
    for (let num of cardNumbersArr) {
      if (!parseInt(num)) continue;
      if (winningNumbersArr.includes(num)) {
        if (!cardsMatches[cardId]) {
          cardsMatches[cardId] = 1;
        } else {
          cardsMatches[cardId] += 1;
        }
      }
    }
    cardId += 1;
  }

  return cardsMatches;
}

async function day4Solution() {
  const fetch = (await import('node-fetch')).default;
  const data = await fetch('https://adventofcode.com/2023/day/4/input', { headers: { Cookie: `session=${session}` }});
  const text = await data.text();

  const tokensArr = text.split('\n');

  let cardId = 1;
  const cardsMatches = {
    1: {
      copies: 1,
      matches: 0,
    }
  };

  for (let token of tokensArr) {
    if (!token.length) continue;
    
    const cardData = token.split(':')[1];
    const [winningNumbers, cardNumbers] = cardData.split('|');
    const winningNumbersArr = winningNumbers.split(' ');
    const cardNumbersArr = cardNumbers.split(' ');

    if (!cardsMatches[cardId]) {
      cardsMatches[cardId] = {
        matches: 0,
        copies: 1,
      };
    }

    for (let num of cardNumbersArr) {
      if (!parseInt(num)) continue;

      if (winningNumbersArr.includes(num)) {
        cardsMatches[cardId].matches += 1;
      }
    }

    for (let i = 1; i < cardsMatches[cardId].matches + 1; i++) {
      if (!cardsMatches[cardId + i]) {
        cardsMatches[cardId + i] = {
          matches: 0,
          copies: 1,
        };
      }
      cardsMatches[cardId + i].copies += cardsMatches[cardId].copies;
    }
    cardId += 1;
  }

  const sumOfCopies = Object.values(cardsMatches).reduce((acc, card) => card.copies + acc, 0);
  console.log(`The answer is ${sumOfCopies}`);
}

module.exports = {
  day4Solution,
};