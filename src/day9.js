const session = "*COOKIE LOGIN SESSION AT https://adventofcode.com/2023/day/9/input*";

async function day9Solution() {
  const fetch = (await import('node-fetch')).default;
  const data = await fetch('https://adventofcode.com/2023/day/9/input', { headers: { Cookie: `session=${session}` }});
  const text = await data.text();

  const tokensArr = text.split('\n');
  const results = [];

  for (let token of tokensArr) {
    if (!token) continue;
    const seqArr = token.split(' ').map(el => Number(el));
    const allArrs = [seqArr];

    let allItemsAreTheSame = seqArr.every(el => el === seqArr[0]);
    while (!allItemsAreTheSame) {
      allArrs[allArrs.length] = getDifferenceArr(allArrs[allArrs.length - 1]);
      allItemsAreTheSame = allArrs[allArrs.length - 1].every(el => el === allArrs[allArrs.length - 1][0]);
    }

    let total_part1 = 0;
    let total_part2 = 0;
    // Part 1
    for (let i = allArrs.length - 1; i >= 0; i--) {
      total_part1 += allArrs[i][allArrs[i].length - 1];
    }
    // Part 2
    for (let i = allArrs.length - 1; i >= 0; i--) {
      total_part2 = allArrs[i][0] - total_part2;
    }
    
    results.push([total_part1, total_part2]);
  }
  
  const [answer_part1, answer_part2] = results.reduce((acc, el) => {
    acc[0] += el[0];
    acc[1] += el[1];
    return acc;
  }, [0, 0]);

  console.log(`The answer for part 1 is: ${answer_part1}, and the answer for part 2 is: ${answer_part2}`);
}

function getDifferenceArr(arr) {
  const diffArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    diffArr[i] = arr[i + 1] - arr[i];
  }
  return diffArr;
};

module.exports = {
  day9Solution,
};