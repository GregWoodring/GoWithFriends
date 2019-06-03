import React, { Component } from 'react';
import Message from './Message';
import Compose from './Compose';
import ConnectionStatus from './ConnectionStatus';
import uuidvi from 'uuid/v1';


import io from 'socket.io-client';
// const socket = io.connect('localhost:3001/');
// socket.on('news', data => {
//     console.log(data)
//     socket.emit('my other event', {hey: "server"})
// })

export default class Chat extends Component{
    constructor(props){
        super(props)

        this.state = {
            message: ''
        }
    }

    postMessage = () => {
        let date = new Date();
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()
        let AmPm = date.getHours() > 11 ? 'PM' : 'AM';
        let time = `${hours}:${minutes} ${AmPm}`;

        let data = {
            text: this.state.message,
            time,
            name: this.props.userName,
            icon: this.props.userImg,
            messageId: uuidvi(),
            userId: this.props.userId
        }
        this.props.sendMessageData(data);
        this.setState({message: ''});
    }

    updateMessage = e => {
        this.setState({message: e.target.value})
    }

    renderMessages = () => {
        console.log('rendering: ', this.props.messages)
        return this.props.messages.map(item => {
            let className = item.userId === this.props.userId ? 'myMessage' : 'otherMessage'
            return (<Message 
                key={item.messageId}
                text={item.text}
                time={item.time}
                name={item.name}
                icon={item.icon}
                className={className}
            />)
        })
    }

    render(){
        return(
            <div className="chatWrapper">
                <div className="chatContainer">
                    <div className="lobbyHeader">
                        <h2>Chat</h2>
                    </div>
                    <div className="messages">
                        {this.renderMessages()}
                    </div>
                    <div className="chatFooter">
                        <Compose 
                            postMessage={this.postMessage}
                            updateMessage={this.updateMessage}
                            message={this.state.message}
                        />
                    </div>
                </div>
                <ConnectionStatus
                        socket={this.props.socket}
                        users={this.props.users}
                    />
            </div>
        )
    }
}