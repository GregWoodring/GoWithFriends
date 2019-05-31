import React, { Component } from 'react';

export default class PlayerInfo extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <div className="playerInfoWrapper">
                <div className="userInfoSidebar">
                    <div className="playerInfoHeader"></div>
                </div>
                <div className="userInfoInput">
                    <div className="playerInfoHeader">
                        <h2>Player Info</h2>
                    </div>
                    <div className="playerInfoBody">
                        <div className="playerScoreCard">
                            <div className="playerScoreCardHeader">
                                <h3>Black</h3>
                            </div>
                            <div className="playerInfoIcon">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrujGCbLhGM5ArEOARP_VMgCIverdQVprmRMoLGW5WU0yaB7oI" alt="user" />
                                <h4>{this.props.blackUser ? this.props.blackUser.userName : 'N/A'}</h4>
                            </div>
                            <div className="playerScoreCardBody">
                                <div>
                                    <h4>Game Time:</h4>
                                    <p>0:00</p>
                                </div>
                                <div>
                                    <h4>Score:</h4>
                                    <p>0</p>
                                </div>
                            </div>
                        </div>
                        <div className="playerScoreCard">
                            <div className="playerScoreCardHeader">
                                <h3>White</h3>
                            </div>
                            <div className="playerInfoIcon">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrujGCbLhGM5ArEOARP_VMgCIverdQVprmRMoLGW5WU0yaB7oI" alt="user" />
                                <h4>{this.props.whiteUser ? this.props.whiteUser.userName : 'N/A'}</h4>
                            </div>
                            <div className="playerScoreCardBody">
                                <div>
                                    <h4>Game Time:</h4>
                                    <p>0:00</p>
                                </div>
                                <div>
                                    <h4>Score:</h4>
                                    <p>0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}