addEventListener('DOMContentLoaded', (event) =>{
  const websocket_connexion = new WebSocket('ws://25.9.160.127:3017')

  const createGameButton = document.getElementById('create_clicked') 
    createGameButton.addEventListener('click', () => {
      createGameMsg()
    })
  
    websocket_connexion.onmessage = (event) => {
      const srv_data = JSON.parse(event.data);
      console.log("data :::", srv_data)
    }

  function createGameMsg() {
    console.log('creating game...')
    const formatedData = { state: 'create_game' }
    websocket_connexion.send(JSON.stringify(formatedData))
  }
})