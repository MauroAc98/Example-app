/* eslint-disable no-unused-vars */


import React, { useState } from "react";
import './styles.css';

const ItemCount = () => {
    const [counter, setCounter] = useState(0);
    const isValidCounter = counter > 0;

    const incrementCounter = () => {
        setCounter((prevCounter) => prevCounter + 1)
    }

    const decrementCounter = () => {
        if (!isValidCounter) return;
        setCounter((prevCounter) => prevCounter - 1);
    }

    return (
        <div className="container">
            <div className="text">Counter</div>
            <div className="containerButton">
                <div className="counterButton" onClick={decrementCounter} disabled={!isValidCounter}>-</div>
                <h2 className="counterText">{counter}</h2>
                <div className="counterButton" onClick={incrementCounter}>+</div>
            </div>
        </div>
    )
}

export default ItemCount;