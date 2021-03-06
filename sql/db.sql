CREATE TABLE IF NOT EXISTS projects (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL CHECK (name <> ''),
    priority integer NOT NULL,  
    description text,
    deliverydate date NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL CHECK (name <> ''),
    done BOOLEAN,
    projectid INTEGER REFERENCES projects(id) ON DELETE CASCADE

);

-- Insert projects

INSERT INTO projects(name, priority, description, deliverydate) VALUES('Make a Web App', 1, 'Using JavaScript', '2021-10-12');

INSERT INTO projects(name, priority, description, deliverydate) VALUES('Make an App', 1, 'Using Dart', '2021-10-13');

INSERT INTO projects(name, priority, description, deliverydate) VALUES('Make a Desktop App', 2, 'Using C++', '2021-10-14');

-- Insert task data
INSERT INTO tasks(name, done, projectid) VALUES('download vuejs',false, 1);

INSERT INTO tasks(name, done, projectid) VALUES('Create UI web',false, 1);

INSERT INTO tasks(name, done, projectid) VALUES('Download flutter',false, 2);

INSERT INTO tasks(name, done, projectid) VALUES('Design UI',false, 3);