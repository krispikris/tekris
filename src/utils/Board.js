import { defaultCell } from './Cell';
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

    // adds current tetromino to board taking for account postion, shape, and if it has collided
    rows = transferToBoard({
        className: tetromino.className,
        isOccupied: player.collided,
        position,
        rows,
        shape: tetromino.shape
    });

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