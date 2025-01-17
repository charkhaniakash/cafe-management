CREATE TABLE user(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    contactNumber VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255),
    status VARCHAR(255),
    UNIQUE(email)
);

INSERT INTO user(name , contactNumber, email, password,status, role) VALUES('Admin', '1234567890', 'admin@gmail.com', 'admin', 'true', 'Admin');

CREATE TABLE category(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name varchar(255),
    primary key(id)
);

CREATE TABLE product(
    id int NOT  NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255) NOT NULL,
    price integer,
    status varchar(20)
    primary key(id)
);