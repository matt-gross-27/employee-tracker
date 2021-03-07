# employee-tracker

```
AS A business owner

I WANT to be able to view and manage the departments, roles, and employees in my company

SO THAT I can organize and plan my business
```

```
GIVEN a command-line application that accepts user input

WHEN I start the application
THEN I am presented with the following options: 
  view all departments
, view all roles
, view all employees
, add a department
, add a role, 
, add an employee, 
, and update an employee role

WHEN I choose to view all departments
THEN I am presented with a formatted table showing: 
  - department names
  - department ids

WHEN I choose to view all roles
THEN I am presented with: 
  - role id
  - job title
  - role salary
  - role department

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including: 
  - employee id
  - first names
  - last names
  - job titles
  - departments
  - salaries
  - managers

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```