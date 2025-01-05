import './Square.css'

export type SquareProps = {
    currentMark: string | undefined,
    onClick: () => void;
}

export default function Square({ currentMark, onClick } : SquareProps){
    return(
        <button className="button" onClick={onClick}>{currentMark}</button>
    )
}