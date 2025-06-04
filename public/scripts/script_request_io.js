import Game from "./morpion_classes.js"

let gameBoardId = null;
let idUser = null;

addEventListener('DOMContentLoaded', (event) =>{
  const websocket_connexion = new WebSocket('ws://25.9.160.127:3017')

  const createGameButton = document.getElementById('create_clicked') 
    createGameButton.addEventListener('click', () => {
      createGameMsg()
    })

  const joinGameButton = document.getElementById('join_clicked')
  joinGameButton.addEventListener('click', () => {
    joinGameMsg()
  })
  
    websocket_connexion.onmessage = (event) => {
      const srv_data = JSON.parse(event.data);
      console.log("data received from srv :", srv_data)
      if (srv_data.state === "new_connection") {
        handleNewConnexion(srv_data.idUser)
      }
      else if (srv_data.state === "create_game") {
        console.log("data0:::", srv_data)
        const formatedData = srv_data.GameBoard //JSON.parse(srv_data.GameBoard)
        console.log("data :::", formatedData)
        const newGame = new Game(
          formatedData.state,
          formatedData.GameBoard,
          formatedData.GameBoardArray,
          formatedData.gameBoardId,
          formatedData.status,
          formatedData.turn, 
          formatedData.turnNumber)
          newGame.render_grid()
    }
  }

  function createGameMsg() {
    console.log('creating game...')
    const formatedData = { state: 'create_game' }
    websocket_connexion.send(JSON.stringify(formatedData))
  }
  function joinGameMsg() {
    console.log('joining game...')
    const joinFormatedData = {
      state: 'join_game',
      gameBoardId: 'PLACEHOLDER-STRING'
    }
    websocket_connexion.send(JSON.stringify(joinFormatedData))
  }
  function handleNewConnexion(get_id) {
    idUser = get_id
  }
  
})