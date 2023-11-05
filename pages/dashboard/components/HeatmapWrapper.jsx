'use client'
import { useState, useEffect } from "react";
import { flattenHierarchy, getCarbonForCar } from "../../../utils/utils.js";
import Heatmap from "./HeatMap";
import TopTrips from "./TopTrips";
import AltEmissions from "./AltEmissions";
import Suggestion from "./Suggestion.jsx";
import Loader from "../../../components/Loader.jsx";

function HeatmapWrapper({ compositeData }) {
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        if (compositeData) {
            const flattened = flattenHierarchy(compositeData.routes).sort(
                (a, b) => getCarbonForCar(b.distance) - getCarbonForCar(a.distance)
            );
            setRoutes(flattened);
            setSelectedRoute(flattened[0]);
        }
    }, [compositeData]);

    if (!compositeData) {
        <Loader />
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row justify-between pt-10">
                <Heatmap compositeData={compositeData} selectedRoute={selectedRoute} />
                <div className="text-lg ml-10 justify-start">
                    <TopTrips
                        setSelectedRoute={setSelectedRoute}
                        selectedRoute={selectedRoute}
                        routes={routes.slice(0, 3)}
                    />
                </div>
            </div>
            <div className="flex flex-col max-w-[1350px] gap-10 py-32">
                <Suggestion title="Taking the train instead..." transportType="IN_TRAIN">
                    <AltEmissions route={selectedRoute} transportType="IN_TRAIN" />
                    <p className="flex items-center font-medium text-2xl pr-4">
                        If you can, choose the train for a greener and stress-free commute,
                        reducing traffic congestion and helping the environment.
                    </p>
                </Suggestion>
                <Suggestion title="Taking the bus instead..." transportType="IN_BUS">
                    <AltEmissions route={selectedRoute} transportType="IN_BUS" />
                    <p className="flex items- center font-medium text-2xl pr-4">
                        Opt for the bus to save money, reduce your carbon footprint, and
                        ease traffic congestion on our roads.
                    </p>
                </Suggestion>
            </div>
        </div>
    );
}

export default HeatmapWrapper
