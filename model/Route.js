import Activity from "./Activity";
import Location from "./Location";

export default class Route {
  constructor(start, end, startTimestamp, endTimestamp, distance, activities) {
    this.start = start;
    this.end = end;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.distance = distance;
    this.activities = activities;
  }
}
