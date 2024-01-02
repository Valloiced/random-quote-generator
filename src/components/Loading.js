import React, { useEffect, useState } from 'react';
import '../assets/styles/Loading.css'

export default function Loading() {

    const [ dot, setDot ] = useState("")

    useEffect(() => {
        const loading = () => {
            setDot(prevDot => prevDot.length == 4 ? "" : prevDot + ".")
        }

        const timer = setInterval(loading, 1000)

        return () => timer
    }, [])

    return (
        <div id="loading-screen">
            <span id="loading-icon"></span>
            <h1>Loading Quote{dot}</h1>
        </div>
    )
}