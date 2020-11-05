import React, { useState } from 'react'
import './main.css'


const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: process.env.REACT_APP_ROOT_URL
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const handleChange = e => {
    setQuery(e.target.value)
  }

  const search = async e => {
    if(e.key === "Enter"){
      try {
        const res = await fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        const data = await res.json()
        setQuery('')
        setWeather(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <main className="bg-gray-200 min-h-screen">
      <div id="search-box" className="mx-auto max-w-xl h-10">
        <input className="w-full h-full pl-4 py-5 outline-none" type="text" placeholder="Search..." value={query} onChange={handleChange} onKeyPress={search}/>
      </div>
      <div>
        { weather.main &&
        <div> 
          <div className="card mt-40 mb-32">
            <span id="name" className="text-black text-2xl font-medium text-center mb-5">{weather.name}, {weather.sys.country}</span>
            <span id="temp" className="text-6xl font-lg text-center text-black mb-6">{Math.round(weather.main.temp)}<sup>o</sup>F</span>
            <span id="temp_min" className="text-xl text-black font-normal">Feels like: {Math.round(weather.main.feels_like)}<sup>o</sup>F</span>
          </div>

          <div className="mx-auto min-w-full flex">
            <div className="card">
              <img className="w-24 h-24" src="humidity.svg" alt=""/>
              <span className="text-xl font-bold">Humidity</span>
              <span className="mt-5 text-lg">{weather.main.humidity}%</span>
            </div>
            <div className="card">
              <img className="w-24 h-24" src="pressure.svg" alt=""/>
              <span className="text-xl font-bold">Pressure</span>
              <span className="mt-5 text-lg">{weather.main.pressure} PSI</span>
            </div>
            <div className="card">
              <img className="w-24 h-24" src="temperature.svg" alt=""/>
              <span className="text-xl font-bold">Max Temp</span>
              <span className="mt-5 text-lg">{Math.round(weather.main.temp_max)}<sup>o</sup>F</span>
            </div>
            <div className="card">
              <img className="w-24 h-24" src="temperature.svg" alt=""/>
              <span className="text-xl font-bold">Min Temp</span>
              <span className="mt-5 text-lg">{Math.round(weather.main.humidity)}<sup>o</sup>F</span>
            </div>
          </div>
        </div>
        }
      </div>
    </main>
  );
}

export default App;
