import React from 'react';

import Board from './components/Board'
import Figure from './components/Figure'
import Log from './components/Log'

import board from './data/boardData'
import getNewFigure from './data/figures'

import './styles/App.css';

const teams = ['white', 'black']

export default class App extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      board: board,
      figures: [],
      pickedFigurePosition: null,
      currentTeam: teams[0],
      log: []
    }
  }

  handleFigureClick = (position) => {
    position = position.split(',').map(i=>Number(i))
    const newState = new Object(this.state)
    const newFigure = newState.board[position].figure

    if (newFigure.team === newState.currentTeam) {
      const oldFigurePosition = newState.pickedFigurePosition
  
      if(oldFigurePosition) {
        const isSame = oldFigurePosition.reduce((res, cor, id)=> cor === position[id] && res, true)
        if(isSame) {
          newFigure.isPicted = false
          newState.pickedFigurePosition = null
        } else {
          this.highlighteMoves({move: [], kill: []})
          newState.board[oldFigurePosition].figure.isPicted = false
          newFigure.isPicted = true
          newState.pickedFigurePosition = position
        }
      } else {
        newState.pickedFigurePosition = position
        newFigure.isPicted = true
      }
      this.setState(newState)
      this.checkMoves()
    } else if (newState.pickedFigurePosition) {
      this.handleCellClick(position.join(','))
    }
  }

  handleCellClick = (cell) => {
    cell = cell.split(',').map(i => Number(i))
    if (this.state.pickedFigurePosition) {
      const newState = new Object(this.state)
      const posibleMoves = newState.posibleMoves
      const startCell = newState.pickedFigurePosition
      const figure = newState.board[startCell].figure

      const isMove = posibleMoves.move.reduce((res, cor)=> (cell[0]===cor[0] && cell[1]===cor[1]) || res, false)
      const isKill = posibleMoves.kill.reduce((res, cor)=> (cell[0]===cor[0] && cell[1]===cor[1]) || res, false)
      
      if(isMove||isKill) {
        const log = {from: startCell, to: cell, figure: figure}
        if(isKill) {log.kill = newState.board[cell].figure}

        figure.isPicted = false
        newState.board[cell].figure = figure
        delete newState.board[startCell].figure
        if (figure.type === 'pawn' && (cell[0] === 0 || cell[0] === 7)) {figure.status = 'shanged'}
        newState.pickedFigurePosition = null
        
        const currentFigure = getNewFigure(cell, newState.board)
        newState.mate = currentFigure.checkMate()

        if(newState.mate) {log.mate = true}
        newState.log.unshift(log)
        
        newState.currentTeam = figure.team === teams[0] ? teams[1] : teams[0]
        this.highlighteMoves({move: [], kill: []})
      } else {
        console.error('incorrect cell')
      }

      this.setState(newState)
    }
  }
  
  checkMoves = () => {
    const newState = new Object(this.state)
    const position = this.state.pickedFigurePosition
    let posibleMoves = {move: [], kill: []}
    if (position) {
      const figure = getNewFigure(position, this.state.board)
      posibleMoves = figure.getPosibleMoves()
      figure.checkMate()
      newState.posibleMoves = posibleMoves
      this.setState(newState)
    }
    this.highlighteMoves(posibleMoves)
  }

  highlighteMoves = (moves) => {
    const newState = new Object(this.state)
    // console.log(newState)
    if(moves.move.length>0 || moves.kill.length>0) {
      moves.move.forEach(el => {
        newState.board[el].highlighted = 'move'
      });
      moves.kill.forEach(el => {
        newState.board[el].highlighted = 'kill'
      });
    } else {
      for(let cell in newState.board) {
        if(newState.board[cell].highlighted) {
          newState.board[cell].highlighted = false
        } 
      }
    }
    if(newState.mate){
      // console.log
      newState.board[newState.mate].highlighted = 'mate'
    }
    this.setState(newState)
  }

  changePawn = (id, newFigure) => {
    const newState = new Object(this.state)
    const figure = newState.board[id].figure
    figure.type = newFigure
    delete figure.status
    this.setState(newState)
 }

  backLog = (id) => {
    const newState = new Object(this.state)
    const history = newState.log.slice(0, id+1)
    history.forEach(move=> {
      console.log(move)
      const figure = newState.board[move.to].figure
      newState.board[move.from].figure = figure
      if (move.kill) {
        newState.board[move.to].figure = move.kill
      } else {
        delete newState.board[move.to].figure
      }
    })
    this.setState(newState)
  }
  repairBoard = (id) => {
    const newState = new Object(this.state)
    const history = newState.log.slice(0, id+1)
    for (let i=id; i>=0; i--) {
      const move = history[i]
      console.log(move)
      const figure = newState.board[move.from].figure
      newState.board[move.to].figure = figure
      delete newState.board[move.from].figure
    }
    this.setState(newState)
  }

  renderFigures = () => {
    const bor = this.state.board
    const figureItems = []
    let id = 0

    for(let cell in bor) {
      const figure = bor[cell].figure
      if(figure) {
        figureItems.push(
          <Figure 
            key={`fig_${cell}`} 
            id={cell}
            position={cell.split(',')} 
            team={figure.team} 
            type={figure.type}
            isPicted={figure.isPicted}
            status={figure.status}
            handleClick={this.handleFigureClick}
            handleChange={this.changePawn}
        />
        )
        id++
      }
    }
    return figureItems
  }

  render(){ 
    if(this.state.mate) {
      console.log(this.state.board[this.state.mate])
    }
    return (
      <div className='Chess' style={styles.main}>
        <div className='GameBoard'>
          <h2>{this.state.currentTeam+'`s move'}</h2>
          <Board board={this.state.board} handleClick={this.handleCellClick}/>
        </div>
        <Log log={this.state.log} handleMouseEnter={this.backLog} handleMouseLeave={this.repairBoard}/>
        {this.renderFigures()}
      </div>
    )
}
}

const styles = {
  main: {
    position: 'relative',
    display: 'flex'
  }
}


