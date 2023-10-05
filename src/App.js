import './styles.css';
import Game from './components/Game';

export default function App() {
    return (
        <div className='App'>
            <Game rows={20} columns={10} />
            {/* <h1>Peace Tekris</h1>
            <h2>Start Editing to see some magic happen!</h2> */}
        </div>
    )
};