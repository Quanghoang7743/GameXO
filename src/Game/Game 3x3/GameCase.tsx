import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


function GameCase() {
    const location = useLocation();
    const mode = location.state?.mode || 'Normal';
    const [board, setBoard] = useState(Array(9).fill(null));
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
            // AI plays using Minimax with Alpha-Beta Pruning
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

    const minimax = (board, player, alpha, beta) => {
        const availableMoves = getAvailableMoves(board);

        // Nếu đối thủ có thể thắng, ưu tiên chặn lại
        const blockingMove = findBlockingMove(board, player === "O" ? "X" : "O");
        if (blockingMove !== null) {
            return { index: blockingMove, score: 0 };  // Chặn ngay
        }

        if (calculateWinner(board)) {
            return { score: player === "O" ? 1 : -1 };
        }

        if (availableMoves.length === 0) {
            return { score: 0 };  // Draw
        }

        let bestMove = null;
        let bestScore = player === "O" ? -Infinity : Infinity;

        for (let i = 0; i < availableMoves.length; i++) {
            const index = availableMoves[i];
            const newBoard = board.slice();
            newBoard[index] = player;
            const moveScore = minimax(newBoard, player === "O" ? "X" : "O", alpha, beta).score;

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

            if (beta <= alpha) {
                break;
            }
        }

        return bestMove;
    };


    const findBlockingMove = (board, opponent) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let line of lines) {
            let emptyIndex = -1;
            let opponentCount = 0;
            let playerCount = 0;

            for (let index of line) {
                if (board[index] === opponent) opponentCount++;
                else if (board[index] === null) emptyIndex = index;
                else if (board[index] !== opponent && board[index] !== null) playerCount++;
            }

            // Nếu đối thủ có 2 ô và có một ô trống, đây là cơ hội để chặn
            if (opponentCount === 2 && emptyIndex !== -1 && playerCount === 0) {
                return emptyIndex; // Trả về vị trí cần chặn
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
            className={`square w-[200px] h-[200px] flex items-center justify-center border-2 border-solid border-black `}
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
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
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
                <div className="board grid grid-cols-[repeat(3,200px)] text-3xl mt-5">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => renderSquare(i))}
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
    );
}

export default GameCase;