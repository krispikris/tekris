import Menu from '../components/Menu';
import {useGameOver} from '../hooks/useGameOver';
import Tetris from '../components/Tetris'

const Game = ({rows, columns}) => {
    // custom hook
    const [gameOver, setGameOver, resetGameOver] = useGameOver();

    const start = () => resetGameOver();

    return (
        <div className='Game'>
            {gameOver ? (
                <Menu onClick={start} />
            ) : (
                <Tetris row={rows} columns={columns} setGameOver={setGameOver} />
            )}
            {/* rows {rows}, columns {columns} */}
        </div>
    ); 
};

export default Game;