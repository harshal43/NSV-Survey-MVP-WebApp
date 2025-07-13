import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";


const containerStyle = {
  width: "100%",
  height: "400px",
};

const LiveMap = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAM0D9JCiLGTFWkOFHVrjmrz_SJcnOa7vo',
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
      <Marker position={location} />
    </GoogleMap>
  );
};

export default React.memo(LiveMap);
