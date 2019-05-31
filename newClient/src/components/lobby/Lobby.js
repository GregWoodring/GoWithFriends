import React, { Component } from 'react'
import uuidvi from 'uuid/v1'
import GameItem from './GameItem'
import GameStartModal from './GameStartModal'


class Lobby extends Component{
    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        }
    }

    componentDidMount(){
        
    }

    createGame = (gameInfo) => {
        this.handleCloseStartModal()
        let roomId = uuidvi();
        let data = {
            roomId,
            gameName: gameInfo.gameName,
            gameTime: gameInfo.gameTime,
            role: gameInfo.role
        }
        console.log('lobby:', data)
        this.props.createGame(data)

    }

    handleOpenStartModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    handleCloseStartModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    renderGames = () => {
        return this.props.games.map(item => {
            return <GameItem 
                key={item.roomId}
                gameName={item.gameName}
                gameTime={item.gameTime}
                roomId={item.roomId}
                joinGame={this.props.joinGame}
                hasBlack={item.hasBlack}
                hasWhite={item.hasWhite}
            />
        })
    }

    render(){
        return(
            <div
                className="lobbyWrapper"
            >
                <GameStartModal
                    isModalOpen={this.state.isModalOpen}
                    handleCloseStartModal={this.handleCloseStartModal}
                    createGame={this.createGame}
                    
                />
                <div className="lobbyHeader">
                    <h2>Lobby</h2>
                </div>
                <div className="lobbyDisplay">
                    {this.renderGames()}
                </div>
                <div className="lobbyFooter">
                    <button
                        className="genBtn"
                        onClick={this.handleOpenStartModal} 
                    >Create Game</button>
                </div>
            </div>
        )
    }

}



export default Lobby