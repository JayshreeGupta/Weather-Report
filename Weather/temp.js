import React,{useState,useEffect} from 'react';
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  //to call real time api 
  const[searchValue, setSearchValue]= useState('Ranchi')
   //add the data(wind,speed,etc) into state variable

   const [tempInfo, setTempInfo]= useState({});
   const getWeatherInfo = async () => {
      try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=f1f54d4815a5e7697026c71fd0da924f`;
         

        const res=await fetch(url);
        const data=await res.json();
         //destructuring
        const {temp,humidity,pressure} =data.main;
        const { main: weathermood } = data.weather[0];
        const {name}=data;
        const{speed}=data.wind
        const{country,sunset,sunrise}=data.sys;
        
        //to pass data one by one for that create object

        const myNewWeatherInfo= {
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,sunset,
          sunrise,
       }
       setTempInfo(myNewWeatherInfo); //pass the object here
      
      
      
      } catch(error){
        console.log(error);
      }
   };

   useEffect(() =>{        //to get default weather of "Ranchi") 
    getWeatherInfo();
   },[]);


  return (
    <>
       <div className="wrap">
        <div className="search">
          <input type="search"
          placeholder="search..."
          autoFocus
          id='search'
          className="searchTerm"
          value={searchValue}         //what user is typing to get the data and store in searchValue.
          onChange={(event) => setSearchValue(event.target.value) }
          />
          <button className="searchButton" 
          type="button" onClick={getWeatherInfo}>Search</button>
        </div>
       </div>
       {/* our temp card */}
       {/* pass it as a prop */}
       <Weathercard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp

// {"coord":{"lon":73.8553,"lat":18.5196},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":300.45,"feels_like":302.14,"temp_min":300.45,"temp_max":300.45,"pressure":1012,"humidity":66,"sea_level":1012,"grnd_level":951},"visibility":10000,"wind":{"speed":4.01,"deg":262,"gust":5.77},"clouds":{"all":87},"dt":1691730554,"sys":{"type":2,"id":2083365,"country":"IN","sunrise":1691714705,"sunset":1691760888},"timezone":19800,"id":1259229,"name":"Pune","cod":200}