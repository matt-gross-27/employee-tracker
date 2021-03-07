class Sql {
  constructor(obj) {
    this.tableName = obj.tableName;
  }

  selectAllFromTable() {
    if(this.tableName == '') {
      console.error('Table name null');
      return;
    }
    return `SELECT * FROM ${this.tableName}`
  }
}

module.exports = Sql;