const session = "*COOKIE LOGIN SESSION AT https://adventofcode.com/2023/day/8/input*";

function countStepsRequiredForZFound(map, instructions) {
  let zFound = false;
  let elToSearch = 'AAA';
  let steps = 0;

  while (!zFound) {
    for (let mapData of map) {
      const [el, directions] = mapData.split('=');
      const [_, leftDirection, rightDirection] = directions.match(/\(([^,]+),\s*([^)]+)\)/);

      if (el.trim() === elToSearch) {
        const instructionInd = instructions.length < steps ? steps % instructions.length : steps;
        elToSearch = instructions[instructionInd] === 'L' ? leftDirection : rightDirection;
        steps += 1;
        break;
      }
    }
    if (elToSearch === 'ZZZ') {
      console.log('Found ZZZ');
      zFound = true;
      break;
    }
  }

  return steps;
};

async function day8Solution() {
  const fetch = (await import('node-fetch')).default;
  const data = await fetch('https://adventofcode.com/2023/day/8/input', { headers: { Cookie: `session=${session}` }});
  const text = await data.text();

  const tokensArr = text.split('\n');

  const instructions = tokensArr[0];

  tokensArr.shift();
  tokensArr.shift();
  tokensArr.pop();

  const map = tokensArr;
  const instructionsObj = {};

  const elToSearch = [];

  for (let mapData of map) {
    const [_el, directions] = mapData.split('=');
    const el = _el.trim();
    const [_, leftDirection, rightDirection] = directions.match(/\(([^,]+),\s*([^)]+)\)/);
    if (el[2] === 'A') {
      elToSearch.push(el);
    }
    instructionsObj[el] = {
      L: leftDirection,
      R: rightDirection,
    };
  }

  const stepsNeeded = Array(elToSearch.length).fill(0);
  
  for (let i = 0; i < elToSearch.length; i++) {
    let zFound = false;

    while (!zFound) {
      const instructionInd = instructions.length <= stepsNeeded[i] ? stepsNeeded[i] % instructions.length : stepsNeeded[i];
      elToSearch[i] = instructionsObj[elToSearch[i]][instructions[instructionInd]];
      stepsNeeded[i] += 1;

      zFound = elToSearch[i][2] === 'Z';
      
    }
  }
  const totalStepsNeeded = lcm(stepsNeeded);
  console.log(`The answer is ${totalStepsNeeded}`);

}

const lcm = (numbers) => numbers.reduce((a, b) => a * b / gcd([a, b]));
const gcd = (numbers) => numbers.reduce((a, b) => {
  while (b) {
      let t = b;
      b = a % b;
      a = t;
  }
  return a;
});

module.exports = {
  day8Solution,
};