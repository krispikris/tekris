import './Menu.css';

const Menu = ({onClick}) =>
    <div className='Menu'>
        <button className='Button' onClick={onClick}>
            {/* Play Te[k]ris */}
            Play TeKris
        </button>
    </div>

export default Menu;