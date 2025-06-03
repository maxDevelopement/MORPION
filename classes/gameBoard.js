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
    isTheGameFinished = () => {
        const isFinished = this.gameBoardId.map((gameCase) => {
            
        })
        return isFinished
    }
    areHorizontalLinesCompletedByUser(horizontalLineIndex){
        const searchedHorizontalLine = this.GameBoardArray.filter((gameCase) => {
            if(gameCase.x === horizontalLineIndex) return gameCase
        })
        return searchedHorizontalLine
    }
    getColorOfSpecifiedCase = (x, y) => {
        const searchedCase = this.GameBoardArray.find((gameCase) => gameCase.x === x && gameCase.y === y)
        return searchedCase.player
    }
}
module.exports = GameBoard
