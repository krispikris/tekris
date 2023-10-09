import BoardCell from './BoardCell';
import './Board.css';

const Board = ({board}) => {
    // console.log('board', board)

    const boardStyles = {
        gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
        // gridTemplateRows: `repeat(${board.length}, 1fr)`,
        // gridTemplateColumns: `repeat(${board[0].length}, 1fr)`
    };

    return (
        <div className='Board' style={boardStyles}>
            {board.rows.map((row, y) => 
                row.map((cell, x) => (
                    <BoardCell key={x * board.size.columns + x} cell={cell} />
                ))
            )}
            </div>
    );
};

export default Board;