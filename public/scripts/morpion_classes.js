export default class Grid {
    constructor (cells = []) {

        this.cells = cells
    }

    render_grid(pos_x, pos_y) {
    const gameboard = document.getElementById('gameboard')
    for (let x = 0; x < pos_x; x++) {
        const newRow = document.createElement('div')
        newRow.className = "gameboard_x"
        gameboard.appendChild(newRow)
        for (let y = 0; y < pos_y; y ++) {
            const newCellDiv = document.createElement('div')
            newCellDiv.className = 'Cell'
            newRow.appendChild(newCellDiv)
            const newCellObject = new Cell(x, y)
            this.cells.push(newCellObject)

            newCellDiv.addEventListener('click', () => {
                console.log(`click @ ${newCellObject.get_pos_x}, ${newCellObject.get_pos_y}`)
            })
        }
    }
}}

class Cell {
    constructor(get_pos_x, get_pos_y, player_id) {

        this.get_pos_x = get_pos_x
        this.get_pos_y = get_pos_y
        this.player_id = player_id
    }
}