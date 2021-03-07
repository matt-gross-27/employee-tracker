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
███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗░░░████████╗██████╗░░█████╗░░█████╗░██╗░░██╗███████╗██████╗
██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝░░░╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗
█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░░░░░░░██║░░░██████╔╝███████║██║░░╚═╝█████═╝░█████╗░░██████╔╝
██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░░░░░░░██║░░░██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔══╝░░██╔══██╗
███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗░░░░░░██║░░░██║░░██║██║░░██║╚█████╔╝██║░╚██╗███████╗██║░░██║
╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝░░░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝
  
  `);
  promptUser();
});

promptUser = () => {
  return inquirer.prompt(
    {
      type: 'list',
      name: 'mainMenu',
      message: 'Select from the following options?',
      choices: [  
          'View all departments'
         ,'View all roles'
         ,'View all employees'
         ,'Add a department'
         ,'Add a role'
         ,'Add an employee'
         ,'Update an employee'
         ,'Quit'
      ]
    }
  )
  .then(data => {
    if (data.mainMenu === 'Quit') {
      console.log(`

██████╗░██╗░░░██╗███████╗██╗
██╔══██╗╚██╗░██╔╝██╔════╝██║
██████╦╝░╚████╔╝░█████╗░░██║
██╔══██╗░░╚██╔╝░░██╔══╝░░╚═╝
██████╦╝░░░██║░░░███████╗██╗
╚═════╝░░░░╚═╝░░░╚══════╝╚═╝

      `);
      connection.end();
      return
    }
    if (data.mainMenu.substring(0, 4) === 'View') {
      viewTable(data);
    } else {
      console.log('Still working on handling that request');
      connection.end();
    }
  })
  .catch(err => {
    if (err) throw err
  });
};

viewTable = (obj) => {
  const query = connection.query(
    new Sql(obj).viewTableSql(),
    [],
    (err, res) => {
      if (err) {
        console.log('ERROR: ' + query.sql);
        return;
      }
      console.table(res);
    }
  );
  connection.end();
};