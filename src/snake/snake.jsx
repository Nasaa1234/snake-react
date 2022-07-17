import { useEffect, useState } from "react";
import Box from "./box";
import '../index.css'
import GameOver from "./gameOver";

function Snake() {
    const [gamestate, setGamestate] = useState({
        headX: 2,
        headY: 6,
        snakeBody: [
            [2, 7]
        ],
        snakeDirection: "",
        AppleX: 3,
        AppleY: 2
    });

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [change, setChange] = useState(false)

    const handleEventListenr = (e) => {
        if (e.key === "w" || e.key === 'ArrowUp') {
            gamestate.snakeDirection = "up"
        }

        if (e.key === "a" || e.key === 'ArrowLeft') {
            gamestate.snakeDirection = "left"
        }
        if (e.key === "d" || e.key === 'ArrowRight') {
            gamestate.snakeDirection = "right"
        }
        if (e.key === "s" || e.key === 'ArrowDown') {
            gamestate.snakeDirection = "down"
        }
    }
    useEffect(() => {
        document.addEventListener('keyup', handleEventListenr);
        return () => document.removeEventListener('keyup', handleEventListenr)
    }, [])

    const moveSnake = () => {
        if (gamestate.snakeDirection === "left") {
            gamestate.snakeBody.unshift([gamestate.headX, gamestate.headY]);
            if (gamestate.headY === 0) {
                gamestate.headY = 9
            } else {
                gamestate.headY -= 1;
            }
            gamestate.snakeBody.pop();

        }
        if (gamestate.snakeDirection === "right") {
            gamestate.snakeBody.unshift([gamestate.headX, gamestate.headY]);
            if (gamestate.headY === 9) {
                gamestate.headY = 0
            } else {
                gamestate.headY += 1;
            }
            gamestate.snakeBody.pop();
        }
        if (gamestate.snakeDirection === "up") {
            gamestate.snakeBody.unshift([gamestate.headX, gamestate.headY]);
            if (gamestate.headX === 0) {
                gamestate.headX = 9
            } else {
                gamestate.headX -= 1;
            }
            gamestate.snakeBody.pop();
        }
        if (gamestate.snakeDirection === "down") {
            gamestate.snakeBody.unshift([gamestate.headX, gamestate.headY]);
            if (gamestate.headX === 9) {
                gamestate.headX = 0
            } else {
                gamestate.headX += 1;
            }
            gamestate.snakeBody.pop();
        }


        if (gamestate.headX === gamestate.AppleX && gamestate.headY === gamestate.AppleY) {
            gamestate.AppleX = getRandomInt(1, 9);
            gamestate.AppleY = getRandomInt(1, 9);
            gamestate.snakeBody.push([gamestate.snakeBody[gamestate.snakeBody.length - 1][0], gamestate.snakeBody[gamestate.snakeBody.length - 1][1]])
        }
        for (let i = 0; i < gamestate.snakeBody.length; i++) {
            if (gamestate.headX === gamestate.snakeBody[i][0] && gamestate.headY === gamestate.snakeBody[i][1]) {
                setChange(true)
                console.log('the end')
            }
        }

        setGamestate({ ...gamestate })
    };

    useEffect(() => {
        let interval = setInterval(() => {

            moveSnake();
        }, 100);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="column">
            {
                change ? <GameOver /> : <div>{Array(10)
                    .fill(0)
                    .map((e, i) => {
                        return (
                            <div key={i} style={{ display: 'flex' }}>
                                {Array(10)
                                    .fill(0)
                                    .map((a, j) => {
                                        return (
                                            <>
                                                <Box
                                                    key={j}
                                                    isSnake={gamestate.headX === i && gamestate.headY === j}
                                                    isBody={
                                                        gamestate.snakeBody.filter(
                                                            (body) => body[0] === i && body[1] === j
                                                        ).length
                                                    }
                                                    isApple={gamestate.AppleX === i && gamestate.AppleY === j}
                                                />
                                            </>
                                        );
                                    })}
                            </div>
                        );
                    })}
                </div>
            }

        </div>
    );
}

export default Snake;