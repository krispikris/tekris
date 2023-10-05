import './Menu.css';

const Menu = ({onClick}) =>
    <div className='Menu'>
        <button className='Button' onClick={onClick}>
            {/* Play Te[k]ris */}
            Play Tekris
        </button>
    </div>

export default Menu;