const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const db_func = require('./config/db');
const db = db_func.my_db();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/api/users', (req, res) => {
  const selectSQL = 'SELECT * FROM users';

  db.query(selectSQL, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/api/suppIngrediant', (req, res) => {
  const tableName = req.body.tableName;
  const ingrediant = req.body.ingrediant;
  const deleteSQL = `DELETE FROM ${tableName} WHERE ingrediant=\'${ingrediant}\'`;

  db.query(deleteSQL, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(result);
    }
  });
})

app.post('/api/supplist', (req, res) => {
  const name = req.body.name;
  const deleteSQL = `drop table \`${name}\``;

  if (name !== 'USERS') {
    db.query(deleteSQL, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  } else {
    res.sendStatus(500);
  }
})

app.post('/api/addListInfo', (req, res) => {
  const ingrediant = req.body.ingrediant;
  const Listname = req.body.name;
  const insertSQL = `INSERT INTO ${Listname} (ingrediant) VALUES ('${ingrediant}')`;

  db.query(insertSQL, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200).send(result);
    }
  });
})

app.post('/api/listInfo', (req, res) => {
  const name = req.body.name;
  const selectSQL = `select * from \`${name}\``;

  db.query(selectSQL, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(result);
    }
  });
})

app.get('/api/list', (req, res) => {
  const selectSQL = 'show tables';

  db.query(selectSQL, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(result);
    }
  });
})

app.post('/api/newlist', (req, res) => {
  const name = req.body.name;
  const id = `id`;
  const ingrediant = `ingrediant`;
  const created_at = `created_at`;
  const updated_at = `updated_at`;

  const createSQL = `CREATE TABLE \`${name}\` (
    ${id} int(11) NOT NULL AUTO_INCREMENT,
    ${ingrediant} varchar(255) NOT NULL,
    ${created_at} datetime DEFAULT NOW(),
    ${updated_at} datetime DEFAULT NOW(),
    PRIMARY KEY (${id})
  );`;

    db.query(createSQL, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    })
});

app.post('/api/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const selectSQL = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;

    db.query(selectSQL, (err, result) => {
      if (result.length == 1) {
        res.status(200).send(result);
      } else {
        res.status(401).send(result);
      }
    });
});

app.post('/api/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const selectSQL = `SELECT * FROM users WHERE email='${email}'`;
  const insertSQL = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;

  db.query(selectSQL, (err, result) => {
    if (result.length > 0) {
      res.status(500).send("Email already taken");
    } else {
      db.query(insertSQL, (errTwo, resultTwo) => {
        if (errTwo) {
          res.sendStatus(500);
        } else {
          res.status(200).send(resultTwo);
        }
      });
    }
  });

});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
