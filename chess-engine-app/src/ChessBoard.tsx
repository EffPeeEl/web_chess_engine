import React, { useState } from 'react';
import './Chessboard.css';

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

    const isLegalMove = (piece: string, rowIndex: number, columnIndex: number) => {
        const targetSquare = board[columnIndex][rowIndex]
        
        //check if same color
        if (targetSquare != null && targetSquare[0] === piece[0]) 
            return false;

        const prevRowIndex = prevPosition!.rowIndex;
        const prevColumnIndex = prevPosition!.columnIndex;
        const rowDiff = Math.abs(prevRowIndex - rowIndex);
        const colDiff = Math.abs(prevColumnIndex - columnIndex);
        if (piece[1] === 'k') {
    
            if (rowDiff <= 1 && colDiff <= 1) {
                return true;
            }
            return false;
        }
        
        //Queen
        if (piece[1] === 'q') {
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
            if (piece[0] === 'w') {
                if (prevColumnIndex === 6 && columnIndex === 4 && rowIndex === prevRowIndex) {
                    return true;
                }
                if (prevColumnIndex - 1 === columnIndex && rowIndex === prevRowIndex && targetSquare === null) {
                    return true;
                }
                if (prevColumnIndex - 1 === columnIndex && prevRowIndex - 1 === rowIndex && targetSquare !== null) {
                    return true;
                }
                if (prevColumnIndex - 1 === columnIndex && prevRowIndex + 1 === rowIndex && targetSquare !== null) {
                    return true;
                }
            } else {
                if (prevColumnIndex === 1 && columnIndex === 3 && rowIndex === prevRowIndex) {
                    return true;
                }
                if (prevColumnIndex + 1 === columnIndex && rowIndex === prevRowIndex && targetSquare === null) {
                    return true;
                }
                if (prevColumnIndex + 1 === columnIndex && prevRowIndex - 1 === rowIndex && targetSquare !== null) {
                    return true;
                }
                if (prevColumnIndex + 1 === columnIndex && prevRowIndex + 1 === rowIndex && targetSquare !== null) {
                    return true;
                }
            }
        }

        return false;
                    


        }
    

    const handleSquareClick = (rowIndex: number, columnIndex: number) => {
        if (selectedPiece && isLegalMove(selectedPiece, rowIndex, columnIndex)) {

            const newBoard = board.map(row => row.slice());

            newBoard[columnIndex][rowIndex] = selectedPiece;

            if (prevPosition) {
                newBoard[prevPosition.columnIndex][prevPosition.rowIndex] = null;
            }



            setBoard(newBoard);
            setSelectedPiece(null);
            setPrevPosition(null);
        } 
        else {
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
        </div>
    );
}

export default Chessboard;
