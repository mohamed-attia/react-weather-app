import React, { Component } from "react";
import "./App.css";
import WeatherComponent from "./components/Weather";
import FormComponent from "./components/Form";
const API_KEY = "b71518988b478c02e5ed1117ae7af575";
class App extends Component {
  state = {
    tempreature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: ""
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    console.log(city, country);
    const api = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
    );
    const data = await api.json();
    if (city && country) {
      this.setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        tempreature: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: "please enter data"
      });
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="form-container">
          <FormComponent getWeather={this.getWeather} />
          <WeatherComponent
            tempreature={this.state.tempreature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}

export default App;
