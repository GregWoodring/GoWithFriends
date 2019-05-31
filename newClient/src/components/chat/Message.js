import React from 'react';

export default function Message(props){

    return(
        <div className={`messageWrapper ${props.className}`}>
            <img 
                src={props.icon} 
                className="chatIcon" 
                alt="user"/>
            <div className="messageBody">
                <div className="messageHeader">
                    <p>{props.name}</p>
                    <p>{props.time}</p>
                </div>
                <p className="messageText">{props.text}</p>
            </div>
        </div>
    )
}


//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1xRGjjPyEy-TEVr1AEGSDiOoEurN5UiDnUmtE0p4QPqyziHLm
//https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiw7eby-bTiAhXiJzQIHX5lC7IQjRx6BAgBEAU&url=https%3A%2F%2Fwww.fotolia.com%2Fid%2F93876514&psig=AOvVaw1BE-scAf0BR7WE9yYe8s9m&ust=1558814258515636