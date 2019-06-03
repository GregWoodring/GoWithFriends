import React, { Component } from 'react';
import randomItems from './randomItems';

export default class UserInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: this.props.userName,
            userImg: this.props.userImg,
            ranking: '30kyu',
        }
    }

    componentWillMount(){
        this.randomize()
    }

    randomize = () => {
        let pictureSeed = Math.floor(Math.random() * 10);
        let firstNameSeed = Math.floor(Math.random() * 20);
        let lastNameSeed = Math.floor(Math.random() * 20);

        let name = `${randomItems.firstNames[firstNameSeed]} ${randomItems.lastNames[lastNameSeed]}`;
        let icon = randomItems.pictures[pictureSeed];

        this.setState({
            userName: name,
            userIcon: icon
        })

        this.props.updateUserName(name);
        this.props.updateUserIcon(icon);
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
                                    onChange={e => this.props.updateUserName(e.target.value)} 
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
                            <button 
                                className="genBtn"
                                onClick={this.randomize}
                            >Random</button>
                        </div>
                    </div>
                    <div className="playerInfoFooter">

                    </div>
                </div>
            </div>
        )
    }
}