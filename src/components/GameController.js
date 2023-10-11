import './GameController.css';
import { Action, actionForKey, actionIsDrop } from '../utils/Input';
import { playerController } from '../utils/PlayerController';
import { useInterval } from '../hooks/useInterval';
import { useDropTime } from '../hooks/useDropTime';

const GameController = ({
    board, 
    gameStats, 
    player, 
    setGameOver, 
    setPlayer
}) => {
    // setting up drop time
    const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
        gameStats
    });

    useInterval(() => {
        handleInput( {action: Action.SlowDrop} );
    }, dropTime);

    const onKeyUp = ({code}) => {
        const action = actionForKey(code);
        if (actionIsDrop(action)) resumeDropTime();        
        // if (action === Action.Quit) setGameOver(true);
    }

    const onKeyDown = ({code}) => {
        const action = actionForKey(code);

        if (action === Action.Pause) {
            if (dropTime) {
                pauseDropTime();
            } else {
                resumeDropTime();
            }
        } else if (action === Action.Quit) {
            setGameOver(true);
        } else {
            if (actionIsDrop(action)) pauseDropTime();
            handleInput({action});
        }
    };

    const handleInput = ({action}) => {
        playerController({
            action,
            board,
            player,
            gameStats,
            setPlayer,
            setGameOver
        })
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
