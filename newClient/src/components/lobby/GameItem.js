import React from 'react';
import {withRouter} from 'react-router-dom';

function GameItem(props){

    return(
        <div className="gameItemWrapper">
            <h4>Game Name: {props.gameName}</h4>
                <div>
                    {!props.hasBlack ?
                        <button 
                            style={{
                                padding: '.25em 1.5em'
                            }}
                            className="genBtn"
                            onClick={() => props.joinGame(props.roomId, 'black')}
                            >Join as Black
                        </button> : undefined
                    }
                    {!props.hasWhite ?
                        <button 
                            style={{
                                padding: '.25em 1.5em'
                            }}
                            className="genBtn"
                            onClick={() => props.joinGame(props.roomId, 'white')}
                            >Join as White
                        </button> : undefined
                    }
                    <button 
                        style={{
                            padding: '.25em 1.5em'
                        }}
                        className="genBtn"
                        onClick={() => props.joinGame(props.roomId, 'viewer')}
                        >Join as Viewer
                    </button>
                </div>
                
        </div>
    )
}

export default withRouter(GameItem)