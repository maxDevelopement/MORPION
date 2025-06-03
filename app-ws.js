// Import de la librairie 'ws'
const { json } = require('body-parser');
const GameBoard = require('./classes/gameBoard')
const WebSocket = require('ws');
const allGameBoards = []
// Création du serveur WebSocket sur le port 8080
const wss = new WebSocket.Server({ port: 3017 }, () => {
  console.log('Serveur WebSocket lancé sur ws://localhost:8080');
});

wss.on('connection', (ws, req) => {
   ws.clientIP = req.socket.remoteAddress;
  console.log(`Nouvelle connexion de ${ws.clientIP}`);
  // Message de bienvenue
  //ws.send('Bienvenue sur le serveur WebSocket !');

  ws.on('message', (message) => {
    try{
        const stringifiedMsg = message.toString();
        const formatedData = JSON.parse(stringifiedMsg)    
        console.log('type :: ', typeof formatedData)
        console.log('message :: ', formatedData)
        switch(formatedData.state){
            case 'create_game': {
                handleCreateNewGame(ws)
                break
            } 
            case 'join_game': {
                handleJoinGame(formatedData.gameBoardId, ws.clientIP)
                break
            } 
            case 'updateGame': {
                handleUpdateGame(formatedData.gameBoard)
                break
            } 
        }
    }catch(error){

    }

    // Réponse : on renvoie à tous les clients connectés
    /*wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Client ${clientIP} dit : ${message}`);
      }
    });*/
  });

  // Gestion de la fermeture de la connexion
  ws.on('close', () => {
    console.log(`Connexion fermée avec ${ws.clientIP}`);
  });

  // Gestion des erreurs
  ws.on('error', (error) => {
    console.error(`Erreur WebSocket avec ${clientIP} :`, error);
  });
});

const handleCreateNewGame = (ws) => {
    const newGame = new GameBoard(ws.clientIP)
    const formatedResponse = formatResponseForClient(200, newGame)
    newGame.respondeToAllPLayers(formatedResponse)
    allGameBoards.push(newGame)
}
const handleJoinGame = (gameBoardId, clientIP) => {
    const foundedGame = allGameBoards.find((game) => game.gameBoardId === gameBoardId)
    if(!foundedGame) throw new Error()
    foundedGame.players.push(clientIP)
    respondeToAllPLayers(gameBoardData)
}
const handleQuitGame = (playerId) => {

}
const handleUpdateGame = (gameBoardData) => {
    respondeToAllPLayers(gameBoardData)
}
const formatResponseForClient = (status, givenGameBoard) => {
    if(status)
    return JSON.stringify({
        gameBoard: JSON.stringify({ GameBoard:  givenGameBoard})
    })
}