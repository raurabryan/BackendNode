const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const app = express();
const puerto = 3001;
app.use(bodyParser.json());

const dbConfig = {
  user: "postgres",
  host: "192.168.100.24", 
  database: "pruebas1",
  password: "maxxd123",
  port: 5432,
};

app.use("/contactos", (request, response, next) => {
  console.log("ingresa a middleware");
  console.log("headers:", request.headers);
  console.log("body:", request.body);
  next();
});

app.get("/contactos", async (request, response) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query("SELECT * FROM contactos");
    console.log(result.rows);
    response.send(result.rows);
  } catch (err) {
    console.log(err);
    response.status(500).send("Error al recuperar contactos");
  } finally {
    await client.end();
  }
});

app.post("/contactos", async (req, resp) => {
  const { nombre, apellido, celular } = req.body;
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query(
      "INSERT INTO contactos (nombre, apellido, celular) VALUES ($1, $2, $3) RETURNING *",
      [nombre, apellido, celular]
    );
    console.log(result.rows[0]);
    resp.send(result.rows[0]);
  } catch (err) {
    console.log(err);
    resp.status(500).send("Error al insertar contacto");
  } finally {
    await client.end();
  }
});

app.put("/contactos/:id", async (req, resp) => {
  const { id } = req.params;
  const { nombre, apellido, celular } = req.body;
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query(
      "UPDATE contactos SET nombre = $1, apellido = $2, celular = $3 WHERE id = $4 RETURNING *",
      [nombre, apellido, celular, id]
    );
    console.log(result.rows[0]);
    resp.send(result.rows[0]);
  } catch (err) {
    console.log(err);
    resp.status(500).send("Error al actualizar contacto");
  } finally {
    await client.end();
  }
});

app.delete("/contactos/:id", async (req, resp) => {
  const { id } = req.params;
  const client = new Client(dbConfig);
  try {
    await client.connect();
    await client.query("DELETE FROM contactos WHERE id = $1", [id]);
    resp.send({ mensaje: "Contacto eliminado" });
  } catch (err) {
    console.log(err);
    resp.status(500).send("Error al eliminar contacto");
  } finally {
    await client.end();
  }
});

app.listen(puerto, () => {
  console.log("Servidor listo en el puerto", puerto);
});
