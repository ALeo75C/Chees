import React from "react"

import { ReactComponent as Horse } from '../assets/horse.svg'
import { ReactComponent as Pawn } from '../assets/pawn.svg'
import { ReactComponent as King } from '../assets/king.svg'
import { ReactComponent as Queen } from '../assets/queen.svg'
import { ReactComponent as Bishop } from '../assets/bishop.svg'
import { ReactComponent as Rook } from '../assets/rook.svg'

const renderFigure = (fig) => {
    switch(fig) {
        case 'horse':
            return <Horse/>
        case 'king':
            return <King/>
        case 'queen':
            return <Queen/>
        case 'rook':
            return <Rook/>
        case 'bishop':
            return <Bishop/>
        default:
            return <Pawn/>
    }
}

const renderPickFigureWindow = (id, handlePick) => {
    return (
        <div className="pickWindow">
            <p onClick={()=>handlePick(id, 'rook')}>Rook</p>
            <p onClick={()=>handlePick(id, 'horse')}>Horse</p>
            <p onClick={()=>handlePick(id, 'bishop')}>Bishop</p>
            <p onClick={()=>handlePick(id, 'queen')}>Queen</p>
        </div>
    )
}

export default class Figure extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {id, type, team, isPicted, position, handleClick, status, handleChange} = this.props
        return (
            <div 
                className={`Figure ${team} ${isPicted}`} 
                style={{
                    top: position[0]*80+5, 
                    left: position[1]*80 +30
                }}
                onClick={()=>handleClick(id)}
                >
                {renderFigure(type)}
                {status ? renderPickFigureWindow(id, handleChange) : ''}
            </div>
    )}
}
