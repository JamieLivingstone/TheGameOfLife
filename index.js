const c = document.getElementById('c');
const canvas = c.getContext('2d');

// Set canvas size
c.width = window.innerWidth;
c.height = window.innerHeight;

// Set canvas colors
canvas.strokeStyle = "#3dff18";
canvas.fillStyle = "#0068ff";

// Create multidimensional array (n x n)
function createBoard(size) {
    let game = Array.from(new Array(size).keys()).map(items => 0);
    return game.map(arr => [...game]);
}

// Add default coordinates of live cells in xy positions
function defaultPoints(board) {
    const updateBoard = board.slice(0);
    [
        [60, 47], [61, 47], [62, 47], [60, 48], [61, 48], [62, 48], [60, 49], [61, 49], [62, 49], [60, 51], [61, 51], [62, 51], [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7], [12, 4], [12, 8], [13, 3], [13, 9], [14, 3], [14, 9], [15, 6], [16, 4], [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], [21, 3], [21, 4], [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6], [25, 1], [25, 2], [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4],
    ].forEach(plot => updateBoard[plot[0]][plot[1]] = 1);

    return updateBoard;
}

// Return live neighbours count
function liveNeighboursCount(x, y, board) {
    let count = 0;
    const isCellAlive = ((x, y) => board[x] && board[x][y]);

    if (isCellAlive(x - 1, y - 1)) count += 1;
    if (isCellAlive(x, y - 1)) count += 1;
    if (isCellAlive(x + 1, y - 1)) count += 1;
    if (isCellAlive(x - 1, y)) count += 1;
    if (isCellAlive(x + 1, y)) count += 1;
    if (isCellAlive(x - 1, y + 1)) count += 1;
    if (isCellAlive(x, y + 1)) count += 1;
    if (isCellAlive(x + 1, y + 1)) count += 1;

    return count;
}

// Game logic
function updateBoard(board) {
    let result = [];

    board.forEach((row, x) => {
        result[x] = [];

        row.forEach((cell, y) => {
            const neighboursCount = liveNeighboursCount(x, y, board.slice(0));
            let cellValue = 0;

            if (cell) {
                cellValue = neighboursCount === 2 || neighboursCount === 3 ? 1 : 0;
            } else {
                cellValue = neighboursCount === 3 ? 1 : 0;
            }

            result[x][y] = cellValue;
        })
    });

    draw(result);
}

// Draw cells to canvas
function draw(board) {
    canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
    board.forEach((row, x) => row.forEach((cell, y) => {
        canvas.beginPath();
        canvas.rect(x * 8, y * 8, 8, 8);

        if (cell) {
            canvas.fill();
        } else {
            canvas.stroke();
        }
    }));

    // Update game to represent life
    window.setTimeout(() => updateBoard(board), 80);
}

// Start the game on a 64 x 64 board
draw(defaultPoints(createBoard(64)));