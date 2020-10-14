// const mysql = require('mysql');
// const inquirer = require('inquirer');
// require('console.table');

// let roleID;
// let managerID = null;
// let employeeArray = [];
// let managerArray = [];
// let roleArray = ['Executive', 'Sales Manager', 'Sales Lead', 'Salesperson', 'Engineering Manager', 'Engineering Lead', 'Engineer', 'Head Lawyer', 'Lawyer', 'Head Accountant', 'Accountant', 'Human Resource Manager', 'Human Resource Agent'];

// const connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'password',
//     database : 'employee_tracker'
//   });

//   connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
//     console.log('connected as id ' + connection.threadId);
//     console.log(ascii);
//     populateArray();
//     populateManagerArray();
//     begin();
//   });


//   const allQuery = `SELECT e.id, e.last_name AS 'Last Name', e.first_name AS 'First Name', r.title AS Role, d.name AS Department, CONCAT(managers.first_name, " ", managers.last_name) AS Manager FROM employees AS e
//   LEFT JOIN employees AS managers 
//   ON e.manager_id = managers.id
//   INNER JOIN roles AS r
//   ON e.role_id = r.id
//   INNER JOIN departments AS d
//   ON d.id = r.department_id
//   ORDER BY e.last_name;`;

//   const deptQuery = `SELECT e.id, e.last_name AS 'Last Name', e.first_name AS 'First Name', r.title AS 'Job'
//   FROM employees AS e
//   INNER JOIN roles AS r
//   ON e.role_id = r.id
//   INNER JOIN departments AS d
//   ON d.id = r.department_id
//   WHERE d.name = ? 
//   ORDER BY e.id;`

//   const rollQuery = `SELECT r.title AS 'Role', r.salary AS 'Salary', d.name AS 'Department'
//   FROM roles AS r
//   INNER JOIN departments as d
//   ON r.department_id = d.id
//   ORDER BY r.id;`

//   const addQuery = `INSERT INTO employees(first_name, last_name, role_id, manager_id)
//   VALUES(?, ?, ?, ?);`

//   const updateQuery = `UPDATE employees
//   SET role_id = ?, manager_id = ?
//   WHERE first_name = ? AND last_name = ?;`

//   const deleteQuery = `DELETE FROM employees WHERE first_name = ? AND last_name = ?;`

//   const ascii = `
//       ::::::::::   :::   :::   :::::::::  :::        ::::::::  :::   ::: :::::::::: ::::::::::          ::::::::  :::::::::: ::::    ::: :::::::::: :::::::::      ::: ::::::::::: ::::::::  ::::::::: 
//      :+:         :+:+: :+:+:  :+:    :+: :+:       :+:    :+: :+:   :+: :+:        :+:                :+:    :+: :+:        :+:+:   :+: :+:        :+:    :+:   :+: :+:   :+:    :+:    :+: :+:    :+: 
//     +:+        +:+ +:+:+ +:+ +:+    +:+ +:+       +:+    +:+  +:+ +:+  +:+        +:+                +:+        +:+        :+:+:+  +:+ +:+        +:+    +:+  +:+   +:+  +:+    +:+    +:+ +:+    +:+  
//    +#++:++#   +#+  +:+  +#+ +#++:++#+  +#+       +#+    +:+   +#++:   +#++:++#   +#++:++#           :#:        +#++:++#   +#+ +:+ +#+ +#++:++#   +#++:++#:  +#++:++#++: +#+    +#+    +:+ +#++:++#:    
//   +#+        +#+       +#+ +#+        +#+       +#+    +#+    +#+    +#+        +#+                +#+   +#+# +#+        +#+  +#+#+# +#+        +#+    +#+ +#+     +#+ +#+    +#+    +#+ +#+    +#+    
//  #+#        #+#       #+# #+#        #+#       #+#    #+#    #+#    #+#        #+#                #+#    #+# #+#        #+#   #+#+# #+#        #+#    #+# #+#     #+# #+#    #+#    #+# #+#    #+#     
// ########## ###       ### ###        ########## ########     ###    ########## ##########          ########  ########## ###    #### ########## ###    ### ###     ### ###     ########  ###    ###              
//  `


// //DONE
//   function begin(){
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           message: "What would you like to do?",
//           name: 'choice',
//           choices: [
//             'View all employees',
//             'View all employees by department',
//             'View all employees by manager',
//             'Add employee', 
//             'Remove employee',
//             'Update employee role',
//             'Update employee manager',
//             'View all roles'
//           ]
//         }
//       ]).then(answers => {
//         switch (answers.choice){
//           case 'View all employees':
//             return viewEmployees();
//           case 'View all employees by department':
//             return viewByDepartment();
//           case 'View all employees by manager':
//             return viewByManager();
//           case 'Add employee':
//             return addEmployee();
//           case 'Remove employee':
//             return removeEmployee();
//           case 'Update employee role':
//             return updateRole();
//           case 'Update employee manager':
//             return updateManager();
//           case 'View all roles':
//             return viewRoles();
            
//         };
//       });
//   };

//   function populateArray(){
//     employeeArray = [];
//     connection.query('SELECT first_name, last_name FROM employees ORDER BY last_name;', (err, res) => {
//       if (err) {
//         throw err;
//       }
//         res.forEach(element => {
//           employeeArray.push(element.last_name + ", " + element.first_name);
//         });
//       });
//     };

//   function populateManagerArray(){
//     managerArray = [];
//     connection.query('SELECT first_name, last_name FROM employees WHERE manager_id IS NULL ORDER BY last_name;', (err, res) => {
//       if (err) {
//         throw err;
//       }
//         res.forEach(element => {
//           managerArray.push(element.last_name + ", " + element.first_name);
//         });
//       });

//   }
  
  
// function chooseRole(x){
//   switch(x) {
//     case 'Executive':
//       roleID = 1;
//       managerID = 0;
//       break;
//     case 'Sales Manager':
//       roleID = 2;
//       managerID = 0;
//       break;
//     case "Sales Lead":
//       roleID = 3;
//       managerID = 2;
//       break;
//     case 'Salesperson':
//       roleID = 4;
//       managerID = 2;
//       break;
//     case 'Engineering Manager':
//       roleID = 5;
//       managerID = 0;
//       break;
//     case "Engineering Lead":
//       roleID = 6;
//       managerID = 3;
//       break;
//     case 'Engineer':
//       roleID = 7;
//       managerID = 3;
//       break;
//     case 'Head Lawyer':
//       roleID = 8;
//       managerID = 0;
//       break;
//    case "Lawyer":
//       roleID = 9;
//       managerID = 4;
//       break;
//   case 'Head Accountant':
//       roleID = 10;
//       managerID = 0;
//       break;
//   case 'Accountant':
//       roleID = 11;
//       managerID = 5
//       break;
//   case "Human Resources Manager":
//       roleID = 12;
//       managerID = 0;
//       break;
//   case "Human Resources Agent":
//       roleID = 13;
//       managerID = 6
//       break;
//   }
// }
// //DONE
//   function viewEmployees(){
//     connection.query(allQuery, (err, res) => {
//       if (err) {
//         throw err;
//       }
//       console.table(res);
//       begin();
//     });
//   }
// //DONE
//   function viewByDepartment(){
//     inquirer 
//       .prompt([
//         {
//           type: "list",
//           message: 'What department would you like to see the employees from?',
//           name: 'department',
//           choices: [
//             'Executive',
//             'Sales',
//             'Legal',
//             'Engineering',
//             'Accounting',
//             'Human Resources'
//           ]
//         },
//       ]).then(response => {
//         connection.query(deptQuery, response.department, (err, res) => {
//           if (err) {
//             throw err;
//           }
//           console.table(res);
//           begin();
//         });
//       })
//   }

//   function viewByManager(){

//   }

// //DONE
//   function addEmployee(){
//     inquirer
//       .prompt([
//         {
//           type: 'list',
//           message: "What will be the new employee's job?",
//           name: 'role',
//           choices: roleArray
//         },
//         {
//           type: "input",
//           message: "What is the employee's first name?",
//           name: "first"
//         },
//         {
//           type: "input",
//           message: "What is the employee's last name?",
//           name: "last"
//         }
//       ]).then(response => {
//         //let role = response.role;

//         let firstName = response.first;
//         let lastName = response.last;

//         chooseRole(response.role)
        
//         connection.query(addQuery, [firstName, lastName, roleID, managerID], (err, res) => {
//           if (err) {
//             throw err;
//           }
//           console.log(`${firstName} ${lastName} Added!`);
//           populateArray();
//           populateManagerArray();
//           begin();
//         });

//       })
//   }

//   //DONE
//   function removeEmployee(){
//       inquirer
//         .prompt([
//           {
//             type: 'list',
//             message: 'Please select the employee you would like to delete',
//             name: 'removeName',
//             choices: employeeArray
//           },
//           {
//             type: 'confirm',
//             message: 'Are you sure you want to permanently delete this employee?',
//             name: 'confirm'
//           }
//         ]).then(response => {
//           if(response.confirm === true){
//             let nameArray = response.removeName.split(', ');
//             connection.query(deleteQuery, [nameArray[1], nameArray[0]], (err, res) => {
//               if (err) {
//                 throw err;
//               }         
//               console.log(`${nameArray[1]} ${nameArray[0]} has been deleted from the database.`);
//               populateArray();
//               populateManagerArray();
//               begin();
//             });
//           };
//         });

    
//   }

//   //DONE
//   function updateRole(){
//     inquirer 
//       .prompt([
//         {
//           type: 'list',
//           message: 'What employee would you like to update?',
//           name: 'changeRole',
//           choices: employeeArray
//         },
//         {
//           type: 'list',
//           message: 'What role would you like to switch them to?',
//           name: 'role',
//           choices: roleArray
//         }
//       ]).then(response => {
//         //console.log(response);
//         let nameArray = response.changeRole.split(', ');
//         chooseRole(response.role);
//         connection.query(updateQuery, [roleID, managerID, nameArray[1], nameArray[0]], (err, res) => {
//           if (err) {
//             throw err;
//           }
//           console.log(`${nameArray[1]} ${nameArray[0]} Updated!`);
//           populateArray();
//           populateManagerArray();
//           begin();
//         });
//       })
//   }


//   function updateManager(){

//   }
//   //DONE
//   function viewRoles(){
//     connection.query(rollQuery, (err, res) => {
//       if (err) {
//         throw err;
//       }
//       console.table(res);
//       begin();
//     });
//   }

const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

let roleID;
let managerID = null;
let employeeArray = [];
let managerArray = [];
let roleArray = ['Sales Manager', 'Sales Lead', 'Salesperson', 'Engineering Manager', 'Engineering Lead', 'Engineer', 'Head Lawyer', 'Lawyer', 'Head Accountant', 'Accountant', 'Human Resource Manager', 'Human Resource Agent'];

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
    console.log(ascii);
    populateArray();
    populateManagerArray();
    begin();
  });


  const allQuery = `SELECT employees.id, employees.last_name AS 'Last Name', employees.first_name AS 'First Name', r.title AS Role, d.id, d.name AS Department, CONCAT(managers.first_name, " ", managers.last_name) AS Manager FROM employees
  LEFT JOIN employees AS managers 
  ON employees.manager_id = managers.id
  INNER JOIN roles AS r
  ON employees.role_id = r.id
  INNER JOIN departments AS d
  ON d.id = r.department_id
  ORDER BY employees.last_name;`;

  const managerQuery = `SELECT e.id, e.last_name AS 'Last Name', e.first_name AS 'First Name', r.title AS Role, d.id, d.name AS Department FROM employees AS e
  LEFT JOIN employees AS managers 
  ON e.manager_id = managers.id
  INNER JOIN roles AS r
  ON e.role_id = r.id
  INNER JOIN departments AS d
  ON d.id = r.department_id
  WHERE CONCAT(managers.first_name, " ", managers.last_name) = ?
  ORDER BY e.last_name;`

  const deptQuery = `SELECT e.id, e.last_name AS 'Last Name', e.first_name AS 'First Name', r.title AS 'Job'
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

  const updateQuery = `UPDATE employees
  SET role_id = ?, manager_id = ?
  WHERE first_name = ? AND last_name = ?;`

  const updateManagerQuery = `UPDATE employees
  SET manager_id = ? WHERE first_name = ? AND last_name = ?;`

  const deleteQuery = `DELETE FROM employees WHERE first_name = ? AND last_name = ?;`

  const ascii = `
      ::::::::::   :::   :::   :::::::::  :::        ::::::::  :::   ::: :::::::::: ::::::::::          ::::::::  :::::::::: ::::    ::: :::::::::: :::::::::      ::: ::::::::::: ::::::::  ::::::::: 
     :+:         :+:+: :+:+:  :+:    :+: :+:       :+:    :+: :+:   :+: :+:        :+:                :+:    :+: :+:        :+:+:   :+: :+:        :+:    :+:   :+: :+:   :+:    :+:    :+: :+:    :+: 
    +:+        +:+ +:+:+ +:+ +:+    +:+ +:+       +:+    +:+  +:+ +:+  +:+        +:+                +:+        +:+        :+:+:+  +:+ +:+        +:+    +:+  +:+   +:+  +:+    +:+    +:+ +:+    +:+  
   +#++:++#   +#+  +:+  +#+ +#++:++#+  +#+       +#+    +:+   +#++:   +#++:++#   +#++:++#           :#:        +#++:++#   +#+ +:+ +#+ +#++:++#   +#++:++#:  +#++:++#++: +#+    +#+    +:+ +#++:++#:    
  +#+        +#+       +#+ +#+        +#+       +#+    +#+    +#+    +#+        +#+                +#+   +#+# +#+        +#+  +#+#+# +#+        +#+    +#+ +#+     +#+ +#+    +#+    +#+ +#+    +#+    
 #+#        #+#       #+# #+#        #+#       #+#    #+#    #+#    #+#        #+#                #+#    #+# #+#        #+#   #+#+# #+#        #+#    #+# #+#     #+# #+#    #+#    #+# #+#    #+#     
########## ###       ### ###        ########## ########     ###    ########## ##########          ########  ########## ###    #### ########## ###    ### ###     ### ###     ########  ###    ###              
 `


//DONE
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

  function populateArray(){
    employeeArray = [];
    connection.query('SELECT first_name, last_name FROM employees ORDER BY last_name;', (err, res) => {
      if (err) {
        throw err;
      }
        res.forEach(element => {
          employeeArray.push(element.last_name + ", " + element.first_name);
        });
      });
    };

  function populateManagerArray(){
    managerArray = [];
    connection.query('SELECT first_name, last_name FROM employees WHERE manager_id IS NULL ORDER BY last_name;', (err, res) => {
      if (err) {
        throw err;
      }
        res.forEach(element => {
          managerArray.push(element.last_name + ", " + element.first_name);
        });
      });

  }
  
  
function chooseRole(x){
  switch(x) {
    case 'Sales Manager':
      roleID = 1;
      managerID = 0;
      break;
    case "Sales Lead":
      roleID = 2;
      managerID = 1;
      break;
    case 'Salesperson':
      roleID = 3;
      managerID = 1;
      break;
    case 'Engineering Manager':
      roleID = 4;
      managerID = 0;
      break;
    case "Engineering Lead":
      roleID = 5;
      managerID = 2;
      break;
    case 'Engineer':
      roleID = 6;
      managerID = 2;
      break;
    case 'Head Lawyer':
      roleID = 7;
      managerID = 0;
      break;
   case "Lawyer":
      roleID = 8;
      managerID = 3;
      break;
  case 'Head Accountant':
      roleID = 9;
      managerID = 0;
      break;
  case 'Accountant':
      roleID = 10;
      managerID = 4;
      break;
  case "Human Resources Manager":
      roleID = 11;
      managerID = 0;
      break;
  case "Human Resources Agent":
      roleID = 12;
      managerID = 5;
      break;
  }
}


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
//DONE
  function viewByManager(){
    inquirer
      .prompt([
        {
          type: 'list',
          message: "What manager would you like to see the employees of?",
          name: 'manager',
          choices: managerArray
        }
      ]).then(response => {
        let nameArray = response.manager.split(', ');
        connection.query(managerQuery, nameArray[1] + " " + nameArray[0], (err, res) => {
          if (err) {
            throw err;
          }
          console.log(response.manager);
          console.table(res);
          begin();
        });
      })
  }

//DONE
  function addEmployee(){
    inquirer
      .prompt([
        {
          type: 'list',
          message: "What will be the new employee's job?",
          name: 'role',
          choices: roleArray
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

        let firstName = response.first;
        let lastName = response.last;

        chooseRole(response.role)
        
        connection.query(addQuery, [firstName, lastName, roleID, managerID], (err, res) => {
          if (err) {
            throw err;
          }
          console.log(`${firstName} ${lastName} Added!`);
          populateArray();
          populateManagerArray();
          begin();
        });

      })
  }

  //DONE
  function removeEmployee(){
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
            let nameArray = response.removeName.split(', ');
            connection.query(deleteQuery, [nameArray[1], nameArray[0]], (err, res) => {
              if (err) {
                throw err;
              }         
              console.log(`${nameArray[1]} ${nameArray[0]} has been deleted from the database.`);
              populateArray();
              populateManagerArray();
              begin();
            });
          };
        });

    
  }

  //DONE
  function updateRole(){
    inquirer 
      .prompt([
        {
          type: 'list',
          message: 'What employee would you like to update?',
          name: 'changeRole',
          choices: employeeArray
        },
        {
          type: 'list',
          message: 'What role would you like to switch them to?',
          name: 'role',
          choices: roleArray
        }
      ]).then(response => {
        //console.log(response);
        let nameArray = response.changeRole.split(', ');
        chooseRole(response.role);
        connection.query(updateQuery, [roleID, managerID, nameArray[1], nameArray[0]], (err, res) => {
          if (err) {
            throw err;
          }
          console.log(`${nameArray[1]} ${nameArray[0]} Updated!`);
          populateArray();
          populateManagerArray();
          begin();
        });
      })
  }


  function updateManager(){
    inquirer 
    .prompt([
      {
        type: 'list',
        message: 'What employee would you like to update?',
        name: 'changeManager',
        choices: employeeArray
      },
      {
        type: 'list',
        message: 'What manager would you like to switch them to?',
        name: 'manager',
        choices: managerArray
      }
    ]).then(response => {
      //console.log(response);
      let nameArray = response.manager.split(', ');
      connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS "manager", id FROM employees WHERE first_name = ? AND last_name = ?', [nameArray[1], nameArray[0]], (err, res) => {        
        managerID = res[0].id
        let secondNameArray = response.changeManager.split(', '); 
        connection.query(updateManagerQuery, [managerID, secondNameArray[1], secondNameArray[0]], (err, res) => {
          if (err) {
            throw err;
          }
          console.log(`${nameArray[1]} ${nameArray[0]}'s manager updated!`);
          populateArray();
          populateManagerArray();
          begin();
        });
      })

  

    })
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