import React, { Component } from 'react';

//components
import Square from './Square'

export default class Board extends Component{

    renderRow = (arr, rowIndex) => {
        return arr.map((item, colIndex) => {
            let squareValue = this.props.positions[rowIndex][colIndex]

            return(
                <Square 
                    key={`${rowIndex}:${colIndex}`}
                    posX={colIndex}
                    posY={rowIndex}
                    handlePlay={this.props.handlePlay}
                    squareValue={squareValue}
                />
            )
        })
    }

    renderBoard = () => {
        return this.props.positions.map((arr, rowIndex) => {
            return(
                <div 
                    key={rowIndex}
                    className="boardRow">
                {this.renderRow(arr, rowIndex)}
                </div>);
        })
    }


    render(){
        return(
            <div className="board">
                {this.renderBoard()}
            </div>
        )
    }
}