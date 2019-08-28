// Instantiate board
const board = new Board()

document.getElementById('board').addEventListener('click', function (e) {
    e.stopPropagation()

    const row = e.target.parentElement.getAttribute('data-row')
    const col = e.target.getAttribute('data-col')
    const isValidMove = board.setMove(board.currentPlayer, row, col)
    if (isValidMove) {
        board.render()
        if (board.hasWinningMove(board.currentPlayer)) {
            alert(`Player ${board.currentPlayer} won!`)
            return
        } else if (board.totalTurns > 8) {
            alert('No one won this time :(')
        }
        board.toggleTurn()
    } else {
        alert('Can’t overwrite that spot')
    }
})

function toggleTheme() {
    const nextTheme = document.body.getAttribute('data-theme') === 'light'
        ? 'dark'
        : 'light'
    document.body.setAttribute('data-theme', nextTheme)
}