const sign = player => ({
    1: '✕',
    2: '○'
})[player]

class Board {
    constructor() {
        this.init()
    }

    init() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
        this.currentPlayer = 1
        this.totalTurns = 0
    }

    reset() {
        this.init()
        this.render()
    }

    hasWinningMove(player) {
        // Check for horizontal and vertical wins
        for (let i = 0; i < 3; i++) {
            if (this.isWinningRow(player, i) || this.isWinningColumn(player, i)) {
                return true
            }
        }

        // Check for diagonal wins
        return this.isWinningDiagonal(player)
    }

    isWinningRow(player, row) {
        let totalInRow = 0
        for (let col = 0; col < 3; col++) {
            if (this.board[row][col] === player) {
                totalInRow++
            }
        }

        return totalInRow === 3
    }

    isWinningColumn(player, col) {
        let totalInRow = 0
        for (let row = 0; row < 3; row++) {
            if (this.board[row][col] === player) {
                totalInRow++
            }
        }

        return totalInRow === 3
    }

    isWinningDiagonal(player) {
        let totalInRow = 0
        // Check descending diagonal
        for (let i = 0; i < 3; i++) {
            if (this.board[i][i] === player) {
                totalInRow++
            }
        }
        if (totalInRow === 3) {
            return true
        }
        // Check ascending diagonal
        totalInRow = 0
        for (let i = 0; i < 3; i++) {
            if (this.board[2 - i][i] === player) {
                totalInRow++
            }
        }
        if (totalInRow === 3) {
            return true
        }

        return false
    }

    setMove(player, row, col) {
        if (!this.isValidSpot(row, col)) {
            return false
        }

        this.board[row][col] = player
        this.totalTurns++
        return true
    }

    isValidSpot(row, col) {
        return this.board[row][col] === null
    }

    render() {
        // Update board
        let updatedBoardHtml = ''
        for (let row = 0; row < 3; row++) {
            updatedBoardHtml += `<tr data-row="${row}">`
            for (let col = 0; col < 3; col++) {
                updatedBoardHtml += `<td data-col="${col}">${sign(this.board[row][col]) || ''}</td>`
            }
            updatedBoardHtml += `</tr>`
        }

        document.getElementById('board').innerHTML = updatedBoardHtml
    }

    toggleTurn() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
        // Return new current player
        return this.currentPlayer
    }
}