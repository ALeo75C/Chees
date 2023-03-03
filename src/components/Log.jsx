const coor = ['a', 'b','c','d','e','f','g','h']

const renderChess = (log, handleEnter, handleLeave) => {
    const logStepsItems = []
    log.forEach((str, i) => {
        const killFig = str.kill ? <span>{` | ${str.kill.team} ${str.kill.type}`}</span> : ''
        const mate = str.mate ? <span style={{color:'red'}}> | check</span> : ''
        logStepsItems.push(
            <p key={`step_${i}`} className={str.kill?'kill ':' '} onMouseEnter={()=>handleEnter(i)} onMouseLeave={()=>handleLeave(i)}>
                {`${str.figure.team} ${str.figure.type}`} | 
                {` ${coor[str.from[1]]}${str.from[0]+1} -> `} 
                <span>{`${coor[str.to[1]]}${str.to[0]+1}`}</span>
                {killFig}
                {mate}
            </p>)
    });
    return logStepsItems
}

const Log = (props) => {
    return (
        <div className="Log">
            <h3>Log</h3>
            {renderChess(props.log, props.handleMouseEnter, props.handleMouseLeave)}
        </div>
    )
}

export default Log