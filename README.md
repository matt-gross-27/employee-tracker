# Employee Tracker

<div style="position: absolute; top: 22px; right: 50px">

![licence: MIT](https://img.shields.io/badge/license-MIT-blue)
</div>

<a href = "#description"></a>

## Description

Employee Tracker is a command line application that allows you to create, view and update an employee database without using any SQL commands.


## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Credits](#credits)
  - [License](#license)
  - [Questions](#questions)

<a href = "#installation"></a>

## Installation
- Clone this repository to your machine. 
- Make sure you have installed [MYSQL](https://dev.mysql.com/downloads/installer/) and [node.js](https://nodejs.org/en/download/) then 
- Run the command ```npm i``` from the root directory to download npm packages used in the application. 
- Add your own .env file to the root directory to configure your database connection. Make sure to include the following fields: 
  - ```PORT```=\<3001 || the port you would like to use\>
  - ```HOST```=\<localhost || a different host\>
  - ```DB```=employee_tracker_db
  - ```USERDB```=<'root' || your mysql username>
  - ```PASSWORD```=<'your MYSQL password'>
  - ```DB_PORT```=<3306 || your db port>

<a href = "#usage"></a>

## Usage
### ⚠️ Only on first use: ⚠️ 
- to Enter the mysql monitor 
  - Run the command ```npm run db```

- to set up your database schema
  - Enter your mysql password
  - From the mysql monitor:
    - Run the command ```source db/schema.sql```
    - ⚠️ This will DELETE and reboot your database with EMPTY tables that have the correct schema ⚠️

- to bulk upload data to your database
  - Edit the file ```db/seeds.sql``` so that it contains your data
    - it currently has dummy data for demonstration
  - From the mysql monitor:
    - run the command ```source db/seeds.sql```

- Type ```quit``` to leave the MySQL monitor

### For continued usage:
- Run the command ```npm start```
- You will be presented with a menu of options. Use the arrow keys to navigate through the menu options and 'Enter' to select an option.Then - just follow the prompts!

<a href = "#features"></a>

## Features
- View all departments
- View all roles
- View all employees
- View payroll by department
- Add a department
- Add a role
- Add an employee
- Update an employee


<a href = "#credits"></a>

## Credits
- [matt-gross-27](https://github.com/matt-gross-27)
- [brianmario/mysql2](https://github.com/brianmario/mysql2)
- [SBoudrias/Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [bkeepers/dotenv](https://github.com/bkeepers/dotenv)
- [bahmutov/console.table](https://github.com/bahmutov/console.table)

<a href = "#license"></a>

## License
- MIT

<a href = "questions"></a>

## Questions
- Feel free to reach out with any question you have about Employee Tracker!

### Contact information:
- GitHub: [matt-gross-27](https://www.github.com/matt-gross-27)
- Email: [mbgross111@gmail.com](mailto:mbgross111@gmail.com)