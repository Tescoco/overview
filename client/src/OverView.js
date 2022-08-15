import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import styles from "./App.module.css";

// url to a valid topojson file

const OverView = () => {
  const [locations, setLocations] = useState([]);

  const colorAllocator = (title) => {
    let color = ""
    switch (title) {
      case "Fire":
        color = "red";
        break;
      case "Flood":
        color = "green";
        break;
      case "Violence":
        color = "blue";
        break;
      case "Protest":
        color = "purple";
        break;
      case "Sexual Assault":
        color = "pink";
        break;
      case "Earthquake":
        color = "brown";
        break;
      case "Tornado":
        color = "grey";
        break;
      case "Loud Noise":
        color = "yellow";
        break;
      case "Covid":
        color = "orange";
        break;
      case "Cyber attack":
        color = "peach";
        break;
      case "Electrical surge":
        color = "gold";
        break;
      case "Pests":
        color = "violet";
        break;
      case "Pollution":
        color = "rust";
        break;
      case "Traffic":
        color = "maroon";
        break;
      case "Accident":
        color = "silver";
        break;
      default:
        color = "white"
        break;
    }
    return color;
  }

  useEffect(() => {
    let locations = [];

    fetch("http://127.0.0.1:8000/api/get-all").then((res) => { return res.json() }).then((data) => {
      data.forEach((location) => {
        locations.push({ lon: location.lon, lat: location.lat, color: colorAllocator(location.title) })
      });
      setLocations(locations);
    })

  }, []);

  return (
    <div>
      <div className={styles.colorCode}>
        red - Fire;
        green - Flood;
        blue - Violence;
        purple - Protest;
        pink - Sexual Assault;
        brown - Earthquake;
        grey - Tornado;
        yellow - Loud Noises;
        orange - Covid;
        peach - Cyber attack;
        gold - Electrical surge;
        violet - Pests;
        rust - Pollution;
        maroon - Traffic;
        silver - Accident;
      </div>
      <ComposableMap>
        <Geographies geography={"/features.json"}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {locations.map((location, index) => (
          <Marker key={index} coordinates={[location.lon, location.lat]}>
            <circle r={1} fill={location.color} />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default OverView;
