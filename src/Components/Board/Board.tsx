import Square from "../Square/Square";
import "./Board.css";

export type BoardProps = {
  xIsNext: boolean,
  currentSquares: string[],
  onPlay: (nextSquares: string[]) => void;
}

export default function Board({xIsNext, currentSquares, onPlay}: BoardProps) {
  const nextPlayer = xIsNext ? 'x' : 'o';
  const handleClick = (i : number) => {
    if(currentSquares[i] || calculateWinner(currentSquares)){
      return;
    }

    const newSquares = currentSquares.slice();
    newSquares[i] = nextPlayer;
    onPlay(newSquares);
  }
  
  const winner = calculateWinner(currentSquares);
  const status = winner ? `${winner}` : `Next player: ${nextPlayer}`;
  return (
    <div className="board-container">
      <div>
        <p>{status}</p>
      </div>
      <div className="square-row">
        <Square currentMark={currentSquares[0]} onClick={() => handleClick(0)}/>
        <Square currentMark={currentSquares[1]} onClick={() => handleClick(1)}/>
        <Square currentMark={currentSquares[2]} onClick={() => handleClick(2)}/>
      </div>
      <div className="square-row">
        <Square currentMark={currentSquares[3]} onClick={() => handleClick(3)}/>
        <Square currentMark={currentSquares[4]} onClick={() => handleClick(4)}/>
        <Square currentMark={currentSquares[5]} onClick={() => handleClick(5)}/>
      </div>
      <div className="square-row">
        <Square currentMark={currentSquares[6]} onClick={() => handleClick(6)}/>
        <Square currentMark={currentSquares[7]} onClick={() => handleClick(7)}/>
        <Square currentMark={currentSquares[8]} onClick={() => handleClick(8)}/>
      </div>
    </div>
  );
}

function calculateWinner(squares: string[]) {
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
      return squares[a] + ` is a Winner`;
    }
  }

  let cnt = 0;
  for(let i = 0; i < squares.length; i++) {
    if (squares[i]) {
      cnt++;
    }
  }

  if(cnt == 9) {
    return "tie";
  }
  else {
    return null;
  }
}
