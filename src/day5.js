const session = "*COOKIE LOGIN SESSION AT https://adventofcode.com/2023/day/5/input*";

/**
 * @param {Number[]} seeds 
 * @param {Number[]} mapperMetadata 
 * @returns 
 */
function mapSeedsToLocations(seeds, mapperMetadata) {
  let numsToMap = seeds;
  let mapResult = [];
  
  for (let i = 0; i < mapperMetadata.length; i++) {
    const mapper = mapperMetadata[i];
    for (let numToMap of numsToMap) {
      let mappedNum;

      for (let row of mapper) {
        const [targetNum, sourceNum, rangeLength] = row.split(' ');
        if (numToMap >= Number(sourceNum) && numToMap < Number(sourceNum) + Number(rangeLength)) {
          const diff = numToMap - Number(sourceNum);
          mappedNum = Number(targetNum) + diff;
          break;
        }
      }
      if (!mappedNum) {
        mappedNum = numToMap;
      }

      mapResult.push(mappedNum);
    }

    if (i === mapperMetadata.length - 1) break;

    numsToMap = mapResult;
    mapResult = [];
  }

  return mapResult;
}

async function day5Solution() {
  const fetch = (await import('node-fetch')).default;
  const data = await fetch('https://adventofcode.com/2023/day/5/input', { headers: { Cookie: `session=${session}` }});
  const text = await data.text();

  const tokensArr = text.split('\n');
  
  const seeds = tokensArr[0].split(':')[1].trim().split(' ').map(num => Number(num));

  const mapperMetadata = [];
  let j = -1;
  for (let i = 0; i < tokensArr.length; i++) {
    const rowData = tokensArr[i];

    if (~['seed-to-soil map:', 'soil-to-fertilizer map:', 'fertilizer-to-water map:',
      'water-to-light map:', 'light-to-temperature map:', 'temperature-to-humidity map:', 
      'humidity-to-location map:'].indexOf(rowData)) {
      mapperMetadata.push([]);
      j++;
      continue;
    }
    if (j < 0 || !rowData.length) continue;
    mapperMetadata[j].push(rowData);
  }

  let rangesToMap = seeds;
  let mapResult = [];

  for (let i = 0; i < mapperMetadata.length; i++) {
    const mapper = mapperMetadata[i];

    while (rangesToMap.length) {
      let mappedRange = [];

      for (let row of mapper) {
        const rangeToMapStart = Number(rangesToMap[0]);
        const rangeToMapEnd = Number(rangesToMap[0]) + Number(rangesToMap[1]) - 1;

        const [targetNum, sourceNum, rangeLength] = row.split(' ');

        const mapperRangeStart = Number(sourceNum);
        const mapperRangeEnd = Number(sourceNum) + Number(rangeLength) - 1;

        const leftDiff = rangeToMapStart - mapperRangeStart;
        const rightDiff = mapperRangeEnd - rangeToMapEnd;

        if (rangeToMapStart >= mapperRangeStart && rangeToMapEnd <= mapperRangeEnd) {
          mappedRange.push(Number(targetNum) + leftDiff, Number(rangeLength) - leftDiff - rightDiff);
          break;
        }
        if (rangeToMapStart < mapperRangeStart && rangeToMapEnd > mapperRangeEnd) {
          mappedRange.push(Number(targetNum), Number(rangeLength));
          rangesToMap.push(rangeToMapStart, mapperRangeStart - rangeToMapStart);
          rangesToMap.push(mapperRangeEnd + 1, rangeToMapEnd - mapperRangeEnd);
          break;
        }
        if (rangeToMapStart > mapperRangeStart && rangeToMapStart < mapperRangeEnd && rangeToMapEnd > mapperRangeEnd) {
          mappedRange.push(Number(targetNum) + leftDiff, Number(rangeLength) - leftDiff);
          rangesToMap.push(mapperRangeEnd + 1, rangeToMapEnd - mapperRangeEnd);
          break;
        }
        if (rangeToMapStart < mapperRangeStart && rangeToMapEnd > mapperRangeStart && rangeToMapEnd < mapperRangeEnd) {
          mappedRange.push(Number(targetNum), Number(rangeLength) - rightDiff);
          rangesToMap.push(rangeToMapStart, mapperRangeStart - rangeToMapStart);
          break;
        }
      }
      if (!mappedRange.length) {
        mappedRange = [rangesToMap[0], rangesToMap[1]];
      }
      
      mapResult.push(...mappedRange);

      rangesToMap.shift();
      rangesToMap.shift();
    }

    if (i === mapperMetadata.length - 1) break;

    rangesToMap = mapResult;
    mapResult = [];
  }

  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < mapResult.length; i += 2) {
    min = Math.min(min, mapResult[i]);
  }

  console.log(`The answer is ${min}`);
}

module.exports = {
  day5Solution,
};