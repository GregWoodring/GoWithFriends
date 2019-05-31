import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default function SideBar(props){
    return(
        <aside className="sideBar">
            <Link 
                to='/game'
                className="links">Game</Link>
            <Link 
                to='/'
                className='links'>Lobby</Link>
            <button className='links'>Go Rules</button>
        </aside>
    )
}