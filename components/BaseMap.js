import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { mapApiKey } from "../constant";

export default function BaseMap(props) {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  const apiIsLoaded = (map) => {
    console.log("API LOADED");
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    console.log("DIRECTIONS  LOADED");
    directionsRenderer.setMap(map);
    setMap(map);

    setDirectionsService(directionsService);

    setDirectionsRenderer(directionsRenderer);
  };

  useEffect(() => {
    if (directionsService && directionsRenderer) {
      console.log("RENDERING");
      const origin = {
        lat: props.selectedRoute?.start.latitude ?? 0,
        lng: props.selectedRoute?.start.longitude ?? 0,
      };
      const destination = {
        lat: props.selectedRoute?.end.latitude ?? 0,
        lng: props.selectedRoute?.end.longitude ?? 0,
      };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          directionsRenderer.setDirections({
            routes: [],
            geocoded_waypoints: [],
          });
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            console.log("rendering route");
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [map, directionsRenderer, directionsService, props.selectedRoute]);

  // Return empty div if no data passed in yet
  if (!props.selectedRoute) return <div>loading</div>;
  return (
    <div className="h-96 w-[450px] shadow-xl">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: mapApiKey,
          libraries: ["visualization"],
        }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={11}
        onGoogleApiLoaded={({ map }) => apiIsLoaded(map)}
        yesIWantToUseGoogleMapApiInternals={true}
      />
    </div>
  );
}
