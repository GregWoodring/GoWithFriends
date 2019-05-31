import React from 'react'

import SideBar from '../Sidebar'
import GameBody from '../game/GameBody'
import Header from '../Header'

export default function GameView(props){
    return(
        <div>
            <Header />
            <div>
                <SideBar />
                <GameBody />
            </div>
        </div>
    )
}