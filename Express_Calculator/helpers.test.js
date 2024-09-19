const { convertAndValidateNumsArray, findMean, findMedian, findMode } = require('./helpers');

describe("Helper function tests", () => {

  /** Test convertAndValidateNumsArray */
  describe("convertAndValidateNumsArray", () => {

    test("should correctly convert an array of valid string numbers to an array of numbers", () => {
      const result = convertAndValidateNumsArray(["1", "2", "3"]);
      expect(result).toEqual([1, 2, 3]);
    });

    test("should return an error if any element is not a valid number", () => {
      const result = convertAndValidateNumsArray(["1", "2", "foo"]);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("The value 'foo' is not a valid number.");
    });

    test("should handle an empty array", () => {
      const result = convertAndValidateNumsArray([]);
      expect(result).toEqual([]);
    });
  });

  /** Test findMean */
  describe("findMean", () => {

    test("should return the mean of a valid number array", () => {
      const result = findMean([1, 2, 3, 4, 5]);
      expect(result).toBe(3);
    });

    test("should return 0 for an empty array", () => {
      const result = findMean([]);
      expect(result).toBe(0);
    });
  });

  /** Test findMedian */
  describe("findMedian", () => {

    test("should return the median of an odd-length array", () => {
      const result = findMedian([1, 2, 3, 4, 5]);
      expect(result).toBe(3);
    });

    test("should return the median of an even-length array", () => {
      const result = findMedian([1, 2, 3, 4]);
      expect(result).toBe(2.5);
    });

    test("should return NaN for an empty array", () => {
      const result = findMedian([]);
      expect(result).toBeNaN();
    });
  });

  /** Test findMode */
  describe("findMode", () => {

    test("should return the mode of an array with a single mode", () => {
      const result = findMode([1, 1, 2, 3, 4]);
      expect(result).toBe(1);
    });

    test("should return the first mode in case of a tie", () => {
      const result = findMode([1, 1, 2, 2, 3]);
      expect(result).toBe(1);  // Since 1 appears first, we return 1 in case of a tie.
    });

    test("should return NaN for an empty array", () => {
      const result = findMode([]);
      expect(result).toBeNaN();
    });
  });
});
