const express    = require('express');
const oracledb   = require('oracledb');
const bodyParser = require('body-parser');
const config     = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('../public'));

app.post('/api/login', async (req, res) => {
  console.log(req.body);

  const { usuario, clave } = req.body;

  try {
    const connection = await oracledb.getConnection(config);

    const result = await connection.execute(
      `SELECT * 
       FROM usuarios 
       WHERE nombre = :usuario 
       AND passw = :clave`,
      [usuario, clave]
    );

    await connection.close();

    if (result.rows.length > 0) {
      res.json({ success: true, usuario: usuario });
    } else {
      res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});