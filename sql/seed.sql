USE cms_db;

INSERT INTO department (name)
VALUES  ("research"), ("engineering")

INSERT INTO role (title, salary, department_id)
VALUES ("lead researcher", 90000.00, 11), ("researcher", 80000.00, 11), ("lead engineer", 90000.00, 12), ("engineer", 80000.00, 12)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ( "Shang", "Li", 1, null), ("Mulan", "Hua", 2, 34), ("Mushu", "Red", 3, null ), ("Cri", "Kee", 4, 56);