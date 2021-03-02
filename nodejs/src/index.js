const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3000;

const credentials = {
  host: "db_node",
  user: "root",
  password: "12345",
  database: "mydb",
};

const connection = mysql.createConnection(credentials);

const createPeopleTable  = async () => {
  return new Promise(async resolve=>{
    const sql =
    "CREATE TABLE IF NOT EXISTS mydb.people ( id integer not null auto_increment primary key, name VARCHAR(255));";
    await connection.query(sql, function (err, result) {
      if (err) console.log(err);
      resolve();
    });
  })
}


const storePeople = async (people) => {
  return new Promise(async (resolve) => {
    const sql = `INSERT INTO people(name) VALUES ?`;
    await connection.query(sql, [people], function (error) {
      if (error) throw error;
      resolve();
    });
  });
};

const getPeople = async () => {
  return new Promise(async (resolve) => {
    const sql = "SELECT name FROM people";
    await connection.query(sql, function (error, results) {
      if (error) throw error;
      resolve(results);
    });
  });
};

app.get("/", async (req, res) => {
  let people = [["Raphael Moraes"]];
  let html = `<h1>Full Cycle Rocks!</h1><ul>`;

  await createPeopleTable().then(()=>{
    storePeople(people);
  }) 
  
  await getPeople().then((people) => {
    people.forEach((p) => {
      html += `<li>${p.name}</li>`;
    });
  });
  

  html += `</ul>`;

  res.send(html);
});

app.listen(port, () => {
  console.log("Online");
});
