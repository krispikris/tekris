import { isWithinBoard, hasCollision } from './Board';
import { rotate } from './Tetrominoes';
import { Action } from './Input';

// func takes in board, player, and setPlayer properties
// direction is either 1 or -1 || 1 = clockwise, -1 = counterclockwise
const attemptRotation = ({board, player, setPlayer}) => {
    const shape = rotate({
        piece: player.tetromino.shape,
        direction: 1
    });

    const position = player.position;

    // checks if the tetromino is within the board and doesn't collide with another tetromino
    const isValidRotation =
        isWithinBoard({board, position, shape}) &&
        !hasCollision({board, position, shape});

    if (isValidRotation) {
        // if it was a valid rotation, we set the player to values to what was previously
        // on the player object, and then we set the shape to the new shape
        setPlayer({
            ...player,
            tetromino: {
                ...player.tetromino,
                shape
            }
        });
    } else {
        return false;
    }
}

// func takes in delta, position, shape, and board properties
// will handle player movement (left, right, down, fast dropping)
// delta is an object with row and column properties 
export const movePlayer = ({delta, position, shape, board}) => {
    const desiredNextPosition = {
        row: position.row + delta.row,
        column: position.column + delta.column
    };

    const collided = hasCollision({
        board,
        position: desiredNextPosition,
        shape
    });

    const isOnBoard = isWithinBoard({
        board,
        position: desiredNextPosition,
        shape
    });

    const preventMove = !isOnBoard || (isOnBoard && collided);              // making sure tetromino doesn't move off the board
    const nextPosition = preventMove ? position : desiredNextPosition;

    const isMovingDown = delta.row > 0;                                     // if delta row > 0, we're moving down
    const isHit = isMovingDown && (collided || !isOnBoard);                 // if we're moving down and we've collided or we're not on the board, we've hit something

    return { collided: isHit, nextPosition };                               // returns info on whether a move was successful and the next position
};    

// func takes in board, action, player, setPlayer, and setGameOver properties
// func processes player actions, like moving left, right, or dropping the piece quickly
const attemptMovement = ({
    board, 
    action, 
    player, 
    setPlayer, 
    setGameOver
}) => {
    // how much is someone trying to move the piece
    const delta = {row: 0, column: 0};
    let isFastDropping = false; 

    if (action === Action.FastDrop) {
        isFastDropping = true;
    } else if (action === Action.SlowDrop) {
        delta.row += 1
    } else if (action === Action.Left) {
        delta.column -= 1;
    } else if (action === Action.Right) {
        delta.column += 1;
    }

    // uses movePlayer to determine if the move is valid and wheter the game is over
    const {collided, nextPosition} = movePlayer({
        delta,
        position: player.position,
        shape: player.tetromino.shape,
        board
    });

    // did we collide immediately? if so, game over
    const isGameOver = collided && player.position.row === 0;
    if (isGameOver) {
        setGameOver(isGameOver);
    }

    // if we didn't collide, we update the player's position
    // updates the player's state with the new position and whether a collision occurred
    setPlayer({
        ...player,
        collided,
        isFastDropping,
        position: nextPosition
    });
};

// func takes in action, board, player, setPlayer, and setGameOver properties
// initial check to see if there was any action at all
export const playerController = ({
    // start rotating pieces
    action, 
    board,
    player,
    setPlayer,
    setGameOver
}) => {
    if (!action) return;

    if (action == Action.Rotate) {                                          // If the action is equal to Action.Rotate, it means the player wants to rotate a piece. 
        attemptRotation({board, player, setPlayer});                        // In this case, it calls the attemptRotation function, passing in the board, player, and setPlayer as parameters. This function is responsible for attempting to rotate the tetromino
    } else {
        attemptMovement({action, board, player, setPlayer, setGameOver});   // movement action (left, right, down, or fast drop). In this case, it calls the attemptMovement function, providing it with the action, board, player, setPlayer, and setGameOver as parameters
    }
}