const session = "*COOKIE LOGIN SESSION AT https://adventofcode.com/2023/day/10/input*";

const directionsEnterExit = {
  '|': ['SS', 'NN'],
  '-': ['WW', 'EE'],
  'L': ['SE', 'WN'],
  'J': ['SW', 'EN'],
  '7': ['ES', 'NW'],
  'F': ['NE', 'WS'],
};

const coordsDirectionConfig = {
  'S': [1, 0],
  'N': [-1, 0],
  'W': [0, -1],
  'E': [0, 1],
};

function findTheLoops_part1(tokensArr, startCoords) {
  const directionsToCheck = ['SS', 'NN', 'WW', 'EE'];
  const stepsConfig = [[0, false, []], [0, false, []], [0, false, []], [0, false, []]];

  for (let i = 0; i < directionsToCheck.length; i++) {
    const initialDirection = directionsToCheck[i];
    let x = startCoords[0];
    let y = startCoords[1];
    stepsConfig[i][2].push([x, y]);
    let direction = initialDirection;
    let sOrEndOfPathFound = false;
    
    while (!sOrEndOfPathFound) {
      const nextX = x + coordsDirectionConfig[direction[1]][0];
      const nextY = y + coordsDirectionConfig[direction[1]][1];
      
      const nextPipe = tokensArr[nextX][nextY];
      
      if (nextPipe === 'S') {
        stepsConfig[i][0]++;
        stepsConfig[i][1] = true;
        break;
      }
      if (!nextPipe || !directionsEnterExit[nextPipe]) {
        sOrEndOfPathFound = true;
        break;
      }

      const directionsPipeMatch = directionsEnterExit[nextPipe].filter(dir => dir[0] === direction[1]);
      
      const canGoOnPipe = !!directionsPipeMatch.length;
      if (!canGoOnPipe) {
        sOrEndOfPathFound = true;
        break;
      }

      direction = directionsPipeMatch[0];

      x = nextX;
      y = nextY;
      stepsConfig[i][0]++;
      stepsConfig[i][2].push([x, y]);
    }
  }

  return stepsConfig;
};

async function day10Solution() {
  const fetch = (await import('node-fetch')).default;
  const data = await fetch('https://adventofcode.com/2023/day/10/input', { headers: { Cookie: `session=${session}` }});
  const text = await data.text();

  const tokensArr = text.split('\n');
  tokensArr.pop();
  
  const startCoords = [];
  for (let i = 0; i < tokensArr.length; i++) {
    for (let j = 0; j < tokensArr[i].length; j++) {
      if (tokensArr[i][j] === 'S') {
        startCoords.push(i, j);
      }
    }
  }

  const stepsConfig = findTheLoops_part1(tokensArr, startCoords);

  const loopData = stepsConfig.filter(conf => conf[1] === true)[0];
  const steps = loopData[0] / 2;
  const coordsLoop = loopData[2];

  // TODO: part 2 (answer is 429)
  
  // const innerRanges = {};
  // for (let coords of coordsLoop) {
  //   const [y, x] = coords;
  //   if (!innerRanges[y]) {
  //     innerRanges[y] = [];
  //   }
  //   innerRanges[y].push(x);
  // }

  // let startAddingPoints = false;
  // let count = 0;

  // let lastCorner = '';
  // const uShapes = ['F7', 'LJ'];
  // const cornerShaped = ['F', '7', 'J', 'L'];
  // const sideChangersAlways = '|';

  // for (let i = 0; i < tokensArr.length; i++) {
  //   startAddingPoints = false;
  //   const linesInTheLoop = innerRanges[i] || [];
    
  //   for (let j = 0; j < tokensArr[i].length; j++) {
  //     const currPresentInLoop = linesInTheLoop.indexOf(j) !== -1;
  //     const curr = tokensArr[i][j];

  //     if (currPresentInLoop) {
  //       if (curr === sideChangersAlways) {
  //         startAddingPoints = !startAddingPoints;
  //       }
  //       if (cornerShaped.indexOf(curr) !== -1) {
  //         if (!uShapes.includes(lastCorner + curr)) {
  //           startAddingPoints = !startAddingPoints;
  //         }
  //         lastCorner = curr;
  //       }
  //     }

  //     if (startAddingPoints && curr === '.') {
  //       count++;
  //     }
  //   }
  // }
  // console.log(count)
}

module.exports = {
  day10Solution,
};