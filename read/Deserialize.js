const { Location } = require("../model/Location.js");
const { Route } = require("../model/Route.js");
const { Activity } = require("../model/Activity.js");
const { getMostProbableActivity } = require("../utils/utils.js");

class Deserialize {
    static deserializeLocationRecords(rawData) {
        const recordsJson = JSON.parse(rawData);
        const locations = recordsJson.locations;

        const locationArr = [];

        for (const location of locations) {
            const latitudeE7 = location.latitudeE7;
            const longitudeE7 = location.longitudeE7;

            if (latitudeE7 && longitudeE7) {
                const latitude = latitudeE7 / 10000000;
                const longitude = longitudeE7 / 10000000;

                locationArr.push(new Location(latitude, longitude));
            }
        }
        return locationArr;
    }

    static deserializeRouteRecords(rawData) {
        const routesJson = JSON.parse(rawData);
        const timelineObjects = routesJson.timelineObjects;

        const routeArr = [];

        for (const timeline of timelineObjects) {
            if ("activitySegment" in timeline) {
                const activitySegment = timeline.activitySegment;
                const startLocation = activitySegment.startLocation;
                const endLocation = activitySegment.endLocation;

                const route = new Route(
                    new Location(
                        startLocation.latitudeE7 / 10000000,
                        startLocation.longitudeE7 / 10000000
                    ),
                    new Location(
                        endLocation.latitudeE7 / 10000000,
                        endLocation.longitudeE7 / 10000000
                    ),
                    Date.parse(activitySegment.duration.startTimestamp),
                    Date.parse(activitySegment.duration.endTimestamp),
                    activitySegment.distance,
                    activitySegment.activities.map(activity =>
                        new Activity(activity.activityType, activity.probability)
                    )
                );
                const mostProbableActivity = getMostProbableActivity(route);

                if (
                    mostProbableActivity !== "IN_VEHICLE" &&
                    mostProbableActivity !== "IN_PASSENGER_VEHICLE" &&
                    mostProbableActivity !== "WALKING" &&
                    mostProbableActivity !== "RUNNING" &&
                    mostProbableActivity !== "CYCLING" &&
                    mostProbableActivity !== "IN_BUS" &&
                    mostProbableActivity !== "IN_TRAIN" &&
                    mostProbableActivity !== "IN_SUBWAY"
                ) {
                    continue;
                }

                routeArr.push(route);
            }
        }

        return routeArr;
    }
}

module.exports = { Deserialize };
