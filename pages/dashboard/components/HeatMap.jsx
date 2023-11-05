import { useEffect, useContext } from "react";
import GoogleMapReact from "google-map-react";
import { MapContext } from "../../../context/MapContext";
import Route from "../../../model/Route";

const mapApiKey = "AIzaSyBL1xP5iEVz7h8yYSDTrNhSB85e2AWvx8k";

function parseData(compositeData) {
    const resData = {
        positions: [],
        options: { radius: 20, opacity: 1 },
    };

    for (const loc of compositeData.locations) {
        resData.positions.push({
            lat: loc.latitude,
            lng: loc.longitude,
            weight: 10,
        });
    }

    return resData;
}

function Heatmap(props) {
    const {
        directionsRenderer,
        directionsService,
        setDirectionsRenderer,
        setDirectionsService,
        setMap,
    } = useContext(MapContext);

    const apiIsLoaded = (map) => {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        if (setMap) {
            setMap(map);
        }

        if (setDirectionsService) {
            setDirectionsService(directionsService);
        }

        if (setDirectionsRenderer) {
            setDirectionsRenderer(directionsRenderer);
        }
    };

    useEffect(() => {
        if (directionsService && directionsRenderer) {
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
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [directionsRenderer, directionsService, props.selectedRoute]);

    // Return loading indicator if no data passed in yet
    if (!props.compositeData) {
        return <p>Some Error Displaying</p>;
    }

    // Continue with parsing data
    const heatmap = parseData(props.compositeData);
    const defaultProps = { center: heatmap.positions[0], zoom: 11 };

    return (
        <div className="h-110 w-[700px] shadow-xl">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: mapApiKey,
                    libraries: ["visualization"],
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                heatmap={heatmap}
                heatmapLibrary={true}
                onGoogleApiLoaded={({ map }) => apiIsLoaded(map)}
                yesIWantToUseGoogleMapApiInternals={true}
            ></GoogleMapReact>
        </div>
    );
}

export default Heatmap