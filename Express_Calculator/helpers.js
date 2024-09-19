/** Helper functions for calculations */

/** convertAndValidateNumsArray(numsAsStrings): 
 * Converts an array of strings to an array of numbers.
 * Throws an error if any of the elements is not a valid number.
 */

function convertAndValidateNumsArray(numsAsStrings) {
    let result = [];
  
    for (let i = 0; i < numsAsStrings.length; i++) {
      let valToNumber = Number(numsAsStrings[i]);
  
      if (Number.isNaN(valToNumber)) {
        return new Error(`The value '${numsAsStrings[i]}' is not a valid number.`);
      }
  
      result.push(valToNumber);
    }
  
    return result;
  }
  
  /** findMean(nums): return the mean (average) of an array of numbers. */
  function findMean(nums) {
    if (nums.length === 0) return 0;
    return nums.reduce((acc, cur) => acc + cur, 0) / nums.length;
  }
  
  /** findMedian(nums): return the median of an array of numbers. */
  function findMedian(nums) {
    nums.sort((a, b) => a - b);
  
    let middleIdx = Math.floor(nums.length / 2);
    let median;
  
    if (nums.length % 2 === 0) {
      median = (nums[middleIdx] + nums[middleIdx - 1]) / 2;
    } else {
      median = nums[middleIdx];
    }
  
    return median;
  }
  
/** findMode(nums): return the mode of an array of numbers. */
function findMode(nums) {
  if (nums.length === 0) return NaN;  // Add this check to return NaN for empty arrays.

  let freqCounter = {};
  let maxFreq = 0;
  let mode;

  for (let val of nums) {
    freqCounter[val] = (freqCounter[val] || 0) + 1;
  }

  for (let key in freqCounter) {
    if (freqCounter[key] > maxFreq) {
      maxFreq = freqCounter[key];
      mode = Number(key);
    }
  }

  return mode;
}

  
  module.exports = {
    convertAndValidateNumsArray,
    findMean,
    findMedian,
    findMode
  };
  