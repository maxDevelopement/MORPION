import Game from "./morpion_classes.js"

// global variables

let gameBoardId = null;
let idUser = null;
let actualGame = null;

const gameBoardIdDisplay = document.getElementById("room_number")

// Event handlers

addEventListener('DOMContentLoaded', (event) =>{
  const websocket_connexion = new WebSocket('ws://25.9.160.127:3017')

  const createGameButton = document.getElementById('create_clicked') 
    createGameButton.addEventListener('click', () => {
      console.log("ACTUAL GAME FOOTAGES", actualGame)
      createGameMsg()
    })

  const joinGameButton = document.getElementById('join_clicked')
  joinGameButton.addEventListener('click', () => {
    joinGameMsg()
  })

  const placeTokenButton = document.getElementById('play_move')
    placeTokenButton.addEventListener('click', () => {
      updateGameState()
    })
  
    websocket_connexion.onmessage = (event) => {
      const srv_data = JSON.parse(event.data);
      console.log("data received from srv :", srv_data)
      if (srv_data.state=== "error") {
        window.alert("error with server response, reload the page please.")
      }
      if (srv_data.state === "new_connection") {
        handleNewConnexion(srv_data.idUser)
      }
      else if (srv_data.state === "create_game" || srv_data.state === "join_game") {
        console.log("data0:::", srv_data)
        const formatedData = srv_data.GameBoard //JSON.parse(srv_data.GameBoard)
        console.log("data :::", formatedData)
        actualGame = new Game(
          formatedData.state,
          formatedData.GameBoard,
          formatedData.GameBoardArray,
          formatedData.gameBoardId,
          formatedData.status,
          formatedData.turn, 
          formatedData.turnNumber)
          actualGame.render_grid()
          updateRoomRumber(actualGame.gameBoardID)
    }
  }

  //functions 

  function createGameMsg() {
    console.log('creating game...')
    const formatedData = { state: 'create_game' }
    websocket_connexion.send(JSON.stringify(formatedData))
  }
  function joinGameMsg() {
    console.log('joining game...')
    const joinFormatedData = {
      state: 'join_game',
      gameBoardId: actualGame.gameBoardId
    }
    websocket_connexion.send(JSON.stringify(joinFormatedData))
  }
  function handleNewConnexion(get_id) {
    idUser = get_id
  }
  function updateGameState() {
    let currentboardArray = actualGame.GameBoardArray
    console.log(currentboardArray)
  }
  function updateRoomRumber(roomNumber) {
    gameBoardIdDisplay.value = roomNumber
    gameBoardIdDisplay.disabled = true
  }
})