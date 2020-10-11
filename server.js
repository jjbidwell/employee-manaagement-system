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
    afterConnection();

  });

  function afterConnection() {
    // perform a select query and print the result in the console
    connection.query("SELECT * FROM employee", (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);

    });
  }
