// access process.env.?
require('dotenv').config();
const inquirer = require('inquirer');

const connection = mysql12.connection({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
})

logIn = () => {
  return inquirer.prompt([
    {
      type: 'input',
      message: 'What is your name',
      name: 'nom'
    },
    {
      type: 'input',
      message: 'what is your favorite color',
      name: 'favColor'
    }
  ])
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    if (err) throw err
  });
};


logIn()
