const session = "*COOKIE LOGIN SESSION AT https://adventofcode.com/2023/day/6/input*";

const order_part1 = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5', '4', '3', '2'];
const order_part2 = ['a', 'k', 'q', 't', '9', '8', '7', '6', '5', '4', '3', '2', 'j'];

async function day7Solution() {
  const fetch = (await import('node-fetch')).default;
  const data = await fetch('https://adventofcode.com/2023/day/7/input', { headers: { Cookie: `session=${session}` }});
  const text = await data.text();

  const tokensArr = text.split('\n');
  
  tokensArr.pop()

  const totalOfGame = countGameTotal(tokensArr);

  console.log(`The answer is ${totalOfGame}`)
}

function countGameTotal(gamesData) {
  const sortedHand = [];
  const bidsByHand = {};

  const combinations = {
    fiveOfAKind: {},
    fourOfAKind: {},
    fullHouse: {},
    threeOfAKind: {},
    twoPair: {},
    onePair: {},
    highCard: {},
  };

  for (let gamePiece of gamesData) {
    const [cards, bid] = gamePiece.split(' ');
    const combinationName = decideOnCombination_part2(cards);

    combinations[combinationName][cards] = Number(bid);
  }
  for (let combination of Object.keys(combinations)) {
    const combinationsHands = Object.keys(combinations[combination]);
    for (let [hand, bid] of Object.entries(combinations[combination])) {
      bidsByHand[hand] = bid;
    }
    combinationsHands.sort((a, b) => {
      for (let i = 0; i < 5; i++) {
        if (a[i] === b[i]) continue;
        return order_part2.indexOf(b[i].toLowerCase()) - order_part2.indexOf(a[i].toLowerCase());
      }
    });

    sortedHand.unshift(...combinationsHands);
  }
  const totalEarnings = sortedHand.reduce((acc, hand, i) => {
    return acc + bidsByHand[hand] * (i + 1);
  }, 0);

  return totalEarnings;
}

function decideOnCombination_part1(hand) {
  const combinationsObj = {};
  for (let card of hand) {
    if (!combinationsObj[card]) combinationsObj[card] = 0;
    combinationsObj[card]++;
  }

  const differentCardsAmount = Object.keys(combinationsObj).length;

  switch (differentCardsAmount) {
    case 5:
      return 'highCard';
    case 4:
      return 'onePair';
    case 3:
      for (let combination of Object.values(combinationsObj)) {
        if (combination <= 1) continue;

        if (combination === 3) {
          return 'threeOfAKind';
        } else {
          return 'twoPair';
        }
      }
    case 2:
      for (let combination of Object.values(combinationsObj)) {
        if (combination === 1 || combination === 4) {
          return 'fourOfAKind';
        } else {
          return 'fullHouse';
        }
      }
    case 1: 
      return 'fiveOfAKind';
  }
};

function decideOnCombination_part2(hand) {
  const combinationsObj = {};
  for (let card of hand) {
    if (!combinationsObj[card]) combinationsObj[card] = 0;
    combinationsObj[card]++;
  }
  
  const amountOfJokers = combinationsObj['J'];

  if (!amountOfJokers) {
    return decideOnCombination_part1(hand);
  }

  const differentCardsAmount = Object.keys(combinationsObj).length;

  switch (differentCardsAmount) {
    case 5:
      return 'onePair';
    case 4:
      return 'threeOfAKind';
    case 3:
      if (amountOfJokers === 1) {
        for (let comb of Object.values(combinationsObj)) {
          if (comb === 1) continue;
          if (comb === 2) {
            return 'fullHouse';
          }
          if (comb === 3) {
            return 'fourOfAKind';
          }
        }
      }
      if (amountOfJokers > 1) {
        return 'fourOfAKind';
      }
    case 2:
    case 1:
      return 'fiveOfAKind';
  }
};

module.exports = {
  day7Solution,
};