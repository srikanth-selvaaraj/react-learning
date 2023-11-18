import {React, useState} from "react";

function Square({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick}>{value}</button>
}

function TicTacToe({xIsNext, squares, onPlay}) {
    // const [squares, setSquares] = useState(Array(9).fill(null))

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice() // Copy the previous state
        if (xIsNext) {
            nextSquares[i] = 'X'
        } else {
            nextSquares[i] = 'O'
        }
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    function renderRow(rows) {
        return (
            rows.map((row) => {
                return (
                    <Square value={squares[row]} onSquareClick={() => handleClick(row)}/>
                );
            })
        );
    }

    function renderBoard() {
         return (
            <div>
            {[0, 1, 2].map(row => (
                <div className="borad-row" key={row}>
                    {[0, 1, 2].map((column) => {
                        let cell = row * 3 + column;
                        return (
                            <Square value={squares[cell]} onSquareClick={() => handleClick(cell)}/>
                        );
                    })}
                </div>
            ))}
            </div>
         );
    }
    return (
        <>
        <h1>Tic Tac Toe game</h1>
        <div className="status">{status}</div>
        {renderBoard()}
        {/* <div className="board-row">
            {renderRow([0, 1, 2])}
        </div>

        <div className="board-row">
            {renderRow([3, 4, 5])}
        </div>

        <div className="board-row">
            {renderRow([6, 7, 8])}
        </div> */}
        </>
    );
}

function Game() {
    const [xIsNext, setXIsNext] = useState(true)
    const [history, setHistory] = useState([Array(9).fill(null)]) // An array of 9 arrays
    const [currentMove, setCurrentMove] = useState(0)
    const currentSquare = history[currentMove]

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1),  nextSquares];
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
        setXIsNext(!xIsNext)
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
        setXIsNext(nextMove % 2 === 0)
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move
        } else {
            description = 'Start the game'
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
    <div className="row">
        <div className="col-md-6">
            <TicTacToe xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}/>
        </div>
        <div className="col-md-6">
            <ol>
            {moves}
            </ol>
        </div>
    </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
}

export default Game