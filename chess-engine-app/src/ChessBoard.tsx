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

    const handleSquareClick = (rowIndex: number, columnIndex: number) => {
        if (selectedPiece) {

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
