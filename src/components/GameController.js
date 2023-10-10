import './GameController.css';
import {Action, actionForKey} from '../utils/Input';

const GameController = ({
    board, 
    gameStats, 
    player, 
    setGameOver, 
    setPlayer
}) => {
    const onKeyUp = ({code}) => {
        const action = actionForKey(code)

        if (action === Action.Quit) setGameOver(true);

        // if (code === 'KeyQ') {
        //     setGameOver(true);
        // }
        // console.log(`onKeyUp: ${code}`)
    }

    const onKeyDown = ({code}) => {
        console.log(`onKeyDown: ${code}`)
    }

    return (
        <input 
            className='GameController'
            type='text'
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            autoFocus
        />
    );
}
        
export default GameController;
