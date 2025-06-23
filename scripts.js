const RED_CLASS = 'red'
const YELLOW_CLASS = 'yellow'
cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMessage = document.getElementById('winningMessage')
const winMessageText = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let redTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    redTurn = true
    cellElements.forEach(cell =>  {
        cell.classList.remove(RED_CLASS)
        cell.classList.remove(YELLOW_CLASS)
        cell.addEventListener('click', handleClick)
        cell.addEventListener('mouseover', handleHoverOn)
        cell.addEventListener('mouseout', handleHoverOff)
    })
    setBoardHoverClass()
    winMessage.classList.remove('show')
}

function handleClick(e) {
    const column = Number(e.target.id) % 7
    const curClass = redTurn ? RED_CLASS : YELLOW_CLASS
    if (!cellElements[column].classList.contains(RED_CLASS) & !cellElements[column].classList.contains(YELLOW_CLASS)){
        placeMark(column, curClass)
        if (checkWin(curClass)){
            endGame(false)
        } else if (isDraw()) {
            endGame(true)
        } else {
            swapTurns()
            setBoardHoverClass()
        }
    } else {
        console.log("column is full")
    }
}

function placeMark(col, curClass){
    let row = 5
    while (cellElements[(row * 7) + col].classList.contains(RED_CLASS) 
        || cellElements[(row * 7) + col].classList.contains(YELLOW_CLASS)){
        row = row - 1
    } 
    cellElements[(row * 7) + col].classList.remove('hover')
    cellElements[(row * 7) + col].classList.add(curClass)
}

function swapTurns(){
    redTurn = !redTurn
}

function handleHover(e){
    const col = Number(e.target.id) % 7
    if (!cellElements[col].classList.contains(RED_CLASS) & !cellElements[col].classList.contains(YELLOW_CLASS)){
        let row = 5
        while (cellElements[(row * 7) + col].classList.contains(RED_CLASS) 
            || cellElements[(row * 7) + col].classList.contains(YELLOW_CLASS)){
            row = row - 1
        } 
        return row
    }
}

function handleHoverOn(e){
    const row = handleHover(e)
    if (row) {
        const col = Number(e.target.id) % 7
        cellElements[(row * 7) + col].classList.add('hover')
    } else {
        console.log("column is full")
    }
}

function handleHoverOff(e){
    const row = handleHover(e)
    if (row) {
        const col = Number(e.target.id) % 7
        cellElements[(row * 7) + col].classList.remove('hover')
    } else {
        console.log("column is full")
    }
}

function setBoardHoverClass(){
    board.classList.remove(RED_CLASS)
    board.classList.remove(YELLOW_CLASS)
    if (redTurn){
        board.classList.add(RED_CLASS)
    } else {
        board.classList.add(YELLOW_CLASS)
    }
}

function checkWin(curClass){
    for (let row = 0; row < 6; row++){
        let count = 0
        for (let col = 0; col < 7; col++){
            if (cellElements[(row * 7) + col].classList.contains(curClass)) {
                count = count + 1
                if (count == 4) {
                    return true
                }
            } else {
                count = 0
            }
        }
    }

    for (let col = 0; col < 7; col++){
        let count = 0
        for (let row = 0; row < 6; row++){
            if (cellElements[(row * 7) + col].classList.contains(curClass)) {
                count = count + 1
                if (count == 4) {
                    return true
                }
            } else {
                count = 0
            }
        }
    }


    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 4; col++){
            count = 0
            for (let idx = 0; idx < 4; idx++){
                if (cellElements[((row + idx) * 7) + (col + idx)].classList.contains(curClass) ) {
                    count = count + 1
                    if (count == 4) {
                        return true
                    }
                }
            }
        }
    }

    for (let row = 0; row < 3; row++){
        for (let col = 7; col > 3; col--){
            count = 0
            for (let idx = 0; idx < 4; idx++){
                if (cellElements[((row + idx) * 7) + (col - idx)].classList.contains(curClass) ) {
                    count = count + 1
                    if (count == 4) {
                        return true
                    }
                }
            }
        }
    }

    return false
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(RED_CLASS) || cell.classList.contains(YELLOW_CLASS)
    })
}

function endGame(draw){
    if (draw) {
        winMessageText.innerText = "Draw"
        winMessage.classList.add('show')
    } else {
        const curClass = redTurn ? "Red" : "Yellow"
        winMessageText.innerText = curClass + " Wins!"
        winMessage.classList.add('show')
    }
}