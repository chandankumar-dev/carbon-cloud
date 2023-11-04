const { Activity } = require("./Activity");
const { Location } = require("./Location");

class Route {
  constructor(start, end, startTimestamp, endTimestamp, distance, activities) {
    this.start = start;
    this.end = end;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.distance = distance;
    this.activities = activities;
  }
}

module.exports = Route; // For Node.js
