import { useState } from "react";
import Board from "../Board/Board";
import './Game.css'

export default function Game(){
    const [currentMark, setCurrentMark] = useState('x');
    const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
    const [currentSquares, setCurrentSquares] = useState(history[history.length - 1]);
    const [currentMove, setCurrentMove] = useState(0);

    function handlePlay(nextSquares : string[]) {
        setHistory([...history.slice(0, currentMove + 1), nextSquares]);
        setCurrentMove(history.length);
        setCurrentSquares(nextSquares);
        if(currentMark === 'o'){
            setCurrentMark('x');
        } else{
            setCurrentMark('o')
        }
    }

    function jumpTo(index: number){
        setCurrentMove(index); 
        if(index % 2 === 0){
            setCurrentMark('x');
        } else{
            setCurrentMark('o');
        }
        setCurrentSquares(history[index]);
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
                <Board currentSquares={currentSquares} currentMark={currentMark} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                {moves}
            </div>
        </div>
    )
}