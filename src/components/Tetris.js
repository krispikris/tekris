import './Tetris.css';
import Board from '../components/Board';
import GameStats from '../components/GameStats';
import Previews from '../components/Previews';
import {useBoard} from '../hooks/useBoard';
import {useGameStats} from '../hooks/useGameStats';

const Tetris = ({rows, columns, setGameOver}) => {
    const [gameStats, addLinesCleared] = useGameStats();
    const [board, setBoard] = useBoard({rows, columns});
    const player = {tetrominoes: []};

    return (
        <div className='Tetris'>
            <Board board={board} />
            <GameStats gameStats={gameStats} />
            <Previews tetrominoes={player.tetrominoes} />
        </div>
    );
};

export default Tetris;