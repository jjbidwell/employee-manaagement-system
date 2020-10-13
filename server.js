const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'employee_tracker'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
    begin();
  });


  let employeeArray = [];

  const allQuery = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Job', d.name AS 'Department', e.manager_id AS 'Manager' 
  FROM employees AS e
  INNER JOIN roles AS r
  ON e.role_id = r.id
  INNER JOIN departments AS d
  ON d.id = r.department_id
  ORDER BY e.last_name;`;

  const deptQuery = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Job', d.name AS 'Department', e.manager_id AS 'Manager' 
  FROM employees AS e
  INNER JOIN roles AS r
  ON e.role_id = r.id
  INNER JOIN departments AS d
  ON d.id = r.department_id
  WHERE d.name = ? 
  ORDER BY e.id;`

  const rollQuery = `SELECT r.title AS 'Role', r.salary AS 'Salary', d.name AS 'Department'
  FROM roles AS r
  INNER JOIN departments as d
  ON r.department_id = d.id
  ORDER BY r.id;`

  const addQuery = `INSERT INTO employees(first_name, last_name, role_id, manager_id)
  VALUES(?, ?, ?, ?);`

  const deleteQuery = `DELETE FROM employees WHERE first_name = ? AND last_name = ?;`

  function begin(){
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: 'choice',
          choices: [
            'View all employees',
            'View all employees by department',
            'View all employees by manager',
            'Add employee', 
            'Remove employee',
            'Update employee role',
            'Update employee manager',
            'View all roles'
          ]
        }
      ]).then(answers => {
        switch (answers.choice){
          case 'View all employees':
            return viewEmployees();
          case 'View all employees by department':
            return viewByDepartment();
          case 'View all employees by manager':
            return viewByManager();
          case 'Add employee':
            return addEmployee();
          case 'Remove employee':
            return removeEmployee();
          case 'Update employee role':
            return updateRole();
          case 'Update employee manager':
            return updateManager();
          case 'View all roles':
            return viewRoles();
            
        };
      });
  };

//DONE
  function viewEmployees(){
    connection.query(allQuery, (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);
      begin();
    });
  }
//DONE
  function viewByDepartment(){
    inquirer 
      .prompt([
        {
          type: "list",
          message: 'What department would you like to see the employees from?',
          name: 'department',
          choices: [
            'Executive',
            'Sales',
            'Legal',
            'Engineering',
            'Accounting',
            'Human Resources'
          ]
        },
      ]).then(response => {
        connection.query(deptQuery, response.department, (err, res) => {
          if (err) {
            throw err;
          }
          console.table(res);
          begin();
        });
      })
  }
  function viewByManager(){

  }

  //DONE
  function addEmployee(){
    inquirer
      .prompt([
        {
          type: 'list',
          message: "What will be the new employee's job?",
          name: 'role',
          choices: [
            'Executive',
            'Sales Manager',
            'Sales Lead',
            'Salesperson',
            'Engineering Manager',
            'Engineering Lead',
            'Engineer',
            'Head Lawyer',
            'Lawyer',
            'Head Accountant',
            'Accountant',
            'Human Resource Manager',
            'Human Resource Agent'
          ]
        },
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "first"
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "last"
        }
      ]).then(response => {
        //let role = response.role;
        let roleID;
        let firstName = response.first;
        let lastName = response.last;
        let managerID = null;

        switch(response.role) {
          case 'Executive':
            roleID = 1;
            break;
          case 'Sales Manager':
            roleID = 2;
            break;
          case "Sales Lead":
            roleID = 3;
            managerID = 2;
            break;
          case 'Salesperson':
            roleID = 4;
            managerID = 2;
            break;
          case 'Engineering Manager':
            roleID = 5;
            break;
          case "Engineering Lead":
            roleID = 6;
            managerID = 3;
            break;
          case 'Engineer':
            roleID = 7;
            managerID = 3;
            break;
          case 'Head Lawyer':
            roleID = 8;
            break;
         case "Lawyer":
            roleID = 9;
            managerID = 4;
            break;
        case 'Head Accountant':
            roleID = 10;
            break;
        case 'Accountant':
            roleID = 11;
            managerID = 5
            break;
        case "Human Resources Manager":
            roleID = 12;
            break;
        case "Human Resources Agent":
            roleID = 13;
            managerID = 6
            break;
        }
        connection.query(addQuery, [firstName, lastName, roleID, managerID], (err, res) => {
          if (err) {
            throw err;
          }
          console.log('Employee Added!');
          begin();
        });

      })
  }
  function removeEmployee(){
    connection.query('SELECT first_name, last_name FROM employees ORDER BY last_name;', (err, res) => {
      if (err) {
        throw err;
      }
        res.forEach(element => {
          employeeArray.push(element.last_name + ", " + element.first_name);
        });
        inquirer
        .prompt([
          {
            type: 'list',
            message: 'Please select the employee you would like to delete',
            name: 'removeName',
            choices: employeeArray
          },
          {
            type: 'confirm',
            message: 'Are you sure you want to permanently delete this employee?',
            name: 'confirm'
          }
        ]).then(response => {
          if(response.confirm === true){
            let nameArray = response.removeName.split(', ');;
            let first;
            let last;
            connection.query(deleteQuery, [nameArray[1], nameArray[0]], (err, res) => {
              if (err) {
                throw err;
              }         
              console.log(`${nameArray[1]} ${nameArray[0]} has been deleted from the database.`);
              begin();
            });
          };
        });
    });
    
  }

  function updateRole(){

  }
  function updateManager(){

  }
  //DONE
  function viewRoles(){
    connection.query(rollQuery, (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);
      begin();
    });
  }