export default class Game {

    constructor(
        state, 
        GameBoard, 
        GameBoardArray, 
        gameBoardID, 
        status,
        turn,
        turnNumber,

    ) {
        this.state = state;
        this.GameBoard = GameBoard;
        this.GameBoardArray = GameBoardArray;
        this.gameBoardID = gameBoardID;
        this.status = status;
        this.turn = turn;
        this.turnNumber = turnNumber;
        this.cells = []
    }
    render_grid() {
        const gameboard = document.getElementById('gameboard')
        gameboard.innerHTML = ""
        for (let x = 0; x < 3; x++) {
            const newRow = document.createElement('div')
            newRow.className = "gameboard_x"
            gameboard.appendChild(newRow)
            for (let y = 0; y < 3; y ++) {
                const cellValue = this.get_cell_value(x, y)
                const newCellDiv = document.createElement('div')
                newCellDiv.className = 'Cell'
                newCellDiv.style.backgroundImage = "PLACEHOLDER URL"
                newRow.appendChild(newCellDiv)
                const newCellObject = new Cell(x, y)
                this.cells.push(newCellObject)

                newCellDiv.addEventListener('click', () => {
                    console.log(`click @ ${newCellObject.get_pos_x}, ${newCellObject.get_pos_y}`)
                })
            }
        }
    }
    get_cell_value(x, y) {
        console.log(x, y)
        console.log(this.GameBoardArray)
        const selected_cell = this.GameBoardArray.find((cell) => cell.x === x && cell.y === y)
        return selected_cell.color
    }
}

class Grid {
    constructor (cells = []) {

        this.cells = cells
    }

}

class Cell {
    constructor(get_pos_x, get_pos_y, player_id) {

        this.get_pos_x = get_pos_x
        this.get_pos_y = get_pos_y
        this.player_id = player_id
    }
}