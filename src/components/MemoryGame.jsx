import React, { use, useEffect, useState } from 'react'
import './MemoryGame.css'

const MemoryGame = () => {
    const generateCards = () => {
        return [
            { id: 1, value: '1', isFlipped: false, stat: "?" },
            { id: 2, value: '1', isFlipped: false, stat: "?" },
            { id: 3, value: '2', isFlipped: false, stat: "?" },
            { id: 4, value: '2', isFlipped: false, stat: "?" },
            { id: 5, value: '3', isFlipped: false, stat: "?" },
            { id: 6, value: '3', isFlipped: false, stat: "?" },
            { id: 7, value: '4', isFlipped: false, stat: "?" },
            { id: 8, value: '4', isFlipped: false, stat: "?" },
            { id: 9, value: '5', isFlipped: false, stat: "?" },
            { id: 10, value: '5', isFlipped: false, stat: "?" },
            { id: 11, value: '6', isFlipped: false, stat: "?" },
            { id: 12, value: '6', isFlipped: false, stat: "?" },
            { id: 13, value: '7', isFlipped: false, stat: "?" },
            { id: 14, value: '7', isFlipped: false, stat: "?" },
            { id: 15, value: '8', isFlipped: false, stat: "?" },
            { id: 16, value: '8', isFlipped: false, stat: "?" },
        ].sort(() => Math.random() - 0.5);
    }
    const [items, setItems] = useState(generateCards());
    useEffect(() => {
        console.log(items);
    }, [items]);
    const [prev, setPrev] = useState(-1);
    const [time, setTime] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        const savedScore = localStorage.getItem('bestScore');
        return savedScore ? parseInt(savedScore) : 0;

    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (items.every(item => item.stat === "correct")) {
            if (bestScore === 0 || time < bestScore) {
                setBestScore(time);
                localStorage.setItem('bestScore', time.toString());
            }
            alert(`Congratulations! You completed the game in ${time} seconds.`);
            restartGame();
        }
    }, [items]);

    const check = (current) => {

        if (items[current].value === items[prev].value) {
            let newItems = [...items];
            newItems[current].stat = "correct";
            newItems[prev].stat = "correct";
            setItems(newItems);
            setPrev(-1);


        } else {
            let newItems = [...items];
            newItems[current].stat = "wrong";
            newItems[prev].stat = "wrong";
            setItems(newItems);
            setTimeout(() => {
                newItems[current].isFlipped = false;
                newItems[current].stat = "?";
                newItems[prev].isFlipped = false;
                newItems[prev].stat = "?";
                setItems(newItems);
                setPrev(-1);
            }, 1000);
        }
    }

    const restartGame = () => {
        setItems(generateCards());
        setTime(0);
        setPrev(-1);
        setDisabled(false);
    }

    const handleClick = (id) => {
        if (prev === -1) {
            let newItems = [...items];
            newItems[id].isFlipped = true;
            setItems(newItems);
            setPrev(id);
        } else {
            let newItems = [...items];
            newItems[id].isFlipped = true;
            setItems(newItems);
            check(id);
        }
    }


    return (
        <div className="container">
            <h1>Memory Game</h1>
            <div className='time'>
                <span>Time: {time}</span>
                <span>Best Score: {bestScore}</span>
            </div>
            <div className="card-grid">
                {items.map((item, index) => (
                    <div className={`card ${item.isFlipped ? 'flipped' : ''} ${item.stat === "correct" ? 'correct' : ''} ${item.stat === "wrong" ? 'wrong' : ''}`} key={index} onClick={() => handleClick(index)}>
                        {item.isFlipped ? item.value : "?"}
                    </div>
                ))}
            </div>
            <button onClick={restartGame}>Restart Game</button>
        </div>



    )
}

export default MemoryGame