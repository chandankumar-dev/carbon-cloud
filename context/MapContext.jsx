import React, { createContext, useState } from "react";

const MapContext = createContext({
  map: null,
  directionsService: null,
  directionsRenderer: null,
  setMap: null,
  setDirectionsService: null,
  setDirectionsRenderer: null,
});

function MapProvider({ children }) {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  return (
    <MapContext.Provider
      value={{
        map: map,
        directionsService: directionsService,
        directionsRenderer: directionsRenderer,
        setMap: setMap,
        setDirectionsService: setDirectionsService,
        setDirectionsRenderer: setDirectionsRenderer,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapProvider };