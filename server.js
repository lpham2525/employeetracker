const cTable = require('console.table')
const mySql = require('mysql2')
const { prompt } = require('inquirer')
const db = require('./db')
// const orm = require("./orm")

function start () {
  console.log('Welcome!')
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View employees',
        'View roles',
        'View departments',
        'Add employee',
        'Add role',
        'Add department',
        'Update employee role',
        "Update employee's manager",
        'View employees by manager',
        'Delete employee',
        'Delete role',
        'Delete department',
        'View department budget'
      ]
    }
  ])
    .then((info) => {
      switch (info.action) {
        case 'View employees':
          viewEmployees()
          break;
        case 'View roles':
          viewRoles()
          break;
        case 'View departments':
          viewDept()
          break;
        case 'Add employee':
          addEmployee()
          break;
        case 'Add role':
          addRole()
          break;
        case 'Add department':
          addDept()
          break;
        case 'Update employee role':
          updateRole()
          break;
        case "Update employee's manager":
          updateManager()
          break;
        case 'View employees by manager':
          viewEmpByBoss()
          break;
        case 'Delete employee':
          deleteEmployee()
          break;
        case 'Delete role':
          deleteRole()
          break;
        case 'Delete department':
          deleteDept()
          break;
        case 'View department budget':
          viewDeptBudget()
        default:
          break
      }
    })
    .catch((err) => console.error(err))
}

function proceed () {
  prompt([
    {
      type: 'list',
      name: 'proceed',
      message: 'Would you like to execute another action?',
      choices: ['Yes', 'No']
    }
  ])
    .then((info) => {
      switch (info.proceed) {
        case 'Yes':
          start()
          break;
        case 'No':
          process.exit(0)
          break;
        default:
          break
      }
    })
    .catch((err) => console.error(err))
}

function viewEmployees () {
  db.query('SELECT * FROM employee', (err, info) => {
    if (err) {
      console.error(err)
    }
    console.table(info)
    proceed()
  })
}

function viewRoles () {
  db.query('SELECT * FROM role', (err, info) => {
    if (err) {
      console.error(err)
    }
    console.table(info)
    proceed()
  })
}

function viewDept () {
  db.query('SELECT * FROM department', (err, info) => {
    if (err) {
      console.error(err)
    }
    console.log(info)
    proceed()
  })
}

function addEmployee () {
  prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the employee?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the last name of the employee?'
    },
    {
      type: 'list',
      name: 'roleId',
      message: `What is the role id of the employee? 
        Choose among(1)lead researcher, 
        (2)researcher, 
        (3)lead engineer, 
        (4)engineer.`,
      choices: [1, 2, 3, 4]
    },
    {
      type: 'list',
      name: 'managerId',
      message: `Who is the manager of the new employee? 
        Choose (34) for Shang Li and (56) for Mushu Red.`,
      choices: [34, 56]
    }
  ])
    .then((info) => {
      console.log(info)
      db.query(
        'INSERT INTO employee SET ? ',
        {
          first_name: info.firstName,
          last_name: info.lastName,
          role_id: info.roleId,
          manager_id: info.managerId
        },
        (err, info) => {
          if (err) {
            console.error(err)
          }
          console.table(info)
          console.log('New employee added!')
          proceed()
        }
      )
    })
    .catch((err) => console.error(err))
}

function addRole () {
  prompt([
    {
      type: 'input',
      name: 'newRole',
      message: 'What is the new role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this new role?'
    },
    {
      type: 'list',
      name: 'roleDept',
      message: `To which department does the new role belong? 
      Choose (11) for research and (12) for engineering`,
      choices: [11, 12]
    }
  ])
    .then((info) => {
      db.query(
        'INSERT INTO role SET ? ',
        {
          title: info.newRole,
          salary: info.salary,
          department_id: info.roleDept
        },
        (err, info) => {
          if (err) {
            console.error(err)
          }
          console.table(info)
          console.log('New role added!')
          proceed()
        }
      )
    })
    .catch((err) => console.log(err))
}

function addDept () {
  prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What is the name of the new department?'
    }
  ])
    .then((info) => {
      console.log(info)
      db.query(
        'INSERT INTO department SET ? ',
        {
          name: info.newDepartment
        },
        (err, info) => {
          if (err) {
            console.error(err)
          }
          console.log('New department added!')
          console.table(info)
          proceed()
        }
      )
    })
    .catch((err) => console.error(err))
}

function updateRole () {
  prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: `What is the id of the employee whom you would like to update?
      Choose (1)Shang Li, (2) Mulan Hua, (3) Mushu Red, (4) Cri Kee`,
      choices: [1, 2, 3, 4]
    },
    {
      type: 'list',
      name: 'newEmployeeRole',
      message: `What is the new role of the employee? 
        Choose among (1)lead researcher, (2)researcher, 
        (3)lead engineer, (4)engineer`,
      choices: [1, 2, 3, 4]
    }
  ])
    .then((info) => {
      console.log(info)
      db.query('UPDATE employee SET ? WHERE ?',
        [{ role_id: info.newEmployeeRole }, { id: `${info.employeeId}` }],
        (err, info) => {
          if (err) {
            console.error(err)
          }
          console.table(info)
          proceed()
        }
      )
    })
    .catch((err) => console.log(err))
}

function updateManager () {
  prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: `What is the id of the employee whom you would like to update?
      Choose (1)Shang Li, (2) Mulan Hua, (3) Mushu Red, (4) Cri Kee`,
      choices: [1, 2, 3, 4]
    },
    {
      type: 'list',
      name: 'newManager',
      message: `What is the manager id of the employee's new manager? 
          Choose (34) for Shang Li and (56) for Mushu Red.`,
      choices: [34, 56]
    }
  ])
    .then((info) => {
      console.log(info)
      db.query(
        'UPDATE employee SET ? WHERE ?',
        [{ manager_id: info.newManager }, { id: `${info.employeeId}` }],
        (err, info) => {
          if (err) {
            console.error(err)
          }
          console.table(info)
          proceed()
        }
      )
    })
    .catch((err) => console.log(err))
}

function viewEmpByBoss () {
  db.query('SELECT * FROM employee WHERE manager_id is NULL', (err, managers) =>{
    const managersArr = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }))
    prompt([
      {
        type: 'list',
        name: 'manager',
        message: 'For which manager would you like to see the employees?',
        choices: managersArr
      }
    ])
      .then((info) => {
        console.log(info)
        db.query('SELECT first_name, last_name FROM employee WHERE ? ',
          { manager_id: info.manager },
          (err, employees) => {
            if (err) {
              console.error(err)
            }
            console.table(employees)
            proceed()
          })
      })
      .catch((err) => console.log(err))

 })
}

function deleteEmployee () {
  prompt([
    {
      type: 'list',
      name: 'id',
      message: `What is the id of the employee who is being deleted?
      Choose (1)Shang Li, (2) Mulan Hua, (3) Mushu Red, (4) Cri Kee`,
      choices: [1, 2, 3, 4]
    }
  ])
    .then((info) => {
      console.log(info)
      db.query(
        'DELETE FROM employee WHERE ?',
        { id: `${info.id}` },
        (err, info) => {
          if (err) {
            console.log(err)
          }
          console.table(info)
          console.log('Employee terminated.')
          proceed()
        }
      )
    })
    .catch((err) => console.log(err))
}

function deleteRole () {
  prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Which role is being deleted?',
      choices: ['lead researcher', 'researcher', 'lead engineer', 'engineer']
    }
  ])
    .then((info) => {
      console.log(info)
      db.query('DELETE FROM role WHERE ?', { title: info.role }, (err, info) => {
        if (err) {
          console.log(err)
        }
        console.table(info)
        console.log('Role terminated.')
        proceed()
      })
    })
    .catch((err) => console.log(err))
}

function deleteDept () {
  prompt([
    {
      type: 'list',
      name: 'dept',
      message: 'Which department is being deleted?',
      choices: ['research', 'engineering']
    }
  ]).then((info) => {
    console.log(info)
    db.query(
      'DELETE FROM department WHERE ?',
      { name: info.dept },
      (err, info) => {
        if (err) {
          console.log(err)
        }
        console.table(info)
        console.log('Department terminated.')
        proceed()
      }
    )
  })
    .catch((err) => console.log(err))
}

function viewDeptBudget () {
  prompt([
    {
      type: 'list',
      name: 'dept',
      message: 'What is the department id of the department budget would you like to view? Choose (11) for research and (12) for engineering.',
      choices: [11, 12]
    }
  ])
    .then((info) => {
      console.log(info)
      db.query('SELECT sum(role.salary) FROM role WHERE ?', { department_id: info.dept }, (err, budget) => {
        if (err) {
          console.error(err)
        }
        console.log(budget)
        proceed()
      })
    })
    .catch((err) => console.log(err))
}

start()
