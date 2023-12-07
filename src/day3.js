const session = "*COOKIE LOGIN SESSION AT https://adventofcode.com/2023/day/2/input*";

function extractNumsWithAdjacentSymbols(tokensArr) {
  const numsToSum = [];

  for (let i = 0; i < tokensArr.length; i++) {
    const token = tokensArr[i];
    if (!token) continue;

    let num = '';
    let startIndNum = 0;
    let endIndNum = 0;

    for (let j = 0; j < token.length; j++) {
      const char = token[j];
      const _num_char = parseInt(char);
      if (!isNaN(_num_char)) {
        num += char;
        startIndNum = j;
      }

      while (num) {
        const nextChar = token[j + 1];
        const _next_num_char = parseInt(nextChar);
        if (!isNaN(_next_num_char)) {
          j++;
          num += nextChar;
        } else {
          endIndNum = j;
          // Check adjacent symbols
          let someSymbolFound = false;
          for (let k = i - 1; k < i + 2; k++) {
            for (let m = startIndNum - 1; m < endIndNum + 2; m++) {
              try {
                const symb = tokensArr[k][m];
                if (symb && isNaN(parseInt(symb)) && symb !== '.') {
                  someSymbolFound = true;
                  break;
                }
              } catch (err) {}
            }
            if (someSymbolFound) break;
          }
          if (someSymbolFound) {
            numsToSum.push(parseInt(num));
          }
          num = '';
        }
      }
    }
  }

  return numsToSum;
}

async function day3Solution() {
  const fetch = (await import('node-fetch')).default;
  const data = await fetch('https://adventofcode.com/2023/day/3/input', { headers: { Cookie: `session=${session}` }});
  const text = await data.text();

  const tokensArr = text.split('\n');

  const numsToSum = [];

  for (let i = 0; i < tokensArr.length; i++) {
    const token = tokensArr[i];
    if (!token) continue;

    for (let j = 0; j < token.length; j++) {
      const char = token[j];

      if (char !== '*') continue;

      const adjacentNums = [];

      for (let k = i - 1; k < i + 2; k++) {
        for (let m = j - 1; m < j + 2; m++) {
          let startInd = m;
          let endInd = m;
          let num = '';

          let leftEnd = false;
          let rightEnd = false;

          try {
            const symb = tokensArr[k][m];
            if (!isNaN(parseInt(symb))) {
              num += symb;
            }
          } catch (err) {}

          while (num) {
            if (!leftEnd) {
              try {
                const prevSymb = tokensArr[k][startInd - 1];
                if (!isNaN(parseInt(prevSymb))) {
                  num = prevSymb + num;
                } else {
                  leftEnd = true;
                }
                startInd -= 1;
              } catch (err) {
                leftEnd = true;
              }
            }

            if (!rightEnd) {
              try {
                const nextSymb = tokensArr[k][endInd + 1];
                if (!isNaN(parseInt(nextSymb))) {
                  num += nextSymb;
                } else {
                  rightEnd = true;
                }
                endInd += 1;
              } catch (err) {
                rightEnd = true;
              }
            }

            if (leftEnd && rightEnd) {
              m = endInd;
              adjacentNums.push(parseInt(num));
              num = '';
            }
          }
        }
      }

      if (adjacentNums.length === 2) {
        numsToSum.push(adjacentNums[0] * adjacentNums[1]);
      }
    }
  }

  const sum = numsToSum.reduce((acc, num) => acc + num, 0);
  console.log(`The answer is ${sum}`);
}

module.exports = {
  day3Solution,
};