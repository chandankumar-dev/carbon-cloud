import { Route } from "../model/Route";
// import {
//     DirectionsCarOutlined,
//     DirectionsWalkOutlined,
//     DirectionsBusOutlined,
//     TrainOutlined,
//     QuestionMarkOutlined,
// } from "@mui/icons-material";

/**
 * Calculate the amount of carbon in kg wasted by taking this route
 */
export function calculateCarbonSaved(route) {
    let carbonSaved = 0;
    if (route.activities.length > 0) {
        const mostProbableActivity = getMostProbableActivity(route);
        if (
            mostProbableActivity === "IN_VEHICLE" ||
            mostProbableActivity === "IN_PASSENGER_VEHICLE"
        ) {
            carbonSaved = 0;
        } else if (
            mostProbableActivity === "WALKING" ||
            mostProbableActivity === "RUNNING" ||
            mostProbableActivity === "CYCLING"
        ) {
            carbonSaved = getCarbonForCar(route.distance);
        } else if (mostProbableActivity === "IN_BUS") {
            carbonSaved = getCarbonForCar(route.distance) * 0.25;
        } else if (
            mostProbableActivity === "IN_TRAIN" ||
            mostProbableActivity === "IN_SUBWAY"
        ) {
            carbonSaved = getCarbonForCar(route.distance) * 0.5;
        }
    }
    return carbonSaved;
}

export function getCarbonForCar(distance) {
    return (distance / 1000) * 0.192;
}

export function getMostProbableActivity(route) {
    let mostProbableActivity = "";
    let highestProbability = 0;
    for (const activity of route.activities) {
        if (activity.probability > highestProbability) {
            highestProbability = activity.probability;
            mostProbableActivity = activity.type;
        }
    }
    return mostProbableActivity;
}

// material-ui icons
// export function getIconFromActivityName(activity) {
//     switch (activity) {
//         case "IN_VEHICLE":
//         case "IN_PASSENGER_VEHICLE":
//             return DirectionsCarOutlined;
//         case "WALKING":
//         case "RUNNING":
//         case "CYCLING":
//             return DirectionsWalkOutlined;
//         case "IN_BUS":
//             return DirectionsBusOutlined;
//         case "IN_TRAIN":
//         case "IN_SUBWAY":
//             return TrainOutlined;
//         default:
//             return QuestionMarkOutlined;
//     }
// }

export function getNameFromActivityName(activity) {
    switch (activity) {
        case "IN_VEHICLE":
        case "IN_PASSENGER_VEHICLE":
            return "Car";
        case "WALKING":
        case "RUNNING":
        case "CYCLING":
            return "On Foot";
        case "IN_BUS":
            return "Bus";
        case "IN_TRAIN":
        case "IN_SUBWAY":
            return "Train";
        default:
            return "Invalid";
    }
}

export function flattenHierarchy(data) {
    let flatData = [];
    data.forEach((value) => {
        value.forEach((value) => {
            flatData = flatData.concat(value);
        });
    });
    flatData.sort((a, b) => {
        return b.startTimestamp - a.startTimestamp;
    });

    return flatData;
}

// export function flattenHierarchy(data) {
//     let flatData;
//     data.forEach((value) => {
//       value.forEach((value) => {
//         flatData = flatData.concat(value);
//       });
//     });
//     flatData.sort((a, b) => {
//       return b.startTimestamp - a.startTimestamp;
//     });

//     return flatData;
//   }