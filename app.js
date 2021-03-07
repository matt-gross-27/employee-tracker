// access process.env.?
require('dotenv').config();
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
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

    ███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗
    ██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝
    █████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░
    ██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░
    ███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗
    ╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝

         ████████╗██████╗░░█████╗░░█████╗░██╗░░██╗███████╗██████╗░
         ╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗
         ░░░██║░░░██████╔╝███████║██║░░╚═╝█████═╝░█████╗░░██████╔╝
         ░░░██║░░░██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔══╝░░██╔══██╗
         ░░░██║░░░██║░░██║██║░░██║╚█████╔╝██║░╚██╗███████╗██║░░██║
         ░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝
  
  `);
  promptUser();
});

promptUser = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'tableName',
      message: 'Which table would you like to view',
      choices: ['employee', 'department', 'role']
    }
  ])
  .then(data => {
    viewTable(data);
  })
  .catch(err => {
    if (err) throw err
  });
};

viewTable = (obj) => {
  const query = connection.query(
    new Sql(obj).selectAllFromTable(),
    [],
    (err, res) => {
      if (err) {
        console.log('ERROR: ' + query.sql);
        return;
      }
      console.table(res);
      console.log(obj.tableName)
    }
  );
  connection.end();
};