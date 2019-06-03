import React, { Component } from 'react';
import Board from './board/Board'
import Chat from '../chat/Chat'
import PlayerInfo from './playerInfo/PlayerInfo'

import io from 'socket.io-client';
import {withRouter} from 'react-router-dom';




class GameBody extends Component{
    constructor(props){
        super(props);

        this.state = {
            history: [[
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ]],
            positions: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ],
            blacksTurn: true,
            turnNumber: 0,
            blackScore: 0,
            whiteScore: 7.5,
            whitePass: false,
            blackPass: false,
            gameEnd: false,
            whiteKo: [],
            blackKo: [],
            socket: {},
            blackTimeDisplay: 'N/A',
            whiteTimeDisplay: 'N/A',

            timestamp: 0,
            blackUser: null,
            whiteUser: null,
            viewers: [],
            roomId: '',
            gameName: '',
            gameTime: '',
            userCount: 0,
            users: [],
            user: {},

            messages: []
        }

        
    }

    componentWillMount(){
        //upon loading game body connect to game namespace
        //need to redo how I'm doing this connection likely wss://obscure-thicket-97287.herokuapp.com/${process.env.PORT || 3001}
        let socket = io.connect(`localhost:3001/game`,{ 
            reconnect: true,
            transports: ['websocket']

        });
        //upon recieving connection inialize events
        socket.on('connectedToGame', () => {
            let room = this.props.match.params.roomId
            console.log('starting Game');
            socket.emit('joinRoom', room);

            //This event will maintain the state of our
            //game, I will be moving all the logic for the game
            //server-side, but will still keep all the data stored 
            //in the client for redundancy (I believe)
            socket.on('updateRoomInfo', data => {
                let {
                    blackUser,
                    whiteUser,
                    viewers,
                    roomId,
                    gameName,
                    gameTime,
                    userCount,
                    timestamp,
                    history,
                    positions,
                    blacksTurn,
                    turnNumber,
                    blackScore,
                    whiteScore,
                    whitePass,
                    blackPass,
                    gameEnd,
                    whiteKo,
                    blackKo,
                    users,
                    blackTimeDisplay,
                    whiteTimeDisplay,
                    messages
                } = data;
                this.setState({
                    blackUser,
                    whiteUser,
                    viewers,
                    roomId,
                    gameName,
                    gameTime,
                    userCount,
                    timestamp,
                    history,
                    positions,
                    blacksTurn,
                    turnNumber,
                    blackScore,
                    whiteScore,
                    whitePass,
                    blackPass,
                    gameEnd,
                    whiteKo,
                    blackKo,
                    users,
                    blackTimeDisplay,
                    whiteTimeDisplay,
                    messages,
                    user: users.find(item => item.userId = this.props.userId)
                })

            })

            socket.on('checkRoomUpdates', timestamp => {
                if(this.state.timestamp !== timestamp){
                    socket.emit('getRoomUpdates', this.state.roomId);
                }

                //using this to track disconnected players
                socket.emit('inSync', this.props.userId, this.state.roomId);
            })

            this.setState({
                socket
            })
        });
    }

    handleGameEnd = () => {

        this.setState({
            gameEnd: true
        })
    }

    handlePass = () => {
        this.state.socket.emit('handlePass', {
            roomId: this.state.roomId,
            userId: this.props.userId
        })
    }
    // handlePass = () => {

    //     //check End of Game
    //     if((this.state.blacksTurn && this.state.whitePass) || (!this.state.blacksTurn && this.state.blackPass)){
    //         this.handleGameEnd();
    //         return;
    //     }

    //     //this code is similar to handle play, except there is no piece spliced in so no need to check for captures
    //     let positions = [...this.state.positions.map(item => [...item])]
    //     let history = [...this.state.history.map(item => [...item.map(item => [...item])])]
    //     history.push(positions);
    //     this.setState({
    //         whitePass: !this.state.blacksTurn,
    //         blackPass: this.state.blacksTurn,
    //         turnNumber: this.state.turnNumber + 1,
    //         blacksTurn: !this.state.blacksTurn,
    //         positions,
    //         history
    //     })
    // }

    //This function is used to check if an X and Y position are equal to annother, I store
    //these as nested arrays which .includes() does not support
    checkIncludes = (checkArr, compareArr) => {
        for(let i = 0; i < checkArr.length; i++){
            let item = checkArr[i];

            if(item[0] === compareArr[0] && item[1] === compareArr[1]){
                return true;
            }
        }
        return false;
    }

    //This function will recursively check if stones are captured
    //In go stones that are touching share liberties, which means that for a stone to be captured
    //every position next to it must be filled by an opponent's piece, OR it can be completely surrounded
    //by opposing pieces and a friendly piece that is also completely surrounded.
    checkCapture = (posX, posY, captureArr, val, positions) =>{
        //first check if the position that was passed is empty
        //TODO: Add proper error handling into this app
        if(val === 0){
            console.log(`This shouldnt happen: X: ${posX} Y: ${posY}`);
            return undefined;
        }
        //push the current X and Y coordinates into the captureArr
        //this is used to check if a stone has been checked already,
        //which prevents infinite loops, we ask for it to be passed in
        //so that if capture is true every captured stone can be removed
        //by handleCapture below
        let toPush = [posX, posY]
        captureArr.push(toPush);

        //Check every direction next to the current position (up, down, left, right)
        //First check if the position has already been checked
        if(!this.checkIncludes(captureArr, [posX, posY + 1])){
            //Then check that the position is not off of the board
            if(posY < positions.length - 1){
                //then check if the position is empty, if it is the stones are not captured and we return false
                if(positions[posY + 1][posX] === 0){
                    return false;
                    //else, if the position contains a friendly stone check if that stone is captured
                } else if( positions[posY + 1][posX] === val){
                    //if that stone finds and empty space the entire group is not captured, return false
                    if(!this.checkCapture(posX, posY + 1, captureArr, val, positions)){
                        return false;
                    }
                }
            } 
        }
        if(!this.checkIncludes(captureArr, [posX, posY - 1])){
            if(posY > 0){
                if(positions[posY - 1][posX] === 0){
                    return false;
                } else if( positions[posY - 1][posX] === val){
                    if(!this.checkCapture(posX, posY - 1, captureArr, val, positions)){
                        return false;
                    }
                } 
            }
        }
        if(!this.checkIncludes(captureArr, [posX + 1, posY ])){
            if(posX < positions[0].length - 1){
                if(positions[posY][posX + 1] === 0){
                    return false;
                } else if( positions[posY][posX + 1] === val){
                    if(!this.checkCapture(posX + 1, posY, captureArr, val, positions)){
                        return false;
                    }
                } 
            }
        }
        if(!this.checkIncludes(captureArr, [posX - 1, posY])){
            if(posX > 0){
                if(positions[posY][posX - 1] === 0){
                    return false;
                } else if( positions[posY][posX - 1] === val){
                    if(!this.checkCapture(posX - 1, posY, captureArr, val, positions)){
                        return false;
                    }
                } 
            }
        }
        //if we have not returned false by this point the stones are captured, return true
        return true;

    } 

    //This function will call the recursive checkCapture function to check if a given position is captured, if it is
    //it will then 'capture' those pieces by setting their position in the matrix to 0 and adds the count to the appropriate 
    //player's score
    handleCapture = (posX, posY, positions, piece) => {
        //start by initializing an emptry array to keep track of captured stones
        //must be scoped to this function so that it can be looped through later
        let captureArr = [];
        //check to make sure that the position which was passed is not out of bounds
        if(posX < 0
            || posX > positions[0].length -1
            || posY < 0
            || posY > positions.length - 1){
            return;
        }
        //get the value of the current piece
        let val = positions[posY][posX];
        //if the value is 0 (empty) or equal to the current player's piece return
        //you cannot capture your own pieces
        if(val === piece || val === 0){
            return;
        }
        //Call the recursive check capture function, it will return true if the given piece is captured
        if(this.checkCapture(posX, posY, captureArr, val, positions)){
            //initialize count at 0 to keep track of the amount of captured stones
            let count = 0;
            //loop through the array we passed into checkCapture, the checkCapture function will fill this
            //array with every stone connected to the stone we passed into it
            //if checkCapture returns true, that means every piece in this array was captured
            captureArr.forEach((item) => {
                    let [posX, posY] = item;
                    positions[posY].splice(posX, 1, 0);
                    count++;
            })
            //create Ko, it is stored as null in state if there is no ko so we must set this to an empty array if
            //empty or to a copy of the appropriate ko tracker from state. If it is white's turn then we are tracking
            //black's ko, and vice versa
            let ko;
            if(!this.state.blacksTurn){ 
                ko = this.state.blackKo ? [...this.state.blackKo] : [];
            } else {
                ko = this.state.whiteKo ? [...this.state.whiteKo] : [];
            }

            //The rule of ko only applies if only 1 stone was captured
            if(captureArr.length === 1){
                
                ko.push([posX, posY])
            } 
            //update state with the score change, updated ko tracker, and positions
            if(this.state.blacksTurn){
                this.setState(state => ({
                    positions,
                    blackScore: this.state.blackScore + count,
                    whiteKo: ko
                }))
            } else{
                this.setState(state => ({
                    positions,
                    whiteScore: this.state.whiteScore + count,
                    blackKo: ko
                }))
            }
            
        } 
        

    }

    /*Several things must be done everytime a play is made
    - Check that position is empty and that the game has not ended
    - Check that players are not attempting to play in a space restricted by the rule of Ko
    - Make a copy of history that ends at the current turn -- not keeping track of alternate histories
    - Make a copy of positions, useful if move ends up not being valid later
    - Based on what turn it is the current play was either black(1) or white(2)
    - In copy splice in the new piece
    - Check if placing piece caused any pieces to be captured
        - Only pieces adjacent to the placed piece can be captured, so check all 4 directions
          which recursively checks if it's captured.
    - Check if move would capture itself, if it would return because the move isn't valid
    - Push modified positions into copy of history
    - In state: alternate the turn, increase the turn number, update positions and history
    */
    
    handlePlay = (e, posX, posY) => {
        console.log('play')
        this.state.socket.emit('handlePlay', {
            userId: this.props.userId,
            roomId: this.state.roomId,
            posX,
            posY
        })
    }

    // handlePlay = async (e, posX, posY) => {
    //     // Check that position is empty and that the game has not ended
    //     if(this.state.positions[posY][posX] === 0 && !this.state.gameEnd){
    //         //Check that players are not attempting to play in a space restricted by the rule of Ko
    //         if((this.state.blacksTurn && this.state.blackKo && this.checkIncludes(this.state.blackKo, [posX, posY]))
    //         || (!this.state.blacksTurn && this.state.whiteKo && this.checkIncludes(this.state.whiteKo, [posX, posY]))){
    //             return;
    //         }
    //         //Rule of Ko only persists for one turn, so set both Ko trackers to null
    //         this.setState({
    //             blackKo: null,
    //             whiteKo: null
    //         })
    //         //Make a copy of history that ends at the current turn -- not keeping track of alternate histories
    //         let history = this.state.history.slice(0, this.state.turnNumber + 1);
    //         //Make a copy of positions, useful if move ends up not being valid later
    //         let positions = [...this.state.positions.map(item => [...item])];
    //         //Based on what turn it is the current play was either black(1) or white(2)
    //         let piece = this.state.blacksTurn ? 1 : 2;
    //         //In copy splice in the new piece
    //         positions[posY].splice(posX, 1, piece);
            
    //         //Check if placing piece caused any pieces to be captured
    //         //  - Only pieces adjacent to the placed piece can be captured, so check all 4 directions
    //         //    which recursively checks if it's captured.
    //         this.handleCapture(posX, posY +1, positions, piece);
    //         this.handleCapture(posX, posY -1, positions, piece);
    //         this.handleCapture(posX +1, posY, positions, piece);
    //         this.handleCapture(posX -1, posY, positions, piece);

    //         //Check if move would capture itself, if it would return because the move isn't valid
    //         if(this.checkCapture(posX, posY, [], piece, positions)){
    //             return;
    //         }
    //         //Push modified positions into copy of history
    //         history.push(positions);
    //         //In state: alternate the turn, increase the turn number, update positions and history
    //         await this.setState({
    //             blacksTurn: !this.state.blacksTurn,
    //             turnNumber: this.state.turnNumber + 1,
    //             positions,
    //             history
    //         });

    //         this.state.socket.emit('play', this.state)
    //     }
    // }

    //--------------------------------Enables time travel--------------------------------------------
    handleForwards = () => {
        //check if at most recent turn
        if(this.state.turnNumber < this.state.history.length -1){
            //set the current position by selecting history with the new turn number
            let positions = this.state.history[this.state.turnNumber + 1];
            //black will always be the even turns (Or the zero turn, which still works)
            let blacksTurn = (this.state.turnNumber + 1) % 2 === 0
            this.setState({
                positions,
                turnNumber: this.state.turnNumber + 1,
                blacksTurn
            });
        }
    }

    handleBackwards = () => {
        //check if at first turn
        if(this.state.turnNumber > 0){
            let positions = this.state.history[this.state.turnNumber - 1];
            //white will always be the odd turns
            let blacksTurn = (this.state.turnNumber - 1) % 2 === 0
            this.setState({
                positions,
                turnNumber: this.state.turnNumber - 1,
                blacksTurn
            });
        }
    }
    //----------------------------------------------------------------------------------------------

    sendMessageData = data =>{
        if(this.state.socket){
            data.roomId = this.state.roomId;
            this.state.socket.emit('sendMessage', data);
        }
        console.log('user', this.state.user)
    }
    componentWillUnmount(){
        if(this.state.socket){
            this.state.socket.emit('leaving')
            this.state.socket.off();
        }
    }

    render(){
        if(!this.state.socket){
            return(
                <div className="outerConnection">
                    <div className="innerConnection">
                        <h1>Waiting To Connect</h1>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="gameBody">
                    <PlayerInfo 
                        blackUser={this.state.blackUser}
                        whiteUser={this.state.whiteUser}
                        blackScore={this.state.blackScore}
                        whiteScore={this.state.whiteScore}
                        blackTimeDisplay={this.state.blackTimeDisplay}
                        whiteTimeDisplay={this.state.whiteTimeDisplay}
                    />
                    <div className="boardContainer">
                        <header className="lobbyHeader">
                            {this.state.gameEnd ? <h2>Game Over!</h2> :
                            <h2>{this.state.blacksTurn ? "Black's Turn" : "White's Turn"}</h2>
                            }
                        </header>
                        <div className="boardBody">
                            <Board 
                                positions={this.state.positions}
                                handlePlay={this.handlePlay}
                                blacksTurn={this.state.blacksTurn}
                            />
                            <h1>Turn Number: {this.state.turnNumber + 1}</h1>
                        </div>
                        <footer className="boardFooter">
                            <button
                                className="btnBackwards btnBoard"
                                onClick={this.handleBackwards}
                                >{'< Previous'}
                            </button>
                            <button
                                className="btnBoard"
                                onClick={this.handlePass}
                                >Pass</button>
                            <button
                                className="btnForwards btnBoard"
                                onClick={this.handleForwards}
                                >{'Next >'}
                            </button>
                        </footer>
                    </div>
                    <Chat 
                        socket={this.state.socket}
                        users={this.state.users}
                        userId={this.state.userId}
                        userName={this.state.user.userName}
                        messages={this.state.messages}
                        sendMessageData={this.sendMessageData}
                        userImg={this.state.user.userIcon}
                    />
                </div>
            )
        }
    }
}

export default withRouter(GameBody);