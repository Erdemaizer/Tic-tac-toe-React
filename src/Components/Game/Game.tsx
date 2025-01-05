import { useState } from "react";
import Board from "../Board/Board";
import './Game.css'

export default function Game(){
    const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares : string[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(index: number){
        setCurrentMove(index); 
    }

    const moves = history.map((squares, move) => {
        let description;
        if(move > 0){
            description = `Вернуться к ходу ${move}`;
        } else {    
            description = `Вернуться в начало`;
        }

        return(
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return(
        <div className="game">
            <div className="game-board">
                <Board currentSquares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                {moves}
            </div>
        </div>
    )
}