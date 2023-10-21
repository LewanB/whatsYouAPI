import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "./App.css";

const api = `https://geo.ipify.org/api/v2/country?apiKeY0${process.env.REACT_APP_API_KEY}`;

function App() {
  const [ipAddress, setIpAddress] = useState(null);
  const position = [41.41814, 2.19933];

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setIpAddress(data.ip);
      })
      .catch((error) => {
        console.error("Error when calling IP-address:", error);
      });
  }, []);

  return (
    <>
      {ipAddress ? (
        <>
          <h2 id="root">Your IP address is {ipAddress}</h2>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "350px", width: "350px" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://%7Bs%7D.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                <img src="pic_trulli.jpg" alt="Italian Trulli" />
              </Popup>
            </Marker>
          </MapContainer>
        </>
      ) : (
        <p>Loading IP address...</p>
      )}
    </>
  );
}

export default App;
