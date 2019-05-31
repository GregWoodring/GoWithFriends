import React, { Component } from 'react';

export default class UserInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: '',
            ranking: '30kyu',
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
                        <h2>User Info</h2>
                    </div>
                    <div className="playerInfoBody">
                        <div className="playerInfoCard">
                            <img src={this.props.userImg} alt="profile" />
                            <div className="playerInfoCardBody">
                                <label>User Name: </label>
                                <input 
                                    type="text"
                                    placeholder="User Name"
                                    onChange={e => this.props.updateUserName(e)} 
                                    value={this.props.userName}/>
                            </div>
                            <div className="playerInfoCardBody">
                                <label>Ranking:</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter Ranking"
                                    onChange={e => this.props.updateRanking(e)} 
                                    value={this.props.ranking} />
                            </div>
                            {/* <button className="genBtn">Submit</button> */}
                        </div>
                    </div>
                    <div className="playerInfoFooter">

                    </div>
                </div>
            </div>
        )
    }
}