import './GameController.css';
import { Action, actionForKey } from '../utils/Input';
import { playerController } from '../utils/PlayerController';
import { useInterval } from '../hooks/useInterval'

const GameController = ({
    board, 
    gameStats, 
    player, 
    setGameOver, 
    setPlayer
}) => {
    useInterval(() => {
        handleInput( {action: Action.SlowDrop} );
    }, 1000);

    const onKeyUp = ({code}) => {
        const action = actionForKey(code)

        if (action === Action.Quit) setGameOver(true);

        // if (code === 'KeyQ') {
        //     setGameOver(true);
        // }
        // console.log(`onKeyUp: ${code}`)
    }

    const onKeyDown = ({code}) => {
        const action = actionForKey(code);
        handleInput({action});
        // console.log(`onKeyDown: ${code}`)
    }

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
