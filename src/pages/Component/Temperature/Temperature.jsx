import React from 'react'
import './Temperature.css'
import Variable from '../Variable/Variable'
import { useState } from 'react'

function Temperature({name}) {
    const [celsius , setCelsius] = useState(25)
    const [fahrenheit , setFahrenheit] = useState(77)
    const [kelvin , setKelvin] = useState(298.15)

    const convertFromCelsius = (newCelsius) => {
        setCelsius(newCelsius)
        setFahrenheit(newCelsius * 1.8 + 32)
        setKelvin(newCelsius + 273.15)
        
    }

    const convertFromFahrenheit = (newFahrenheit) => {
        setFahrenheit(newFahrenheit)
        setCelsius((newFahrenheit - 32) * 5 / 9)
        setKelvin((newFahrenheit - 32) * 5 / 9 + 273.15)
    }

    

    const convertFromKelvin = (newKelvin) => {
        setKelvin(newKelvin)
        setCelsius(newKelvin - 273.15)
        setFahrenheit((newKelvin - 273.15) * 1.8 + 32)
    }
  
    // const updateCelsius = (newCelsius) => {
    //     convertFromCelsius(newCelsius)
    // }

    // const updateFahrenheit = (newFahrenheit) => {
    //     convertFromFahrenheit(newFahrenheit)
    // }

    // const updateKelvin = (newKelvin) => {
    //     convertFromKelvin(newKelvin)
    // }

  return (
    <div className='temperature-container'>
      <h3 className='text-3xl badge h-10 w-60 m-2'>{name || 'TEMPERATURE'}</h3>
      <h3 className='d-flex justify-content-around'>
        <span className='text-2xl badge h-10 m-2'>{celsius.toFixed(2)}°C</span> 
        <span className='text-2xl badge h-10 m-2'>{fahrenheit.toFixed(2)}°F</span> 
        <span className='text-2xl badge h-10 m-2'>{kelvin.toFixed(2)}°K</span>
        </h3>
      <div className='temperature-variables d-flex justify-content-around'>
        <Variable name={'Celsius'} value={celsius} setValue={convertFromCelsius}/>
        <Variable name={'Fahrenheit'} value={fahrenheit} setValue={convertFromFahrenheit}/>
        <Variable  name={'Kelvin'} value={kelvin} setValue={convertFromKelvin}/>
      </div>
    </div>
  )
}
export default Temperature
