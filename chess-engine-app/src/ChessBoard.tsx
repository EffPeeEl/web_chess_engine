import React from 'react';
import './Chessboard.css';


const Chessboard : React.FC = () => {

    const rows = Array(8).fill(null);  // An array with 8 elements to represent 8 rows
    const cols = Array(8).fill(null);
    return (
      <div className="chessboard">
        {
            rows.map((row, rowIndex) => (
                <div className="chessboard-row" key={rowIndex}>
                    {
                        cols.map((col, colIndex) => (
                            <div className={((rowIndex + colIndex) % 2 === 0 ? 'white' : 'black')+'-cell'} key={colIndex}>
                                
                            </div>

                        )
                    )
                    }
                </div>

            )
            )}
      </div>


    );
}


export default Chessboard;