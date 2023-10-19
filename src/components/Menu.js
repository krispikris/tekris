import './Menu.css';

const Menu = ({onClick}) =>
    <div className='Menu'>
        <button className='Button' onClick={onClick}>
            {/* Play Te[k]ris */}
            PLAY TEKRIS!
        </button>
    </div>

export default Menu;