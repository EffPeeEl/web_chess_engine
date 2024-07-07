import React, { useState } from 'react';
import './Chessboard.css';

interface Move {
    from: string,
    to: string,
    piece: string
    isEnPassantable?: boolean
}

const Chessboard: React.FC = () => {
    const initialBoardSetup: (string | null)[][] = [
        //this is inverted, you can think of each array as a chessboard column (A->H)
        ['br', 'bp', null, null, null, null, 'wp', 'wr'],
        ['bn', 'bp', null, null, null, null, 'wp', 'wn'],
        ['bb', 'bp', null, null, null, null, 'wp', 'wb'],
        ['bq', 'bp', null, null, null, null, 'wp', 'wq'],
        ['bk', 'bp', null, null, null, null, 'wp', 'wk'],
        ['bb', 'bp', null, null, null, null, 'wp', 'wb'],
        ['bn', 'bp', null, null, null, null, 'wp', 'wn'],
        ['br', 'bp', null, null, null, null, 'wp', 'wr']
    ];

    const [board, setBoard] = useState(initialBoardSetup);
    const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
    const [prevPosition, setPrevPosition] = useState<{ rowIndex: number, columnIndex: number } | null>(null);
    const [moves, setMoves] = useState<Move[]>([]);


    const collisionDetection = (board : (string | null)[][], move:Move) => {
        //TODO
        

    }

    const isLegalMove = (piece: string, rowIndex: number, columnIndex: number) => {
        const targetSquare = board[columnIndex][rowIndex];
        
        //check if same color
        if (targetSquare != null && targetSquare[0] === piece[0]) 
            return false;

        const prevRowIndex = prevPosition!.rowIndex;
        const prevColumnIndex = prevPosition!.columnIndex;
        const rowDiff : number = Math.abs(prevRowIndex - rowIndex);
        const colDiff : number  = Math.abs(prevColumnIndex - columnIndex);
        

        const realRowDiff = prevRowIndex - rowIndex;
        const realColDiff = prevColumnIndex - columnIndex;
        const rowDirection :number  = realRowDiff > 0 ? 1 : -1;
        const columnDirection : number = realColDiff > 0 ? 1 : -1;


        
        if (piece[1] === 'k') {
            if (rowDiff <= 1 && colDiff <= 1) {
                // no need for collision check since collision with target is already checked for
                return true;
            }
            return false;
        }
        
        let collision : boolean = false;

        //Queen
        if (piece[1] === 'q') {
            
            if(rowDiff === 0) {
                for(let i = 0;  i < rowDiff; i++) {
                    if(board[rowIndex + i*rowDirection][columnIndex]?.charAt(0)=== piece[0]) {
                        
                        return false;
                    }
                 

                }
            }

            if(colDiff === 0) {
                for(let i = 0;  i < rowDiff; i++) {
                    if(board[columnIndex][rowIndex + (i*rowDirection)]?.charAt(0)=== piece[0]) {
                        
                        return false;
                    }
                    //console.log(rowIndex + i*rowDirection)
                    console.log(board[columnIndex][rowIndex + (i*rowDirection)])
                    console.log("row: " +(rowIndex + (i*rowDirection) ))
                    console.log("row: " + rowIndex)
                    console.log("i: " + i)
                    console.log("dir: " + rowDirection)
                }
            }
            
            if (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) {
                
             

                    return true;
            }
        }
        
        //Bishop
        if (piece[1] === 'b') {
            if (rowDiff === colDiff) {
                return true;
            }    
        }

        //Rook
        if (piece[1] === 'r') {
            if (rowDiff === 0 || colDiff === 0) {
                return true;
            }
        }

        //Knight
        if (piece[1] === 'n') {
            if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
                return true;
            }
        }

        //Pawn
        if (piece[1] === 'p') {
            const direction = piece[0] === 'w' ? -1 : 1;
            
            //Standard move 2 squares forward
            if (((prevRowIndex === 6 && rowIndex === 4) || (prevRowIndex === 1 && rowIndex === 3))  
                && colDiff === 0 && targetSquare === null) {
                return true;
            }
            if(rowIndex === prevRowIndex + direction  && colDiff === 0 && targetSquare === null) {
                return true;
            }
            //Capture
            if (rowIndex === prevRowIndex + direction && colDiff === 1 && targetSquare != null && targetSquare[0] !== piece[0]) {
                return true;
            }
            //En passant ---NOT WORKING
            if (rowDiff === 1 && colDiff === 1 && targetSquare === null) {
                const lastMove = moves[moves.length - 1];
                if (lastMove.piece[1] === 'p' &&  translateMove(lastMove.to).rowIndex === prevRowIndex && translateMove(lastMove.to).columnIndex === columnIndex){
                    
                    return true;
                }
            }
        }

        return false;
    }

    const translateMove = (move: string) => {
        return {
            rowIndex: 8 - parseInt(move[1]),
            columnIndex: move.charCodeAt(0) - 97
        };
    }

    const handleSquareClick = (rowIndex: number, columnIndex: number) => {
        if (selectedPiece && isLegalMove(selectedPiece, rowIndex, columnIndex)) {
            const newBoard = board.map(row => row.slice());

            newBoard[columnIndex][rowIndex] = selectedPiece;

            if (prevPosition) {
                newBoard[prevPosition.columnIndex][prevPosition.rowIndex] = null;
                
                // Add the move to the moves array
                const move: Move = {
                    from: `${String.fromCharCode(97 + prevPosition.columnIndex)}${8 - prevPosition.rowIndex}`,
                    to: `${String.fromCharCode(97 + columnIndex)}${8 - rowIndex}`,
                    piece: selectedPiece
                };
                setMoves([...moves, move]);
            }

            setBoard(newBoard);
            setSelectedPiece(null);
            setPrevPosition(null);
        } else {
            if (board[columnIndex][rowIndex]) {
                setSelectedPiece(board[columnIndex][rowIndex]);
                setPrevPosition({ rowIndex, columnIndex });
            }
        }
    };

    return (
        <div className="chessboard-container">
            <div className="chessboard">
                {board.map((column, columnIndex) => (
                    <div className="chessboard-column" key={columnIndex}>
                        {column.map((piece, rowIndex) => {
                            const isDark = (rowIndex + columnIndex) % 2 === 1;
                            const squareClass = isDark ? 'square dark' : 'square light';
                            return (
                                <div
                                    className={squareClass}
                                    key={`${columnIndex}-${rowIndex}`}
                                    onClick={() => handleSquareClick(rowIndex, columnIndex)}
                                >
                                    {piece && <div className={`piece ${piece}`}></div>}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="moves-list">
                <h3>Moves</h3>
                <ul>
                    {moves.map((move, index) => (
                        <li key={index}>
                            {move.piece} from {move.from} to {move.to}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Chessboard;
