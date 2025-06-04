// Import de la librairie 'ws'
const { json } = require('body-parser');
const GameBoard = require('./classes/gameBoard');
const WebSocket = require('ws');
const allGameBoards = [];

// Création du serveur WebSocket sur le port 3017
const wss = new WebSocket.Server({ port: 3017 }, () => {
  console.log('Serveur WebSocket lancé sur ws://localhost:8080');
});

wss.on('connection', (ws, req) => {
   ws.clientIP = req.socket.remoteAddress;
    console.log(`Nouvelle connexion de ${ws.clientIP}`);
    // Première connexion => renvoi du idUser
    ws.send(JSON.stringify({
      state: 'new_connection',
      idUser: ws.clientIP
    }));

  ws.on('message', (message) => {
    try{
        const stringifiedMsg = message.toString();
        const formatedData = JSON.parse(stringifiedMsg)    
        //console.log('type :: ', typeof formatedData)
        console.log('ws :: ', ws)
        switch(formatedData.state){
            case 'create_game': {
                console.log("case create_game")
                handleCreateNewGame(ws)
                break
            } 
            case 'join_game': {
                handleJoinGame(formatedData.gameBoardId, ws.clientIP, ws)
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

function handleCreateNewGame(ws){
    console.log("handleCreateNewGame")
    
      const newGame = new GameBoard(ws)
      console.log(" newGame : ", newGame)   
      const gameToReturn = newGame.withoutWs()
      console.log("gameToReturn : ", gameToReturn)
    //try{  
      const formatedResponse = formatResponseForClient('create_game', gameToReturn)
      newGame.respondeToAllPLayers(formatedResponse)
      allGameBoards.push(newGame)     
    /*}catch(erreur){
        console.log("ERREUR ::: ", erreur)
    }*/
}
const handleJoinGame = (gameBoardId, clientIP, clientWs) => {
    const foundedGame = allGameBoards.find((game) => game.gameBoardId === gameBoardId)
    if(!foundedGame) throw new Error()
    foundedGame.players.push(clientIP)
    foundedGame.respondeToAllPLayers(gameBoardData)
}
const handleQuitGame = (playerId) => {

}
const handleUpdateGame = (gameBoardData) => {
    respondeToAllPLayers(gameBoardData)
}
const formatResponseForClient = (state, givenGameBoard) => {
    return JSON.stringify({ state: state, GameBoard:  givenGameBoard})
}