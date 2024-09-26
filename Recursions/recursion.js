/** product: calculate the product of an array of numbers. */

function product(nums) {
  // Base case: if the array is empty, return 1
  if (nums.length === 0) {
    return 1;
  }
  
  // Recursive case: multiply the first element by the product of the rest of the array
  return nums[0] * product(nums.slice(1));
}

// Example usage
console.log(product([2, 3, 4]));  // Output: 24


/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  // Base case: if the list is empty, return 0
  if (words.length === 0) {
    return 0;
  }

  // Recursive case: find the max between the length of the first word and the longest in the rest of the array
  return Math.max(words[0].length, longest(words.slice(1)));
}

// Example usage
console.log(longest(["hello", "hi", "hola"]));  // Output: 5

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  // Base case: if the string is empty or has only one character, return the string
  if (str.length <= 1) {
    return str;
  }

  // Recursive case: take the first character and skip the next one
  return str[0] + everyOther(str.slice(2));
}

// Example usage
console.log(everyOther("hello"));  // Output: "hlo"

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  // Base case: if the string has 0 or 1 character, it's a palindrome
  if (str.length <= 1) {
    return true;
  }

  // Recursive case: check if the first and last characters are the same
  if (str[0] === str[str.length - 1]) {
    // Check the substring excluding the first and last characters
    return isPalindrome(str.slice(1, -1));
  }

  // If first and last characters don't match, it's not a palindrome
  return false;
}

// Example usage
console.log(isPalindrome("tacocat"));  // Output: true
console.log(isPalindrome("tacodog"));  // Output: false


/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, str, currentIndex = 0) {
  // Base case: if the array is empty, return -1
  if (arr.length === 0) {
    return -1;
  }

  // If the first element matches the string, return the current index
  if (arr[0] === str) {
    return currentIndex;
  }

  // Recursive case: check the rest of the array, increasing the index
  return findIndex(arr.slice(1), str, currentIndex + 1);
}

// Example usage
let animals = ["duck", "cat", "pony"];

console.log(findIndex(animals, "cat"));  // Output: 1
console.log(findIndex(animals, "porcupine"));  // Output: -1


/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  // Base case: if the string is empty, return an empty string
  if (str === "") {
    return "";
  }

  // Recursive case: take the last character and add it to the reversed rest of the string
  return str[str.length - 1] + revString(str.slice(0, -1));
}

// Example usage
console.log(revString("porcupine"));  // Output: 'enipucrop'

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let result = [];

  // Iterate over each key in the object
  for (let key in obj) {
    // If the value is a string, add it to the result array
    if (typeof obj[key] === "string") {
      result.push(obj[key]);
    }
    // If the value is an object, recursively gather strings from it
    else if (typeof obj[key] === "object" && obj[key] !== null) {
      result = result.concat(gatherStrings(obj[key]));
    }
  }

  return result;
}

// Example usage
let nestedObj = {
  firstName: "Lester",
  favoriteNumber: 22,
  moreData: {
    lastName: "Testowitz"
  },
  funFacts: {
    moreStuff: {
      anotherNumber: 100,
      deeplyNestedString: {
        almostThere: {
          success: "you made it!"
        }
      }
    },
    favoriteString: "nice!"
  }
};

console.log(gatherStrings(nestedObj));  // Output: ["Lester", "Testowitz", "you made it!", "nice!"]


/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {

}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
