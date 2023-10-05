import Menu from '../components/Menu';
import {useGameOver} from '../hooks/useGameOver'

const Game = ({rows, columns}) => {
    // custom hook
    const [gameover, setGameOver, resetGameOver] = useGameOver()

    const start = () => {
        console.log(`Start gameOver is ${gameOver}`)
    };

    return (
        <div className='Game'>
            <Menu onClick={start} />
            {/* rows {rows}, columns {columns} */}
        </div>
    ); 
};

export default Game;