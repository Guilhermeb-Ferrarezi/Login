const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors({ origin: 'https://central-de-links.vercel.app/criar' }));
app.use(express.json())


const dbPath = path.join(__dirname, "usuarios.db");
const db = new sqlite3.Database(dbPath);

db.run(`
    CREATE TABLE IF NOT EXISTS usuarios(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_exibicao TEXT NOT NULL,
        usuario TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )
`);

app.post("/criar", (req, res) => {
    const { nome_exibicao, usuario, senha } = req.body;

    const query = `
        INSERT INTO usuarios (nome_exibicao, usuario, senha)
        VALUES (?, ?, ?)
    `;

    db.run(query, [nome_exibicao, usuario, senha], function (err) {
        if (err) {
            console.log(err);
            return res.status(400).json({ msg: "Usuário já existe!" });
        }
        return res.json({ msg: "Conta criada com sucesso!" });
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});



