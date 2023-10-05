import './styles.css';
import Game from '/src/components/Game';

export default function App() {
    return (
        <div className='App'>
            <Game rows={20} columns={10} />
            <h1>Hello Tekris</h1>
            <h2>Start Editing to see some magic happen!</h2>
        </div>
    )
};