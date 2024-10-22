import React, {useState, useEffect} from "react";
import './Timer.css'


const Timers = (props) => {
const [running, setRunning] = useState(false)
const [seconds , setSeconds] = useState(props.value || 0)

const runClick = () => {
    if (!running){
        setRunning(true);
    } else {
        setRunning(false);
    }
};

const resetClick = () => {
    setSeconds(0);
    setRunning(false)
};

useEffect (() => {
    let interval = null

    if (running) {
        interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);
    } else if (!running && seconds !== 0){
        clearInterval(interval)
    }
    return() => clearInterval(interval)},[running , seconds]);


const secondsToString = (seconds) => {
    console.log(seconds)
    const MINUTE_SECONDS = 60;
    const HOUR_SECONDS = 60 * MINUTE_SECONDS
    const DAY_SECONDS = 24 * HOUR_SECONDS

    const days = Math.floor(seconds / DAY_SECONDS)
    const hours = Math.floor((seconds % DAY_SECONDS) / HOUR_SECONDS)
    const minutes = Math.floor((seconds % HOUR_SECONDS) / MINUTE_SECONDS)
    const remainingSeconds = seconds % MINUTE_SECONDS
    console.log(days, hours, minutes, remainingSeconds)
    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`
    } else if (hours > 0) {
        return `${hours}h ${minutes}m ${remainingSeconds}s`
    } else if (minutes > 0){
        return `${minutes}m ${remainingSeconds}s`
    } else {
        return `${remainingSeconds}s`
    }
}


return (
    <>
    <div className="card">
        <h1 className="text-2xl badge justify-item-center h-10 m-2 p-3" >Timer</h1>
        <h2 className="text-2xl badge justify-item-center h-10 m-1 p-3">{secondsToString(seconds)}</h2>
        <div className="flex-auto">
            <button className={"btn m-2" + (running ? ' btn-warning' : ' btn-success')} onClick={runClick}>
                {running ? 'Stop' : 'Start'}
            </button>
            <button className="btn btn-error" onClick={resetClick}>Reset</button>
        </div>

    </div>
    </>
)
} 
export default Timers
