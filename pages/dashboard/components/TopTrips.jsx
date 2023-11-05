import Route from "../../../model/Route";
import MapRoute from "./MapRoute";

function TopTrips({ selectedRoute, routes, setSelectedRoute }) {
    return (
        <>
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-3xl md:text-3xl mb-5 font-semibold leading-tight">
                    Your Biggest Three Trips
                </div>
            </div>
            <div className="flex flex-col px-10 gap-5">
                {routes.map((route) => (
                    <MapRoute
                        route={route}
                        setSelectedRoute={setSelectedRoute}
                        selected={route == selectedRoute}
                        key={route.startTimestamp}
                    />
                ))}
            </div>
        </>
    );
}

export default TopTrips
