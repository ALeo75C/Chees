
class Figure {
    constructor(figure, board) {
        this.team = figure.team
        this.board = board
    }   
}

class Pawn extends Figure {
    constructor(position, board) {
        super(board[position].figure, board)
        this.position = position
    }

    getMove() {
        let posibleMoves = []
        if ((this.team === 'black' && this.position[0] === 1) || (this.team === 'white' && this.position[0] === 6)) {
            for(let i =1;i<3; i++) {
                let move = this.team === 'black' ? [this.position[0]+i, this.position[1]] : [this.position[0]-i, this.position[1]]
                if (!this.board[move].figure) {
                    if (this.board[move]){posibleMoves.push(move)}
                } else {
                    break
                }
            }
        } else {
            let move = this.team === 'black' ? [this.position[0]+1, this.position[1]] : [this.position[0]-1, this.position[1]]
            if (!this.board[move].figure && this.board[move]) {
                posibleMoves.push(move)
            }
        }
        return posibleMoves
    }
    
    getKillCoordinate() {
        let killCoordinate = []
        const killCoortinate = [[1,1], [1, -1]]
        killCoortinate.forEach(cor=> {
            let move = this.team === 'black' ? [this.position[0]+cor[0], this.position[1]+cor[1]] : [this.position[0]-cor[0], this.position[1]-cor[1]]
            if (this.board[move]) {
                if (this.board[move].figure) {
                    if (this.board[move].figure.team !== this.team) {
                        killCoordinate.push(move)
                    }
                }
            }
        })
        return killCoordinate
    }

    getPosibleMoves() {
        return {move: this.getMove(), kill: this.getKillCoordinate()}
    }

    checkMate() {
        const killMoves = this.getKillCoordinate()
        let mateCoordinate = null
        killMoves.forEach(move => {
            if(this.board[move].figure.type === 'king' && this.board[move].figure.team !== this.team) {
                mateCoordinate = move
            }
        })
        return mateCoordinate
    }
}

class Horse extends Figure {
    constructor(position, board) {
        super(board[position].figure, board)
        this.position = position
        this.ways = [[2, 1], [1, 2], [-2, 1], [-1, 2], [2, -1], [1, -2], [-2, -1],[-1, -2]]
    }

    getPosibleMoves() {
        const posibleMoves = {move: [], kill: []}
        this.ways.forEach(way => {
            let move = [this.position[0]+way[0], this.position[1]+way[1]]
            if (this.board[move]){
              if (!this.board[move].figure) {
                posibleMoves.move.push(move)
              } else if (this.board[move].figure.team !== this.team) {
                posibleMoves.kill.push(move)
              }
            }
        })
        return posibleMoves
    } 

    checkMate() {
        const killMoves = this.getPosibleMoves().kill
        let mateCoordinate = null
        killMoves.forEach(move => {
            if(this.board[move].figure.type === 'king' && this.board[move].figure.team !== this.team) {
                mateCoordinate = move
            }
        })
        return mateCoordinate
    } 
}

class Rook extends Figure {
    constructor(position, board) {
        super(board[position].figure, board)
        this.position = position
    }

    getCoordinate(i, j) {
        let move
        if(i===0) {
            move = [this.position[0]+j, this.position[1]]
        }else if(i===1) {
            move = [this.position[0]-j, this.position[1]]
        }else if(i===2){
            move = [this.position[0], this.position[1]+j]
        }else {
            move = [this.position[0], this.position[1]-j]
        }
        return move
    }

    getPosibleMoves() {
        const posibleMoves = {move: [], kill: []}
        for(let i=0; i<4; i++) {
            for(let j=1; j<8; j++) {
                let move = this.getCoordinate(i, j)
                if (this.board[move]){
                  if (!this.board[move].figure) {
                    posibleMoves.move.push(move)
                  } else if (this.board[move].figure.team != this.team) {
                    posibleMoves.kill.push(move)
                    break
                  } else {
                    break
                  }
                }
            }
        }
        return posibleMoves
    }

    checkMate() {
        const killMoves = this.getPosibleMoves().kill
        let mateCoordinate = null
        killMoves.forEach(move => {
            if(this.board[move].figure.type === 'king' && this.board[move].figure.team !== this.team) {
                mateCoordinate = move
            }
        })
        return mateCoordinate
    } 
}

class Bishop extends Figure {
    constructor(position, board) {
        super(board[position].figure, board)
        this.position = position
    }

    getCoordinate(i, j) {
        let move
        if(i===0) {
            move = [this.position[0]+j, this.position[1]+j]
        }else if(i===1) {
            move = [this.position[0]-j, this.position[1]-j]
        }else if(i===2){
            move = [this.position[0]-j, this.position[1]+j]
        }else {
            move = [this.position[0]+j, this.position[1]-j]
        }
        return move
    }

    getPosibleMoves() {
        const posibleMoves = {move: [], kill: []}
        for(let i=0; i<4; i++) {
            for(let j=1; j<8; j++) {
                let move = this.getCoordinate(i, j)
                
                if (this.board[move]){
                  if (!this.board[move].figure) {
                    posibleMoves.move.push(move)
                  } else if (this.board[move].figure.team != this.team) {
                    posibleMoves.kill.push(move)
                    break
                  } else {
                    break
                  }
                }
            }
        }
        return posibleMoves
    }

    checkMate() {
        const killMoves = this.getPosibleMoves().kill
        let mateCoordinate = null
        killMoves.forEach(move => {
            if(this.board[move].figure.type === 'king' && this.board[move].figure.team !== this.team) {
                mateCoordinate = move
            }
        })
        return mateCoordinate
    } 
}

class King extends Figure {
    constructor(position, board) {
        super(board[position].figure, board)
        this.position = position
        this.ways = [[1, 1], [1, -1], [1, 0], [-1, -1], [0, -1], [-1, 1], [0, 1], [-1, 0]]
    }

    getPosibleMoves() {
        const posibleMoves = {move: [], kill: []}
        this.ways.forEach(way => {
            let move = [this.position[0]+way[0], this.position[1]+way[1]]
            if (this.board[move]){
              if (!this.board[move].figure) {
                posibleMoves.move.push(move)
              } else if (this.board[move].figure.team != this.team) {
                posibleMoves.kill.push(move)
              }
            }
        })
        return posibleMoves
    }

    checkMate() {
        const killMoves = this.getPosibleMoves().kill
        let mateCoordinate = null
        killMoves.forEach(move => {
            if(this.board[move].figure.type === 'king' && this.board[move].figure.team !== this.team) {
                mateCoordinate = move
            }
        })
        return mateCoordinate
    } 
}

class Queen extends Figure {
    constructor(position, board) {
        super(board[position].figure, board)
        this.position = position
    }

    getPosibleMoves() {
        const bishop = new Bishop(this.position, this.board)
        const bishopMoves = bishop.getPosibleMoves()
        
        const rook = new Rook(this.position, this.board)
        const rookMoves = rook.getPosibleMoves()

        return {move: [...bishopMoves.move, ...rookMoves.move], kill: [...bishopMoves.kill, ...rookMoves.kill]}
    }

    checkMate() {
        const killMoves = this.getPosibleMoves().kill
        let mateCoordinate = null
        killMoves.forEach(move => {
            if(this.board[move].figure.type === 'king' && this.board[move].figure.team !== this.team) {
                mateCoordinate = move
            }
        })
        return mateCoordinate
    } 
}

const getNewFigure = (position, board) => {
    switch (board[position].figure.type) {
        case 'pawn': 
            return new Pawn(position, board)
        case 'rook': 
            return new Rook(position, board)
        case 'horse': 
            return new Horse(position, board)
        case 'bishop': 
            return new Bishop(position, board)
        case 'queen': 
            return new Queen(position, board)
        case 'king': 
            return new King(position, board)
        default:
            console.log('???')
            break

    }
}

export default getNewFigure
// const pawn = new Pawn('black', [0,0])

// pawn.getPosition()
// console.log (board)