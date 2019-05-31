import React, { Component } from 'react';


export default class Square extends Component{
    constructor(props){
        super(props);

        this.state ={
            filled: false,
            black: false
        }
    }

    showStar = () => {
        let {posX, posY} = this.props
        if(posX === 3 && posY === 3){
            return true;
        } else if(posX === 9 && posY === 3){
            return true;
        } else if(posX === 15 && posY === 3){
            return true;
        } else if(posX === 3 && posY === 9){
            return true;
        } else if(posX === 9 && posY === 9){
            return true;
        } else if(posX === 15 && posY === 9){
            return true;
        } else if(posX === 3 && posY === 15){
            return true;
        } else if(posX === 9 && posY === 15){
            return true;
        } else if(posX === 15 && posY === 15){
            return true;
        }
    }

    renderPiece = () => {
        if(this.props.squareValue === 1){
            return(
                <div className="blackPiece"></div>
            )
        } else if(this.props.squareValue === 2){
            return(
                <div className="whitePiece"></div>
            )
        }
        
    }

    render(){

        return(
            <div onClick={e => this.props.handlePlay(e, this.props.posX, this.props.posY)}
                className="parentContainer" >
                { this.renderPiece()}
                { this.showStar() ? <div className="starPoint"></div> : undefined }
                <div className="SquareContainer">
                    <div className="tlSquare"></div>
                    <div className="trSquare"></div>
                    <div className="blSquare"></div>
                    <div className="brSquare"></div>
                </div>
            </div>
        )
    }
} 