import React from 'react'

import SideBar from '../Sidebar'
import LobbyBody from '../LobbyBody'
import Header from '../Header'

export default function LobbyView(props){
    return(
        <div>
            <Header />
            <div>
                <SideBar />
                <LobbyBody />
            </div>
        </div>
    )
}