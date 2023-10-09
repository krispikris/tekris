import './Tetris.css';
import Board from '../components/Board';
import GameStats from '../components/GameStats';
import {useBoard} from '../hooks/useBoard';
import {useGameStats} from '../hooks/useGameStats';

const Tetris = ({rows, columns, setGameOver}) => {
    const [gameStats, addLinesCleared] = useGameStats();
    const [board, setBoard] = useBoard({rows, columns});
    
    return (
        <div className='Tetris'>
            <Board board={board}/>
            <GameStats gameStats={gameStats} />
        </div>
    );
};

export default Tetris;