const { sqlForPartialUpdate } = require("../helpers/sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", function () {
  test("successfully generates SQL for valid input", function () {
    const dataToUpdate = { firstName: 'Aliya', age: 32 };
    const jsToSql = { firstName: 'first_name', age: 'age' };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ['Aliya', 32]
    });
  });

  test("uses JS field names when no mapping is provided", function () {
    const dataToUpdate = { firstName: 'Aliya', age: 32 };
    const jsToSql = {};  // no mapping provided

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ['Aliya', 32]
    });
  });

  test("throws an error if no data is provided", function () {
    const dataToUpdate = {};
    const jsToSql = { firstName: 'first_name' };

    expect(() => sqlForPartialUpdate(dataToUpdate, jsToSql)).toThrowError(BadRequestError);
  });

  test("handles different fields correctly", function () {
    const dataToUpdate = { lastName: 'Doe', isAdmin: false };
    const jsToSql = { lastName: 'last_name', isAdmin: 'is_admin' };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    expect(result).toEqual({
      setCols: '"last_name"=$1, "is_admin"=$2',
      values: ['Doe', false]
    });
  });
});
