import React, { Component } from 'react';
import io from 'socket.io-client';
import uuidvi from 'uuid/v1';
import {withRouter} from 'react-router-dom';

import Lobby from './Lobby'
import Chat from '../chat/Chat'
import UserInfo from './UserInfo'

class LobbyBody extends Component{
    constructor(props){
        super(props);

        this.state = {
            socket: null,
            users: [],
            games: [],
            userName: 'Anon',
            ranking: '30Kyu',
            userImg: 'data:image/jpeg;base64,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',
            timestamp: 0,
            userId: this.props.userId,
            messages: []
        }
    }

    componentWillMount(){
       
        console.log('mounting')
        let socket = io.connect('/',{
            transports: ['websocket']
        });
        console.log(socket)
        //Create Socket Connection, wait for 
        //response, on response we know socket
        //is connected, set event handlers on 
        //socket, then emit to tell server to send data back
        //to update state.
        socket.on('connectedToLobby', data => {
            console.log('connected to lobby')

            //I now have one function which returns all data to the lobby
            //with a timestamp, this will allow us to compare the timestamp
            //on the server to the timestamp in the client, if there's a difference
            //the server will send the data again 
            socket.on('updateLobbyData', data => this.updateLobbyData(data))

            socket.on('checkChanges', timestamp => {
                if(timestamp !== this.state.timestamp){
                    console.log(this.state)
                    socket.emit('getUpdates');
                } 
                //using this to track disconnected players
                socket.emit('inSync', this.props.userId);
            })

            socket.emit('updateUser', {
                userId: this.state.userId,
                userName: this.state.userName,
                ranking: this.state.ranking
            })

            //This will tell the server to fire the events I 
            //just initialized
            socket.emit('initializedLobbyEvents')
            

            this.setState({
                socket
            })
        });

        
        
    }

    updateLobbyData = data =>{
        let users = data.usersArr;
        let games = data.roomsArr;
        let timestamp = data.timestamp;
        let messages = data.messages
        console.log('update data:', data)
        this.setState({
            users,
            games,
            timestamp,
            messages
        })
    }

    updateUserName = async text => {
        await this.setState({userName: text});
        this.updateUserData();
    }
    
    updateUserIcon = async icon => {
        await this.setState({userImg: icon});
        this.updateUserData();
    }

    updateRanking = async e => {
        await this.setState({ranking: e.target.value});
        this.updateUserData();
    }

    updateUserData = () => {
        if(this.state.socket){
            this.state.socket.emit('updateUser', {   
                userId: this.state.userId,
                userName: this.state.userName,
                ranking: this.state.ranking,
                userIcon: this.state.userImg 
            })
        }
    }

    sendMessageData = data => {
        if(this.state.socket){
            this.state.socket.emit('updateMessages', data)
        }
    }

    createGame = data => {
        if(this.state.socket){
            data.userId = this.props.userId;
            this.state.socket.emit('createGame', data);
            this.props.history.push(`/game/${data.roomId}`)
            // this.props.unmount
        }
        // this.setState({socket: null})
    }

    joinGame = (roomId, role) => {
        if(this.state.socket){
            this.state.socket.emit('joinGame', {
                roomId,
                role,
                userId: this.props.userId
            });
            this.props.history.push(`/game/${roomId}`)
        }
    }

    componentWillUnmount(){
        if(this.state.socket){
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
                <div
                    className="lobbyBodyWrapper"
                >
                    <UserInfo 
                        userName={this.state.userName}
                        ranking={this.state.ranking}
                        updateUserName={this.updateUserName}
                        updateUserIcon={this.updateUserIcon}
                        updateRanking={this.updateRanking}
                        userImg={this.state.userImg}
                    />
                    <Lobby 
                        socket={this.state.socket}
                        games={this.state.games}
                        createGame={this.createGame}
                        joinGame={this.joinGame}
                    />
                    <Chat 
                        socket={this.state.socket}
                        users={this.state.users}
                        userId={this.state.userId}
                        userName={this.state.userName}
                        messages={this.state.messages}
                        sendMessageData={this.sendMessageData}
                        userImg={this.state.userImg}
                    />
                </div>
            )
        }
    }
}

export default withRouter(LobbyBody);