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

const storePeople = async (people) => {
  return new Promise(async resolve=>{
    await connection.connect((err) => {
      const sql = `INSERT INTO people(name) VALUES ?`;
      connection.query(sql,[people], function (error) {
        if (error) throw error;
        resolve()
      });
    });
  });
};

const getPeople = async () => {
  return new Promise(async resolve=>{
    const sql = "SELECT name FROM people";
    await connection.query(sql, function (error, results) {
      if (error) throw error;
      resolve(results)
    });
  })
};

app.get("/", async (req, res) => {
  let html = `<h1>Full Cycle Rocks!</h1><ul>`;
  let people = [
    ["Raphael Moraes"]
  ];

  await storePeople(people).then(async ()=>{
    await getPeople().then(people=> {
      people.forEach((p) => {
        html += `<li>${p.name}</li>`;
      });
    });
  });

  html += `</ul>`;
  
  res.send(html);
});

app.listen(port, () => {
  console.log("Online");
});
