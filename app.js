const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3006
const path = require('path')
//const initDb = require('./db/initDb')

// middlesWare
app.use(cors())
app.use(bodyParser.json())


// Servir les fichiers statiques (build React)
app.use(express.static(path.join(__dirname, 'public')));

// Route par défaut pour index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// endpoint

// erreur 404
app.use(({res}) => {
    const message = 'Erreur 404'
    res.status(404).json({message})
})

//initDb()

app.listen(port, () => console.log(`server demarré sur le port ${port}`))