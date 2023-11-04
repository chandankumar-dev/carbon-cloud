const zip = require("@zip.js/zip.js");
const { Deserialize } = require("./Deserialize.js");
const { Location } = require("../model/Location.js");
const { Route } = require("../model/Route.js");

class Unzip {
    static async unzipLocationHistory(blob) {
        // Unzip using zip.js using filereader
        const reader = new zip.ZipReader(new zip.BlobReader(blob));
        const entries = await reader.getEntries();
        const locationPath = entries.find(
            (entry) => entry.filename === "Takeout/Location History/Records.json"
        );
        const possibleLocation = await locationPath?.getData?.(new zip.TextWriter());

        let locations = [];

        if (possibleLocation) {
            locations = Deserialize.deserializeLocationRecords(possibleLocation);
        }

        const routes = new Map();

        const routePaths = entries.filter((entry) =>
            entry.filename.startsWith("Takeout/Location History/Semantic Location History/")
        );

        for (const routePath of routePaths) {
            const possibleRoute = await routePath?.getData?.(new zip.TextWriter());
            if (possibleRoute) {
                const route = Deserialize.deserializeRouteRecords(possibleRoute);
                const date = routePath.filename.split("/")[4].split("_");
                const year = date[0];
                const month = date[1].split(".")[0];
                if (!routes.has(year)) {
                    routes.set(year, new Map());
                }
                if (!routes.get(year)?.has(month)) {
                    routes.get(year)?.set(month, []);
                }
                routes
                    .get(year)
                    ?.get(month)
                    ?.push(...route);
            }
        }

        return {
            locations: locations,
            routes: routes,
        };
    }
}

module.exports = { Unzip };
