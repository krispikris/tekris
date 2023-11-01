import './Menu.css';

const Menu = ({onClick}) =>
    <div className='Menu'>
        <button className='Button' onClick={onClick}>
            {/* Play Te[k]ris! */}
            PLAY TE[K]RIS!
        </button>
    </div>

export default Menu;