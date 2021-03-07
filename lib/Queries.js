class Sql {
  constructor(obj) {
    this.mainMenu = obj.mainMenu;
  }
  generateQuery() {
    if (this.mainMenu == 'View all departments') {
      return `SELECT * FROM department`
    }

    if (this.mainMenu == 'View all roles') {
      return `
        SELECT
            role.id
          , role.title AS job_title
          , role.salary
          , department.name AS department
        FROM 
            role
        LEFT JOIN department ON role.department_id = department.id`
    }

    if (this.mainMenu == 'View all employees') {
      return `
      SELECT
          A.id
        , A.first_name
        , A.last_name
        , C.title
        , D.name AS department
        , C.salary
        , CONCAT(B.first_name,' ',B.last_name) AS manager
      FROM
          employee A
      LEFT JOIN employee B ON A.manager_id = B.id
      LEFT JOIN role C ON A.role_id = C.id
      LEFT JOIN department D ON C.department_id = D.id`
    }
  
    if (this.mainMenu == 'Add a department') {
      return `INSERT INTO department (name) VALUES (?)`
    }

    if (this.mainMenu == 'Add a role') {
      return `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`
    }

    if (this.mainMenu == 'Add an employee') {
      return `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
    }
  }
}

module.exports = Sql;