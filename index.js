const inquirer = require("inquirer");
const mysql = require("mysql2");

//On load start with the homepage
homePage();

//Creates a connection with my sql
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        database: "tracker_db",
    },
);

//First function with options 
function homePage() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "employeeType",
        choices: [
            //options that user is given
            "View all employees",
            "Add an employee",
            "Update an employee role",
            "View all roles",
            "Add a role",
            "View all departments",
            "Add a department",
        ],
    },])

//Once a option is chosen it is told what to do with that selection
    .then((answers) => {
        switch (answers.employeeType) {
            case "View all employees":
                console.log("View all employees");
                viewEmployees();
                break;
            case "Add an employee":
                console.log("Add an employee");
                addEmployee();
                break;
            case "Update an employee role":
                console.log("Update an employee role");
                updateEmployee();
                break;
            case "View all roles":
                console.log("View all roles");
                viewRoles();
                break;
            case "Add a role":
                console.log("Add a role");
                addRole();
                break;
            case "View all departments":
                console.log("View all departments");
                viewDepartments();
                break;
            case "Add a department":
                console.log("Add a department");
                addDepartment();
                break;
        }});
}

//show the different departments then go back to homepage
function viewDepartments() {
    const sql = "SELECT id, department_name AS title FROM departments";
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
    console.table(rows);
    homePage();
  });
}
//Show roles then go back to homepage
function viewRoles() {
    const sql = "SELECT id, role_name AS title, salary AS salary  FROM roles";

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
    console.table(rows);
    homePage();
  });
}

//Show employees then go bacj to homepage
function viewEmployees() {
    const sql = `SELECT role_id AS RoleID, last_name AS LastName, first_name AS FirstName FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
    console.table(rows);
    homePage();
  });
}
//Gives the ablility to add departems 
function addDepartment() {
    inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "departmentName",
      },
    ])
    .then((res) => {
      const sql = "INSERT INTO departments (department_name) VALUES (?)";
      const params = [res.departmentName];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Added");
        homePage();
      });
    });
}
//adds a role
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role you would like to add?",
            name: "roleName",
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary",
        },
        {
            type: "input",
            message: "What will be the department ID?",
            name: "department_id",
        },
    ])
    .then((res) => {
        const sql = "INSERT INTO roles (role_name, salary, department_id) VALUES (?)";
        const params = [res.roleName, res.salary, res.department_id];
        db.query(sql, [params], (err, result) => {
            if (err) {
                console.log(err);
            return;
            }
        console.log("added");
        homePage();
        });
    });
}
//adds an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the employee you would like to add?",
            name: "first_name",
        },
        {
            type: "input",
            message: "What is the last name of the employee you would like to add?",
            name: "last_name",
        },
        {
            type: "input",
            message: "What the role ID for the new employee?",
            name: "role_id",
        },
        {
            type: "input",
            message: "What the manager ID for the new employee?",
            name: "manager_id",
        },
    ])
    .then((res) => {
        const sql = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)";
        const params = [
            res.first_name,
            res.last_name,
            res.role_id,
            res.manager_id,
        ];
        db.query(sql, [params], (err) => {
            if (err) {
                console.log(err);
                return;
            }
            homePage();
        });
    });
}
//give the ablity to update an employee
function updateEmployee() {
    inquirer.prompt([
    {
        type: "input",
        message: "What is the first name of the employee you would like to update?",
        name: "employeeName",
    },
    ])
    .then((res) => {
        const isExistingEmployee = db
        .promise()
        .query("SELECT first_name, id, role_id from employees WHERE first_name = ?" , [res.employeeName]);
        if (!isExistingEmployee) {
            console.log("Doesn't exist", isExistingEmployee);
            process.exitCode = 1;
            process.exit();
        }
        console.log(isExistingEmployee);
        return isExistingEmployee;
    })
    .then((employee) => {
      console.log(employee);
      const sql = "INSERT INTO employees (role) VALUES (?)";
      db.query(sql, res.employeeName, (err,result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Added");
        homePage();
      });
    });
}
