const Sql = require('../lib/Queries');

test('creates a SELECT * FROM ? statement', () => {
  const obj = { tableName: 'employee' }
  expect(new Sql(obj).selectAllFromTable()).toBe('SELECT * FROM employee');
})