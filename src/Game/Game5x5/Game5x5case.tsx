import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


function Game5x5case() {
    const location = useLocation();
    const mode = location.state?.mode || 'Normal';


    const [board, setBoard] = useState(Array(25).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const winner = calculateWinner(board);

    const handleClick = (index) => {
        if (board[index] || winner || !isXNext) return;

        const newBoard = board.slice();
        newBoard[index] = "X";
        setBoard(newBoard);
        setIsXNext(false);
    };



    useEffect(() => {
        if (!isXNext && !winner) {
            // Chỉ gọi AI khi lượt của nó
            const bestMove = minimax(board, "O", -Infinity, Infinity);
            const newBoard = board.slice();
            newBoard[bestMove.index] = "O";
            setBoard(newBoard);
            setIsXNext(true);
        }

        if (winner) {
            if (winner === "X") {
                setScoreX(scoreX + 1);
            } else if (winner === "O") {
                setScoreO(scoreO + 1);
            }
            // Reset board after a winner is found
            setTimeout(resetGame, 1500);
        }
    }, [isXNext, board, winner]);

    const minimax = (board, player, alpha, beta, depth = 0, maxDepth = 4) => {
        const availableMoves = getAvailableMoves(board);

        if (depth >= maxDepth) {
            return { score: 0 };
        }

        const blockingMove = findBlockingMove(board, player === "O" ? "X" : "O");
        if (blockingMove !== null) {
            return { index: blockingMove, score: 0 }; // Chặn đối thủ
        }

        const winner = calculateWinner(board);
        if (winner) {
            return { score: winner === "O" ? 10 - depth : depth - 10 };
        }

        if (availableMoves.length === 0) {
            return { score: 0 }; // Hòa
        }

        let bestMove = null;
        let bestScore = player === "O" ? -Infinity : Infinity;

        for (let index of availableMoves) {
            const newBoard = board.slice();
            newBoard[index] = player;

            const moveScore = minimax(newBoard, player === "O" ? "X" : "O", alpha, beta, depth + 1).score;

            if (player === "O") {
                if (moveScore > bestScore) {
                    bestScore = moveScore;
                    bestMove = { index, score: bestScore };
                }
                alpha = Math.max(alpha, bestScore);
            } else {
                if (moveScore < bestScore) {
                    bestScore = moveScore;
                    bestMove = { index, score: bestScore };
                }
                beta = Math.min(beta, bestScore);
            }

            if (beta <= alpha) break; // Alpha-Beta Pruning
        }

        return bestMove;
    };




    const findBlockingMove = (board, opponent) => {
        const lines = [
            [0, 1, 2, 3], [1, 2, 3, 4],
            [5, 6, 7, 8], [6, 7, 8, 9],
            [10, 11, 12, 13], [11, 12, 13, 14],
            [15, 16, 17, 18], [16, 17, 18, 19],
            [20, 21, 22, 23], [21, 22, 23, 24],
            [0, 5, 10, 15], [5, 10, 15, 20],
            [1, 6, 11, 16], [6, 11, 16, 21],
            [2, 7, 12, 17], [7, 12, 17, 22],
            [3, 8, 13, 18], [8, 13, 18, 23],
            [4, 9, 14, 19], [9, 14, 19, 24],
            [0, 6, 12, 18], [6, 12, 18, 24],
            [1, 7, 13, 19], [5, 11, 17, 23],
            [3, 7, 11, 15], [4, 8, 12, 16],
            [8, 12, 16, 20], [9, 13, 17, 21],
        ];

        for (let line of lines) {
            let emptyIndex = -1;
            let opponentCount = 0;

            for (let index of line) {
                if (board[index] === opponent) opponentCount++;
                else if (board[index] === null) emptyIndex = index;
            }

            // Chặn nếu đối thủ có 3 ô liên tiếp và còn 1 ô trống
            if (opponentCount === 3 && emptyIndex !== -1) {
                return emptyIndex;
            }
        }
        return null;
    };




    const getAvailableMoves = (board) => {
        return board
            .map((val, index) => val === null ? index : null)
            .filter(index => index !== null);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const renderSquare = (index) => (
        <button
            key={index}
            className={`square w-[100px] h-[100px] flex items-center justify-center border-2 border-solid border-black bg-white`}
            onClick={() => handleClick(index)}
        >
            {board[index] === "X" ? (
                <span className="text-red-500 text-6xl">{board[index]}</span>
            ) : board[index] === "O" ? (
                <span className="text-blue-500 text-6xl">{board[index]}</span>
            ) : null}
        </button>
    );

    function calculateWinner(board) {
        const lines = [
            // Hàng ngang
            [0, 1, 2, 3], [1, 2, 3, 4],
            [5, 6, 7, 8], [6, 7, 8, 9],
            [10, 11, 12, 13], [11, 12, 13, 14],
            [15, 16, 17, 18], [16, 17, 18, 19],
            [20, 21, 22, 23], [21, 22, 23, 24],
            // Hàng dọc
            [0, 5, 10, 15], [5, 10, 15, 20],
            [1, 6, 11, 16], [6, 11, 16, 21],
            [2, 7, 12, 17], [7, 12, 17, 22],
            [3, 8, 13, 18], [8, 13, 18, 23],
            [4, 9, 14, 19], [9, 14, 19, 24],
            // Đường chéo từ trái sang phải
            [0, 6, 12, 18], [6, 12, 18, 24],
            [1, 7, 13, 19], [5, 11, 17, 23],
            // Đường chéo từ phải sang trái
            [3, 7, 11, 15], [4, 8, 12, 16],
            [8, 12, 16, 20], [9, 13, 17, 21],
        ];

        for (let line of lines) {
            const [a, b, c, d] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
                return board[a];
            }
        }
        return null;
    }


    return (
        <div className="game">
            <div className=" flex justify-center gap-[10%] w-full py-2 bg-[#ffff]">
                <h1 className="text-[30px]">Player 1</h1>
                <div className=" text-[30px]">
                    <span>{scoreX}</span>
                    <span>:</span>
                    <span>{scoreO}</span>
                </div>
                <h1 className="text-[30px]">AI Player - {mode}</h1>
            </div>
            <div className="flex flex-col items-center h-[85vh] justify-center">
                <div className="board grid grid-cols-[repeat(5,100px)] text-3xl mt-5">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((i) => renderSquare(i))}
                </div>
                <div className="status text-xl mt-5 text-black">
                    {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
                </div>
                <button
                    className="reset text-base bg-red-500 rounded-lg cursor-pointer mt-2.5 px-2.5 py-[5px] text-white"
                    onClick={resetGame}
                >
                    Restart Game
                </button>
            </div>
            <div className="ml-[2rem] mt-[5rem]]">
                <Link to="/" className="w-[300px] border p-2 h-[50px] text-[20px] bg-black text-white">Leave Room</Link>
            </div>
        </div>
    )
}

export default Game5x5case;