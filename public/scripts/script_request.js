addEventListener("load", (event) => { 
    const websocket_connexion = new WebSocket('ws://25.9.160.127:3017');
   
    // Quand la connexion WebSocket est prête
    websocket_connexion.onopen = () => {
        sendWsMsg();
    };

     websocket_connexion.onmessage = (event) => { //mettre a jour affichage des deux cotés
      const data = JSON.parse(event.data);
      console.log("data ::: ", data)
    }
    function sendWsMsg() {
      const formatedData = { state: 'create_game' }
      websocket_connexion.send(JSON.stringify(formatedData));
    }

})