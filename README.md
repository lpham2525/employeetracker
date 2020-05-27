# Unit 12 MySQL: Employee Tracker

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. The employee tracker seeks to architect and build a solution for managing a company's employees using node, inquirer, and MySQL. The employee tracker performs a variety of SQL JOINS to connect the database to the command-line application and includes a `seed.sql` file with a database. Its database schema contains three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold the department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold a role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to indicate which role belongs to which department

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee's first name
  * **last_name** - VARCHAR(30) to hold employee's last name
  * **role_id** - INT to refer to employee's role 
  * **manager_id** - INT to refer to another employee who shares the same manager with the current employee. If the employee has no manager, then this field is left empty.
  
The command-line application also allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

The employee tracker seeks to address a challenge which can be framed as follows:

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```
---
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
