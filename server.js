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

  const allQuery = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'JOB', d.name AS 'Department', e.manager_id AS 'Manager' 
  FROM employees AS e
  INNER JOIN roles AS r
  ON e.role_id = r.id
  INNER JOIN departments AS d
  ON d.id = r.department_id
  ORDER BY e.id;`;

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
        console.log(answers.choice);
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


  function viewEmployees(){
    connection.query(allQuery, (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);

    });
  }
  function viewByDepartment(){

  }
  function viewByManager(){

  }
  function addEmployee(){

  }
  function removeEmployee(){

  }
  function updateRole(){

  }
  function updateManager(){

  }
  function viewRoles(){

  }