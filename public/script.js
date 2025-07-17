addEventListener("load", (event) => { 
    const ws = new WebSocket('ws://25.9.160.127:3017');
   
    // Quand la connexion WebSocket est prête
    ws.onopen = () => {
        sendWsMsg();
    };

     ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data ::: ", data)
    }
    function sendWsMsg() {
      const formatedData = { state: 'create_game' }
      ws.send(JSON.stringify(formatedData));
    }
})