import React, { useEffect, useState } from "react";

import styles from "./App.module.css";
import OverView from "./OverView";

// url to a valid topojson file

const App = () => {

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("")
  const [title, setTitle] = useState("")
  const [uploaded, setUploaded] = useState(false)
  const [showOverView, setShowOverView] = useState(false)
  const [context, setContext] = useState("")

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    } else {
      console.log("Not Available");
    }
  }, [])

  const titles = ["Fire", "Flood", "Violence", "Protest", "Sexual Assault", "Earthquake", "Tornado", "Loud Noise", "Covid", "Cyber attack", "Electrical surge", "Pests", "Pollution", "Traffic", "Accident"];

  const uploadOverView = () => {
    const url = "http://127.0.0.1:8000/api/save";
    const data = {
      lat: lat.toString(),
      lon: lon.toString(),
      title: title,
      context: context
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(
        setUploaded(true)
      )
      .catch(err => console.log(err));
  }

  return (
    !showOverView ? (
      <div className={styles.container}>
        <div className={styles.containerInner}>
          <div className={styles.title}>OverView</div>

          <div className={styles.inputInner}>
            <input value={lon} className={styles.input} disabled type="text" placeholder="Longitude" />
          </div>
          <div className={styles.inputInner}>
            <input value={lat} className={styles.input} disabled type="text" placeholder="Latitude" />
          </div>
          <select className={styles.inputInner} name="title" id="title">
            {
              titles.map((title, index) => {
                return <option onClick={() => setTitle(title)} key={index} value={title}>{title}</option>
              })
            }
          </select>
          <div className={styles.inputInner}>
            <input onChange={(e) => setContext(e.target.value)} className={styles.input} type="text" placeholder="Context (Optional)" />
          </div>
          {
            uploaded ? <div className={styles.uploaded}>Uploaded successfully</div>
              :
              lat.length != "" && <div onClick={uploadOverView} className={styles.btnContainer}>
                Upload
              </div>
          }
          <div onClick={() => setShowOverView(true)} className={styles.overViewContainer}>
            Show OverView Map
          </div>

        </div>
      </div >
    )
      :
      <OverView />
  );
};

export default App;
