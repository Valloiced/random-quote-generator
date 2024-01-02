import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/StartPage.css"

export default function StartPage({ domColor, setCategory, setIsStarted }) {

    // Items to randomize from
    const [ randomCategories, setRandomCategories ] = useState([
        "buildings",
        "nature",
        "animals",
        "happiness",
        "recreation",
        "city,night"
    ])

    const [ isButtonHovered, setIsButtonHovered ] = useState(false);

    const buttonRef = useRef();

    useEffect(() => {
        const randomizer = () => {       
            const randomIndex = Math.floor(Math.random() * randomCategories.length)
            setCategory(randomCategories[randomIndex])
        }

        const timer = setInterval(randomizer, 10000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const extractRGB = domColor.match(/\(.*\)/g);
        const rgb = extractRGB[0].slice(1, -1).split(',')
        const average = rgb.reduce((s, c) => s += (c * 1), 0) / 3;

        if(isButtonHovered) {
            buttonRef.current.style.backgroundColor = domColor;
            buttonRef.current.style.color = average > 120 ? "black" : "#fcfcfc";
        } else {
            buttonRef.current.style.backgroundColor = "transparent"
            buttonRef.current.style.color = domColor;
        }
    }, [ isButtonHovered ])

    const textColor = {
        color: domColor
    }

    const clickableColor = {
        color: domColor,
        border: `3px solid ${domColor}`
    }

    return (
        <div id="start-page">
            <div id="title">
                <h1>Random</h1>
                <h1 style={textColor}>Quote</h1>
                <h1>Generator</h1>
            </div>

            <p id="description">Generate thousands of random Quotes at only one click. All in all for every categories at your disposal.</p>

            <button 
                ref={buttonRef}
                id="generate" 
                style={clickableColor}
                onClick={() => setIsStarted(true)}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                >
                    Generate
            </button>
        </div>
    )
}