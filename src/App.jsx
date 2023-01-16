import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useRef } from 'react'

function App() {
const cityname= useRef(0)
async function handleOnClick(){
let city=cityname.current.value
console.log(city)
let res=await fetch("https://api.geoapify.com/v1/geocode/search?text=Delhi&apiKey=eb6b879b39014c70bac4446958481ceb")
let data=await res.json()
let lon=data.features[0]?.bbox[0]
let lat=data.features[0]?.bbox[1]
console.log(lon,lat)
let obj={lon,lat,prefferedcity:city}
getweatherdata(obj)
}
async function getweatherdata(obj){
  let res=await fetch("http://localhost:8000/weather/city",{
    method:"POST",
    body:JSON.stringify(obj),
    headers:{
      "Content-Type":"application/json"
    }

  })
  let data=await res.json()
 console.log(data)
  

}


  return (
    <div className="App">
     <input ref={cityname} type="text" />
     <button onClick={handleOnClick} >  Get Weather</button>
    </div>
  )
}

export default App
