import React, { useEffect, useState } from "react";
import { InputField } from "../components/input/input.jsx";
import CommonButton from "../components/button/commonButton.jsx";
import { Image } from "../components/image/picture.jsx";
import clear from "../images/clear.png";
import humid from "../images/humidity.png";
import mist from "../images/mist.png";
import clouds from "../images/clouds.png";
import drizzle from "../images/drizzle.png";
import rain from "../images/rain.png";
import snow from "../images/snow.png";
import wind from "../images/wind.png";
import search from "../images/search.png";
import "./weather.css";
import ApiInfo from "../context/context.jsx";

export const Weather = ({}) => {
  const [value, setvalue] = useState("");
  const [weather, setWeatherData] = useState(null);
  const [Localdata, setlocaldata] = useState();
  const [image, setimage] = useState();
  const [localimage, setlocalimage] = useState();

  const imageRender = () => {
    if (Localdata) {
      let imagesource;
      const weatherdata = Localdata.weather[0].main.toLowerCase();
      switch (weatherdata) {
        case "clear":
          imagesource = clear;
          break;
        case "snow":
          imagesource = snow;
          break;
        case "mist":
          imagesource = mist;
          break;
        case "drizzle":
          imagesource = drizzle;
          break;
        case "rain":
          imagesource = rain;
          break;
        case "clouds":
          imagesource = clouds;
          break;
        default:
          imagesource = search; 
      }

      setimage(imagesource);
      localStorage.setItem("image", imagesource );
    }
  }
  
  useEffect(() => {
    imageRender();
  }, [weather]);

  const Handlesubmit = async () => {
    try {
      const weatherData = await ApiInfo(value);
      setWeatherData(weatherData);
      setlocaldata(weatherData);
      localStorage.setItem("weatherArrayData", JSON.stringify(weatherData));
    } catch (e) {
      console.warn(e.message);
    }
  }; 

  useEffect(() => {
    const dataFromLocal = JSON.parse(localStorage.getItem("weatherArrayData"));
    dataFromLocal ? setlocaldata(dataFromLocal) : Handlesubmit();
  }, []);

  useEffect(() => {
    const imageFromLocal = localStorage.getItem("image");
    setlocalimage(imageFromLocal);
  },[image])

  const getValue = (e) => {
    setvalue(e.target.value);
  };

  return (
    <div className="container">
      <div className="searchbar">
        <InputField
          _type="text"
          _placeholder="Search"
          _classname="search"
          _function={getValue}
        ></InputField>

        <CommonButton
          _type="submit"
          _function={Handlesubmit}
          _content="search"
        ></CommonButton>
      </div>

      {Localdata ? (
        <div key={Localdata.coord.id}>
          <div className="images">
            <img src={localimage} alt="clear" />
          </div>

          <div className="city">
            <h1>{Localdata.name}</h1>
            <h2>{`${Localdata.main.temp}°C`}</h2>
          </div>

          <div className="extra">
            <div className="othercontent">
              <Image _source={humid} _alt="logo" _classname="humid"></Image>
              <h1>
                humidity<span> {Localdata.main.humidity}</span>%
              </h1>
            </div>
            <div className="windspeed">
              <Image _source={wind} _alt="logo" _classname="wind"></Image>
              <h1>
                wind<span> {Localdata.wind.speed}</span>km/h
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};