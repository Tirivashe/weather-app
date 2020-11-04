import React, { useState } from 'react'
import './main.css'

const api = {
  key: "b383e373af923670e442c93ab11fbb25",
  base: "https://api.openweathermap.org/data/2.5/"
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
        const res = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        const data = await res.json()
        setQuery('')
        setWeather(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="">
      <main className="">
        <div id="search-box" className="">
          <input type="text" placeholder="Search..." value={query} onChange={handleChange} onKeyPress={search}/>
        </div>
        <div>
          { typeof weather.main !== "undefined" && 
            <div>
              <div>
                {}
              </div>

            </div>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
