"use client";
import { useEffect, useState } from "react";
import Gamecard from "../components/Gamecard";
import { useRouter, useSearchParams } from "next/navigation";

export default function Game() {
    const [connected, setConnected] = useState('Disconnected');
    const [message, setMessage] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const params = useSearchParams();
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [gamestate, setGamestate] = useState(['click', 'click', 'click', 'click', 'click', 'click', 'click', 'click', 'click']);
    const bool: any = params.get('bool') === 'true';
    const [currentPlayer, setCurrentPlayer] = useState(bool ? 'X' : 'O');
    const roomID: string | null = params.get('roomID');
    const router = useRouter();
    async function checkWin() {
        // Win conditions for Tic-Tac-Toe
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (gamestate[a] !== 'click' && gamestate[a] === gamestate[b] && gamestate[b] === gamestate[c]) {
                alert(`${gamestate[a]} won the Game`);
                setGameOver(true);
                return;
            }
        }

        // Check for a draw
        if (!gamestate.includes('click')) {
            alert("It's a draw!");
            setGameOver(true);
        }
    }

    function makeMove(index: number) {
        const newState = [...gamestate];
        if (newState[index] === 'click') {
            newState[index] = currentPlayer; // Set the current player's mark
            sendMessage({
                action: 'move',
                roomID: roomID,
                gameState: newState,
                nextPlayer: currentPlayer === 'X' ? 'O' : 'X', // Send the next player
            });
    
            // Switch the current player
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    }

    function sendMessage(data: any) {
        if (socket) {
            socket.send(JSON.stringify(data));
        }
    }
    useEffect(() => {
        checkWin();
    }, [gamestate]);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080');

        newSocket.onopen = () => {
            console.log('Connection established');
            setConnected('connected');

            // Join the room
            if (roomID) {
                sendMessage({
                    action: 'join',
                    roomID: roomID
                });
            }
        };

        newSocket.onmessage = (message) => {
            try {
                const parsedData = JSON.parse(message.data);

                // Check if the server has sent a game state update
                if (parsedData.action === 'update' && Array.isArray(parsedData.gameState)) {
                    setGamestate(parsedData.gameState);
                }
            } catch (error) {
                console.log('Received non-JSON message:', message.data);
                setMessage(message.data);
            }
        };

        newSocket.onclose = () => {
            alert("Connection closed!!");
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [roomID]);

    return (
        <div>
            {connected === 'connected' ? (
                <p className="text-green-500">Connected</p>
            ) : (
                <p className="text-red-500">Disconnected</p>
            )}
            <div>
                {gameOver &&
                    <div className="flex justify-between px-8">
                        {/* Reset Button */}
                        <div
                            onClick={() => {
                                setGamestate(['click', 'click', 'click', 'click', 'click', 'click', 'click', 'click', 'click']);

                                // Send reset message to the server via WebSocket
                                if (socket && socket.readyState === WebSocket.OPEN) {
                                    socket.send(JSON.stringify({ action: 'reset' }));
                                }
                            }}
                            className="px-2 font-serif rounded text-white border-[1px] cursor-pointer hover:text-black hover:bg-white bg-black p-2"
                        >
                            <p>reset</p>
                        </div>

                        {/* Exit Button */}
                        <div
                            onClick={() => {
                                // Send exit message to the server via WebSocket
                                if (socket && socket.readyState === WebSocket.OPEN) {
                                    socket.send(JSON.stringify({ action: 'exit' }));
                                }

                                // Navigate back to the main screen
                                router.push('/');
                                alert(`${bool?'X':'O'} left the game`);
                            }}
                            className="px-2 font-serif rounded text-white border-[1px] cursor-pointer hover:text-black hover:bg-white bg-black p-2"
                        >
                            <p>exit</p>
                        </div>
                    </div>

                }
            </div>

            <div className="flex justify-center items-center h-screen">
                <div>
                    <Gamecard cb={makeMove} state={gamestate} />
                </div>
            </div>
        </div>
    );
}
