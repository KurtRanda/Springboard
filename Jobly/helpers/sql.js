const { BadRequestError } = require("../expressError");

/**
 * Generate SQL for a partial update.
 *
 * This function helps dynamically construct the SQL query needed to update specific
 * fields of a record in the database. It maps the JavaScript-style keys from the input
 * object to the corresponding SQL column names, then generates a SQL query and the 
 * corresponding values for the update.
 * 
 * @param {Object} dataToUpdate - An object containing the fields to be updated (e.g., { firstName: "Aliya", age: 32 }).
 * @param {Object} jsToSql - An object that maps JavaScript-style field names to SQL column names 
 * (e.g., { firstName: "first_name", age: "age" }).
 *
 * @returns {Object} - An object containing two properties:
 *  - `setCols`: A string representing the SQL columns to update, e.g., `"first_name=$1, age=$2"`.
 *  - `values`: An array of values corresponding to the columns, e.g., `["Aliya", 32]`.
 *
 * @throws {BadRequestError} If no data is provided for update.
 *
 * @example
 * // Example usage:
 * const dataToUpdate = { firstName: "Aliya", age: 32 };
 * const jsToSql = { firstName: "first_name", age: "age" };
 * const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
 * 
 * // result => {
 * //   setCols: '"first_name"=$1, "age"=$2',
 * //   values: ["Aliya", 32]
 * // }
 */


function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
