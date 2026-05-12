const express    = require('express');
const oracledb   = require('oracledb');
const bodyParser = require('body-parser');
const config     = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('../public'));  // sirve los archivos HTML

// Ruta de login
app.post('/login', async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const connection = await oracledb.getConnection(config);

    const result = await connection.execute(
      `SELECT * FROM usuarios WHERE nombre = :usuario AND passw = :clave`,
      [usuario, clave]
    );

    await connection.close();

    if (result.rows.length > 0) {
      res.send("Login exitoso. Bienvenido " + usuario);
    } else {
      res.status(401).send("Usuario o contraseña incorrectos");
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Error en el servidor");
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});