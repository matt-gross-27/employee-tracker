// access process.env.?
require('dotenv').config();
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const cTable = require('console.table');
const Sql = require('./lib/queries');

const connection = mysql2.createConnection({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DB
});

connection.connect(err => {
  if (err) throw err;
  console.log(`

█░█░█ █▀▀ █░░ █▀▀ █▀█ █▀▄▀█ █▀▀
▀▄▀▄▀ ██▄ █▄▄ █▄▄ █▄█ █░▀░█ ██▄

  `);
  promptUser();
});

promptUser = () => {
  return inquirer.prompt(
    {
      type: 'list',
      name: 'mainMenu',
      message: 'Please select from the following menu?',
      choices: [
          'View all departments'
         ,'View all roles'
         ,'View all employees'
         ,'View payroll by department'
         ,'Add a department'
         ,'Add a role'
         ,'Add an employee'
         ,'Update an employee'
         ,'Quit'
      ]
    }
  ).then(data => {
    if (data.mainMenu.substring(0, 4) === 'View') {
      viewTable(data);
    
    } else if (data.mainMenu.substring(0,3) === 'Add') {
      addTableData(data);
    
    } else if (data.mainMenu === 'Update an employee'){
      updateEmployee(data);
    
    } else if (data.mainMenu === 'Quit') {
      console.log(`

█▀▀ █▀█ █▀█ █▀▄ █▄▄ █▄█ █▀▀
█▄█ █▄█ █▄█ █▄▀ █▄█ ░█░ ██▄

      `);
      connection.end();
      return;
    }
  }).catch(err => {
    if (err) throw err;
  });
};

viewTable = (obj) => {
  const query = connection.query(
    new Sql(obj).generateQuery(),
    [],
    function(err, res) {
      if (err) throw err;
      console.log('\n');
      console.table(res);
      console.log('\n');
      promptUser();
    }
  );
};

addTableData = (obj) => {
  if (obj.mainMenu === 'Add a department') {
    addDepartment(obj);
  }
  if (obj.mainMenu === 'Add a role') {
    addRole(obj);
  }
  if (obj.mainMenu === 'Add an employee'){
    addEmployee(obj);
  }
};

addDepartment = (obj) => {
  inquirer.prompt({
    type: 'input',
    message: 'Enter the department you would like to add',
    name: 'param1'
  })
  .then(data => {
    const params = Object.values(data);
    const sql = new Sql(obj).generateQuery();
    connection.query(
      sql, params, function(err, res) {
        if (err) throw err;
        console.log(`
        Inserted new department:
          - id: ${res.insertId}
          - name: ${params[0]}
        `);
        promptUser();
      }
    )
  })
  .catch(err => {
    if (err) throw err;
  });
};

addRole = (obj) => {
  connection.query(
    'SELECT * FROM department',
    [],
    function(err, res) {
      if (err) throw err;
      const departments = res.map(dep => `${dep.id}: ${dep.name}`);
      promptAddRole(departments, obj);
    }
  );
}

promptAddRole = (depArr, obj) => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter the job title you would like to add',
      name: 'param1'
    },
    {
      type: 'input',
      message: `Please enter the role's yearly salary`,
      name: 'param2'
    },
    {
      type: 'list',
      message: `Select which department this role belongs to`,
      choices: depArr,
      name: 'param3'
    }
  ])
  .then(data => {
    const params = Object.values(data);
    const sql = new Sql(obj).generateQuery();
    connection.query(
      sql, 
      [
        params[0], 
        params[1], 
        parseInt(params[2].split(':')[0])
      ],
      function(err, res) {
        if (err) throw err;
        console.log(`
        Inserted new role: 
          - id: ${res.insertId}
          - title: ${params[0]}
          - salary: ${params[1]}
          - department: ${params[2].split(':')[1].substring(1)}
        `);
        promptUser();
      }
    )
  })
  .catch(err => {
    if (err) throw err;
  });
}

addEmployee = (obj) => {
  connection.query(
    'SELECT id, title FROM role',
    [],
    function(err, res) {
      if (err) throw err;
      const roles = res.map(role => `${role.id}: ${role.title}`);
      getManagers(roles, obj);
    }
  );
}

getManagers = (roles, obj) => {
  connection.query(
    `SELECT A.id, CONCAT(A.first_name,' ',A.last_name) AS full_name, B.title
     FROM employee A
     LEFT JOIN role B ON A.role_id = B.id`,
    [],
    function(err, res) {
      if (err) throw err;
      const managers = res.map(man => `${man.id}: ${man.full_name} (${man.title})`);
      promptAddEmployee(roles, managers, obj);
    }
  )
};

promptAddEmployee = (roles, managers, obj) => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the employee\'s first name',
      name: 'first_name'
    },
    {
      type: 'input',
      message: `Enter the employee\'s last name`,
      name: 'last_name'
    },
    {
      type: 'list',
      message: `Select the employees role`,
      choices: roles,
      name: 'role'
    },
    {
      type: 'list',
      message: `Select the employees Manager`,
      choices: managers,
      name: 'manager'
    }
  ])
  .then(data => {
    const {first_name, last_name, role, manager } = data
    const params = [
      first_name,
      last_name,
      parseInt(role.split(':')[0]),
      parseInt(manager.split(':')[0])
    ];
    const sql = new Sql(obj).generateQuery();
    connection.query(
      sql, params, (err, res) => {
        if (err) throw err;
        console.log(`
        Inserted new employee: 
          - id: ${res.insertId}
          - first_name: ${first_name}
          - last_name: ${last_name}
          - role: ${role.split(':')[1].substring(1)}
          - manager: ${manager.split(':')[1].substring(1)}
        `);
        promptUser();
      }
    )
  })
  .catch(err => {
    if (err) throw err;
  });
};

updateEmployee = (obj) => {
  connection.query(
    `SELECT A.id, CONCAT(A.first_name,' ',A.last_name) AS full_name, B.title
     FROM employee A
     LEFT JOIN role B ON A.role_id = B.id`,
    [],
    function(err, res) {
      if (err) throw err;
      const employees = res.map(emp => `${emp.id}: ${emp.full_name} (${emp.title})`);
      getRoles(employees, obj);
    }
  );
}

getRoles = (employees, obj) => {
  connection.query(
    'SELECT id, title FROM role',
    [],
    function(err, res) {
      if (err) throw err;
      const roles = res.map(role => `${role.id}: ${role.title}`);
      promptUpdateEmployee(employees, roles, obj);
    }
  );
}

promptUpdateEmployee = (employees, roles, obj) => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Select the employee you would like to update',
      name: 'employee',
      choices: employees
    },
    {
      type: 'list',
      message: `Select the employee's new job title`,
      name: 'title',
      choices: roles
    },
    {
      type: 'list',
      message: `Select the employee's new manager`,
      name: 'manager',
      choices: employees
    }
  ])
  .then(data => {
    const { employee, manager, title } = data;
    const sql = new Sql(obj).generateQuery();
    const params = [
      parseInt(title),
      parseInt(manager),
      parseInt(employee)
    ];
    connection.query(
      sql, params, (err, res) => {
        if (err) throw err;
        console.log(`
        Updated employee: 
          - employee: ${employee} ===> new title:${title.split(':')[1]}
          - new manager: ${manager.split(':')[1].substring(1)}
        `);
        promptUser();
      }
    )

  })
  .catch(err => {
    if (err) throw err;
  });
}