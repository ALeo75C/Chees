import React from "react";

const renderBoard = (board, handleClick) => {
    const bor = []
    let lineNum = 0
    let line = []
    for (let cell in board) {
        // if(board[cell].highlighted) {console.log(board[cell])}
        // console.log()
        if (lineNum==cell[0]) {
            line.push(<div 
                key={`cell_${cell}`} 
                className={`cell ${board[cell].color} ${board[cell].highlighted}`} 
                onClick={()=>handleClick(cell)}>
                </div>)
        } else {
            bor.push(<div key={`line_${lineNum}`} className="boardLine" style={{display: 'flex'}}>{line}</div>)
            lineNum = cell[0]
            line = [<div 
                key={`cell_${cell}`} 
                className={`cell ${board[cell].color} ${board[cell].highlighted}`} 
                onClick={()=>handleClick(cell)}>
                </div>]
        }
    }
    bor.push(<div key={`line_${lineNum}`} className="boardLine" style={{display: 'flex'}}>{line}</div>)
    return bor
}

const renderLegend = (horizontal) => {
    let legendItems = []
    let style={position: 'absolute', display: 'flex', justifyContent: 'space-around'}
    if(horizontal) {
        const coor = ['a', 'b','c','d','e','f','g','h']
        legendItems = coor.map(str=> <p key={`leg_${str}`}>{str}</p>)
        style.width = '100%'
        style.bottom = '-45px'
    } else {
        for(let i = 1; i<9; i++) {
            legendItems.push(<p key={`leg_${i}`}>{i}</p>)
        }
        style.flexDirection = 'column'
        style.height = '100%'
        style.top= '0'
        style.left= '-20px'
    }
    return <div className="legend" style={style}>{legendItems}</div>
}

const Board = (props) => {
    return (
        <div className='Board' style={{position: 'relative'}}>
            {renderBoard(props.board, props.handleClick)}
            {renderLegend(true)}
            {renderLegend(false)}
        </div>
    )
}

export default Board