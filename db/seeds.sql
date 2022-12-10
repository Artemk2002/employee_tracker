USE tracker_db;

INSERT INTO departments ( department_name)
VALUES ("Engineering"),
       ("Computer Science"),
       ("Web");

INSERT INTO roles (department_id, role_name, salary)
VALUES (1,"Mech Engineer", 100000),
       (1,"Software Engineer", 120000),
       (2,"Back-end Dev", 120000),
       (2,"Front-end Dev", 110000);
       

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Artem", "Khomenko", 1, NULL),
        ("Jack", "Smith", 2, 1),
        ("Bob", "Minion", 1, NULL);