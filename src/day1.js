
const session = '53616c7465645f5f9a36d86564e42413634637ce69f5d12d5200f4dc821654b3e793dc5d14de52dcaf8b626248c8803dc0f65761daabfb449494e2653a0bfbea'; // "*COOKIE LOGIN SESSION AT https://adventofcode.com/2023/day/1/input*";

/**
 * @param {String[]} tokensArr 
 * @returns {Number[]} numArr
 */
const formNumbersArrayFromTokensArray_usingOnlyNumbers = (tokensArr) => {
  const numArr = [];
  for (let token of tokensArr) {
    const len = token.length;
    if (!len) {
      continue;
    }
    let firstNum;
    let lastNum;
    for (let i = 0; i < len; i++) {
      const leftSymb = token[i];
      const rightSymb = token[len - 1 - i];

      const leftSymbNum = parseInt(leftSymb);
      const rightSymbNum = parseInt(rightSymb);

      if (!isNaN(leftSymbNum) && !firstNum) {
        firstNum = leftSymbNum;
      }
      if (!isNaN(rightSymbNum) && !lastNum) {
        lastNum = rightSymbNum;
      }
      if (firstNum && lastNum) {
        break;
      }
    }

    numArr.push(Number(`${firstNum}${lastNum}`));
  }

  return numArr;
};

const numsNaming = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const numsNamingReverse = ['eno', 'owt', 'eerht', 'ruof', 'evif', 'xis', 'neves', 'thgie', 'enin'];

/**
 * @param {String[]} tokensArr 
 * @returns {Number[]} numArr
 */
const formNumbersArrayFromTokensArray = (tokensArr) => {
  const numArr = [];

  for (let token of tokensArr) {
    const len = token.length;
    if (!len) {
      continue;
    }

    let firstNum;
    let lastNum;

    let leftSymbAcc = '';
    let rightSymbAcc = '';

    for (let i = 0; i < len; i++) {
      if (firstNum && lastNum) {
        break;
      }

      const leftSymb = token[i];
      const rightSymb = token[len - 1 - i];

      const leftSymbNext = token[i + 1] || '';
      const rightSymbNext = token[len - 2 - i] || '';

      const leftSymbNum = parseInt(leftSymb);
      const rightSymbNum = parseInt(rightSymb);

      if (!firstNum) {
        if (!isNaN(leftSymbNum)) {
          firstNum = leftSymbNum;
        } else {
          leftSymbAcc += leftSymb;
          const _supposedIndex = numsNaming.indexOf(leftSymbAcc);
          if (!!~_supposedIndex) {
            firstNum = _supposedIndex + 1;
          } else {
            const nextStepAcc = leftSymbAcc + leftSymbNext;
            const namesNeededLength = nextStepAcc.length;
            const namesCut = numsNaming.map(name => name.slice(0, namesNeededLength));
            const _supposedIndex = namesCut.indexOf(nextStepAcc);
            if (!~_supposedIndex) {
              leftSymbAcc = leftSymb;
            }
          }
        }
      }
      
      if (!lastNum) {
        if (!isNaN(rightSymbNum)) {
          lastNum = rightSymbNum;
        } else {
          rightSymbAcc += rightSymb;
          const _supposedIndex = numsNamingReverse.indexOf(rightSymbAcc);
          if (!!~_supposedIndex) {
            lastNum = _supposedIndex + 1;
          } else {
            const nextStepAcc = rightSymbAcc + rightSymbNext;
            const namesNeededLength = nextStepAcc.length;
            const namesCut = numsNamingReverse.map(name => name.slice(0, namesNeededLength));
            const _supposedIndex = namesCut.indexOf(nextStepAcc);
            if (!~_supposedIndex) {
              rightSymbAcc = rightSymb;
            }
          }   
        }
      }
    }

    numArr.push(Number(`${firstNum}${lastNum}`));
  }

  return numArr;
};

async function day1Solution() {
  const fetch = (await import('node-fetch')).default;
  const data = await fetch('https://adventofcode.com/2023/day/1/input', { headers: { Cookie: `session=${session}` }});
  const text = await data.text();

  const tokensArr = text.split('\n');
  const numArr = formNumbersArrayFromTokensArray(tokensArr);
    
  const sum = numArr.reduce((acc, num) => acc + num, 0);
  console.log(`The answer is ${sum}`);
}

module.exports = {
  day1Solution,
};