import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import carIcon from "../assets/icon/car.png";
import carIconThreeD from "../assets/icon/3d-car.png";

const containerStyle = {
  width: "100%",
  height: "370px",
};

const LiveMap = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} 
    center={location} 
    zoom={13}
    options={{
        zoomControl: true,
      }}
    >
      
      <Marker
        position={location}
        icon={{
          url: carIcon, // local icon path
          scaledSize: new window.google.maps.Size(50, 50),
          anchor: new window.google.maps.Point(10, 10),
        }}
      />
    </GoogleMap>
  );
};

export default React.memo(LiveMap);
