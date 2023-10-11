import { defaultCell } from './Cell';
import { movePlayer } from './PlayerController';
import { transferToBoard } from './Tetrominoes';

// func takes an object with rows and columns properties as input
// creates game board by generating 2 dimensional array of cells
// returns object with rows and size properties
export const buildBoard = ({rows, columns}) => {
    const builtRows = Array.from({length: rows}, () => 
        Array.from({length: columns}, () => ({ ...defaultCell }))
        );
    
    return {
        rows: builtRows,
        size: {rows, columns}
    };
};

const findDropPosition = ({board, position, shape}) => {
    let max = board.size.rows - position.row + 1;
    let row = 0;

    for (let i = 0; i < max; i++) {
        const delta = {row: i, column: 0};
        const result = movePlayer({ delta, position, shape, board });
        const { collided } = result;

        if (collided) break;

        row = position.row + i;
    }

    return { ...position, row };
};

// func takes board, player, resetPlayer, and addLinesCleared as input
// calculates next board state based on player's current state
export const nextBoard = ({board, player, resetPlayer, addLinesCleared}) => {
    // extracts tetromino and position from player object
    const {tetromino, position} = player;

    // Copy and clear spaces used by pieces that
    // haven't collided and occupied spaces permanently
    let rows = board.rows.map((row) => 
        row.map((cell) => (cell.occupied ? cell: { ...defaultCell }))
    );

    // drop position
    const dropPosition = findDropPosition({
        board,
        position,
        shape: tetromino.shape
    });

    // placing ghost on board
    const className = `${tetromino.className} ${
        player.isFastDropping ? '' : 'ghost'
    }`

    rows = transferToBoard({
        className,
        isOccupied: player.isFastDropping,
        position: dropPosition,
        rows,
        shape: tetromino.shape
    });

    // placing the tetromino piece
    // if collided, mark board cells as collided
    if (!player.isFastDropping) {
        rows = transferToBoard({
            className: tetromino.className,
            isOccupied: player.collided,
            position,
            rows,
            shape: tetromino.shape
        });
    };

    // adds current tetromino to board taking for account poistion, shape, and if it has collided
    rows = transferToBoard({
        className: tetromino.className,
        isOccupied: player.collided,
        position,
        rows,
        shape: tetromino.shape
    });

    // check for cleared lines
    const blankRow = rows[0].map((_) => ({ ...defaultCell }));
    let linesCleared = 0;

    rows = rows.reduce((acc, row) => {
        if (row.every((column) => column.occupied)) {
            linesCleared += 1;
            acc.unshift([...blankRow])
        } else acc.push(row);

        return acc;
    }, [])

    if (linesCleared > 0) addLinesCleared(linesCleared);

    // if we colided, reset the player
    if (player.collided || player.isFastDropping) resetPlayer();

    // return the next board
    return {
        rows, 
        size: {...board.size}
    }
};

// func takes board, postion, and shape properties as input
// checks if piece has collided with another piece
export const hasCollision = ({board, position, shape}) => {
    for (let y = 0; y < shape.length; y++) {
        const row = y + position.row;

        // nested loops to iterate through the cells of the tetromino's shape, 
        // which is represented as a 2D array
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const column = x + position.column;

                // if the cell is occupied by another tetromino, return true
                if (
                    board.rows[row] &&
                    board.rows[row][column] &&
                    board.rows[row][column].occupied
                    ) {
                        return true;
                    }
            }
        }
    }

    // if no collision detected, return false
    return false;
};

// func takes board, position, and shape properties as input
// checks if piece is within the board's boundaries
export const isWithinBoard = ({board, position, shape}) => {
    for (let y = 0; y < shape.length; y++) {
        const row = y + position.row;

        // checks if that position is within the boundaries of the game board
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const column = x + position.column;
                const isValidPosition = board.rows[row] && board.rows[row][column];

                // if any part of the tetromino shape is outside the board, the function returns false
                if (!isValidPosition) return false;
            }
        }
    }

    // if all tetromino parts are within the board, the function returns true
    return true;
};