import React, { Component } from 'react'

export default class ConnectionStatus extends Component{
    constructor(props){
        super(props);

        this.state = {
            users: this.props.users
        }
    }

    componentDidMount(){
        this.setState({
            users: this.props.users
        })
    }

    renderUsers = () => {
        let users = [...this.props.users]

        return users.map(item => {
            return(
                <div 
                    key={item.userId}
                    className="userStatus">
                    <div className='connectionStatusLight'></div> 
                   <p>{item.userName}</p>
                    <div className="connectionUserStatus">
                        
   
                    </div>
                </div>
            )
        })
    }
 
    render(){
        return(
            <div className="connectionStatusBar">
                <div className="connectionStatusHeader">
                    
                </div>
                {this.renderUsers()}
                <div className="connectionStatusInfo">
                    <div className="connectedStatusLight"></div>
                </div>
            </div>
        )

    }

}