import React from 'react';
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

    return (
        <div className="chessboard-container">
            <div className="chessboard">
                {
                    initialBoardSetup.map((column, columnIndex) => (
                        <div className="chessboard-row" key={columnIndex}>
                            {
                                column.map((piece, rowIndex) => {
                                    const isDark = (rowIndex + columnIndex) % 2 === 1;
                                    const squareClass = isDark ? 'square dark' : 'square light';
                                    return (
                                        <div className={squareClass} key={columnIndex}>
                                            {piece && <div className={`piece ${piece}`}></div>}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Chessboard;
