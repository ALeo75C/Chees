const generateBoard = () => {
    const fin = {}
    let k = true
    for(let i = 0; i<8; i++) {
        for(let j=0; j<8; j++) {
            const coordinate = [i, j]
            fin[coordinate] = {color: k ? 'white' : 'black', highlighted: false}
            k=!k
        }
        k=!k
    }
    return fin
}

const initialBoard = generateBoard()

const addPawn = () => {
    for(let i=0; i<8; i++) {
        const position = [1, i]
        initialBoard[position].figure = {
            team: 'black',
            type: 'pawn'
        }
    }
    for(let i=0; i<8; i++) {
        const position = [6, i]
        initialBoard[position].figure = {
            team: 'white',
            type: 'pawn'
        }
    }
}
const addHorse = () => {
    initialBoard[[0, 1]].figure = {
        team: 'black',
        type: 'horse'
    }
    initialBoard[[0, 6]].figure = {
        team: 'black',
        type: 'horse'
    }
    initialBoard[[7, 1]].figure = {
        team: 'white',
        type: 'horse'
    }
    initialBoard[[7, 6]].figure = {
        team: 'white',
        type: 'horse'
    }
}
const addBishop = () => {
    initialBoard[[0, 2]].figure = {
        team: 'black',
        type: 'bishop'
    }
    initialBoard[[7, 2]].figure = {
        team: 'white',
        type: 'bishop'
    }
    initialBoard[[0, 5]].figure = {
        team: 'black',
        type: 'bishop'
    }
    initialBoard[[7, 5]].figure = {
        team: 'white',
        type: 'bishop'
    }
}
const addRook = () => {
    initialBoard[[0, 0]].figure = {
        team: 'black',
        type: 'rook'
    }
    initialBoard[[7, 0]].figure = {
        team: 'white',
        type: 'rook'
    }
    initialBoard[[0, 7]].figure = {
        team: 'black',
        type: 'rook'
    }
    initialBoard[[7, 7]].figure = {
        team: 'white',
        type: 'rook'
    }
}
const addKing = () => {
    initialBoard[[0, 4]].figure = {
        team: 'black',
        type: 'king'
    }
    initialBoard[[7, 3]].figure = {
        team: 'white',
        type: 'king'
    }
}
const addQueen = () => {
    initialBoard[[0, 3]].figure = {
        team: 'black',
        type: 'queen'
    }
    initialBoard[[7, 4]].figure = {
        team: 'white',
        type: 'queen'
    }
}

addPawn()
addHorse()
addBishop()
addRook()
addKing()
addQueen()

export default initialBoard 