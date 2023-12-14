const session = "*COOKIE LOGIN SESSION AT https://adventofcode.com/2023/day/6/input*";

function countAllWaysToWin(tokensArr) {
  const times = tokensArr[0].split(':')[1].trim().split(' ').reduce((acc, num) => {
    if (parseInt(num)) {
      acc.push(parseInt(num));
    }
    return acc;
  }, []);
  const distances = tokensArr[1].split(':')[1].trim().split(' ').reduce((acc, num) => {
    if (parseInt(num)) {
      acc.push(parseInt(num));
    }
    return acc;
  }, []);

  const waysToWin = [];
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];

    let waysToWinForThisRace = 0;

    for (let j = 0; j < time; j++) {
      const speed = j * 1;
      const distanceTraveled = speed * (time - j);
      if (distanceTraveled > distance) {
        waysToWinForThisRace++;
      }
    }
    waysToWin.push(waysToWinForThisRace);
  }
  return waysToWin;
}

async function day6Solution() {
  const fetch = (await import('node-fetch')).default;
  const data = await fetch('https://adventofcode.com/2023/day/6/input', { headers: { Cookie: `session=${session}` }});
  const text = await data.text();

  const tokensArr = text.split('\n');

  const time = Number(tokensArr[0].split(':')[1].trim().split(' ').reduce((acc, str) => acc + str, ''));
  const distance = Number(tokensArr[1].split(':')[1].trim().split(' ').reduce((acc, str) => acc + str, ''));

  let waysToWinForThisRace = 0;

  for (let j = 0; j < time; j++) {
    const speed = j * 1;
    const distanceTraveled = speed * (time - j);
    if (distanceTraveled > distance) {
      waysToWinForThisRace++;
    }
  }
  console.log(`The answer is ${waysToWinForThisRace}`);
}

module.exports = {
  day6Solution,
};