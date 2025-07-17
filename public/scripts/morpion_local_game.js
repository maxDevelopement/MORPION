export default class Player{
    constructor(id, isMyTurn) {
        this.id = id
        this.isMyTurn = isMyTurn
    }
    
    
    start_local_game() {
        
        let turn_num = 1
        console.log('starting local game...')

        if (turn_num == 1) {
            document.getElementById("play_move");
                addEventListener('click', () => {
                    turn_num ++;
                })
            }
        }
    }
