class GameBoard{
    constructor(idUserCreator, userWs){
        this.status = 'started'; 
        this.gameBoardId = this.setGameBoardId();
        this.turn = [idUserCreator];
        this.players = [{
                idUser: idUserCreator,
                ws: userWs 
            }
        ];
        this.GameBoardArray = [
            { x: 0, y: 0, player: "empty" },
            { x: 0, y: 1, player: "empty" },
            { x: 0, y: 2, player: "empty" },
            { x: 1, y: 0, player: "empty" },
            { x: 1, y: 1, player: "empty" },
            { x: 1, y: 2, player: "empty" },
            { x: 2, y: 0, player: "empty" },
            { x: 2, y: 1, player: "empty" },
            { x: 2, y: 2, player: "empty" },
        ]
    }
    setGameBoardId(){
        const timeStamp = Date.now()
        const randomisedTimeStamp = timeStamp * Math.floor(Math.random() * 9);
        return randomisedTimeStamp
    }
    respondeToAllPLayers = (givenResonse) => {
        this.players.forEach((player) => {
            if (player.ws.readyState !== WebSocket.OPEN) throw new Error();
            client.ws.send(givenResonse);
        })
    }
}
module.exports = GameBoard
