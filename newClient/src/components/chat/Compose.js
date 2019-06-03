import React from 'react';


export default function Compose(props){

    return(
        <div className="composeWrapper">
            <textarea
                onChange={e => props.updateMessage(e)}
                className="composeMessageArea"
                value={props.message}
            ></textarea>
            <button 
                onClick={() => props.postMessage()}
                className="sendButton"
            ><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
        </div>
    )
}