import React, { Component } from 'react';
import Modal from 'react-modal';


const modalStyles={
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1em'
      }
}

// Modal.setAppElement();

export default class GameStartModal extends Component{
    constructor(props){
        super(props);

        this.state = {
            gameName: '',
            gameTime: 'standard',
            role: 'black'
        }
    }

    changeGameTime = e => {
        this.setState({
            gameTime: e.target.value
        })
    }

    changeGameRole = e => {
        console.log('role Change', e.target.value)
        this.setState({
            role: e.target.value
        })
    }

    render(){
        return(
            <Modal 
                isOpen={this.props.isModalOpen}
                onRequestClose={this.props.handleCloseStartModal}
                style={modalStyles}
            >
                <div
                    className="gameModalHeader"
                >
                    <h1>
                        Start Game
                    </h1>
                </div>
                <div className="gameModalBodyItem gameName">
                    <h4>Game Name:</h4>
                    <input 
                        type='text' 
                        placeholder='Game Name'
                        onChange={e => this.setState({gameName: e.target.value})}
                    />
                </div>
                <div className="gameModalBodyItem">
                    <h4>Game Time:</h4>
                    <table className="timeTable">
                        <tbody>
                            <tr>
                                <td>
                                    Standard Game:
                                </td>
                                <td>
                                    <input 
                                        type="radio"
                                        name="gameTime"
                                        id="rbStandardGameTime"
                                        defaultChecked
                                        value="standard"
                                        onClick={this.changeGameTime}
                                    />
                                    <label>30min/30sec</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Blitz Game:
                                </td>
                                <td>
                                    <input 
                                        type="radio"
                                        name="gameTime"
                                        id="rbBlitzGameTime"
                                        onClick={this.changeGameTime}
                                        value="blitz"
                                    />
                                    <label
                                        for="rbBlitzGameTime"
                                    >60sec rounds</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Long Game:
                                </td>
                                <td>
                                    <input 
                                        type="radio"
                                        name="gameTime"
                                        id="rbLongGameTime"
                                        onClick={this.changeGameTime}
                                        value="long"
                                    />
                                    <label
                                        for="rbLongGameTime"
                                    >No Time Limit</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="gameModalBodyItem">
                    <h4>Game Role:</h4>
                    <table className="timeTable">
                        <tbody>
                            <tr>
                                <td>
                                    Black:
                                </td>
                                <td>
                                    <input 
                                        type="radio"
                                        name="gameRole"
                                        id="gameRoleBlack"
                                        value="black"
                                        defaultChecked
                                        onChange={this.changeGameRole}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    White:
                                </td>
                                <td>
                                    <input 
                                        type="radio"
                                        name="gameRole"
                                        id="gameRoleWhite"
                                        value="white"
                                        onChange={this.changeGameRole}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Viewer:
                                </td>
                                <td>
                                    <input 
                                        type="radio"
                                        name="gameRole"
                                        id="gameRoleViewer"
                                        value="viewer"
                                        onChange={this.changeGameRole}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="gameModalFooter">
                    <button
                        className="genBtn"
                        onClick={() => this.props.handleCloseStartModal()}
                    >
                        Cancel
                    </button>
                    <button
                        className="genBtn"
                        onClick={() => this.props.createGame(this.state)}
                    >
                        Start Game
                    </button>
                </div>
            </Modal>
        )
    }
}


