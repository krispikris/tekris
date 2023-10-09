import Menu from '../components/Menu';
import {useGameOver} from '../hooks/useGameOver';
import Tetris from '../components/Tetris'

const Game = ({rows, columns}) => {
    // custom hook
    const [gameOver, setGameOver, resetGameOver] = useGameOver();

    const start = () => {
        resetGameOver();
        // console.log('THIS IS ROWS: ', rows)
        // console.log('THIS IS COLUMNS: ', columns)
    }

    return (
        <div className='Game'>
            {gameOver ? (
                <Menu onClick={start} />
            ) : (
                <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
            )}
            {/* rows {rows}, columns {columns} */}
        </div>
    ); 
};

export default Game;