import React from 'react'
import { Link } from 'react-router-dom'

class NavMenu extends React.Component {
    render() {
        return( 
            <ul className="nav_menu">
                <li><Link to="overlay">Overlay</Link></li>
                <li><Link to="gifBox">GifBox</Link></li>
                <li><Link to="mixBox">MixBox</Link></li>
                <li><Link to="clipbox">ClipBox</Link></li>
                <li><Link to="twitchdata">Twitch Top Vods Search</Link></li>
            </ul>
        )
    }
}

export default NavMenu