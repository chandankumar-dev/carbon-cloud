import React, { useState, useMemo } from "react";
import { mapApiKey } from "../constant";
import {
  calculateCarbonSaved,
  getCarbonForCar,
  getNameFromActivityName,
} from "../utils/utils";

export default function ModalMapRouter({ route }) {
  const [startCity, setStartCity] = useState("City");
  const [endCity, setEndCity] = useState("City");

  useMemo(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${route.start.latitude},${route.start.longitude}&key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const city = data.results[0].address_components[3].long_name;
        setStartCity(city);
      });

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${route.end.latitude},${route.end.longitude}&key=${process.env.NEXT_PUBLIC_GMAP_API_KEY}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const city = data.results[0].address_components[3].long_name;
        setEndCity(city);
      });
  }, [route]);
  return (
    <div className="flex flex-col text-black">
      <div className="py-2 grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 rounded-2xl ml-20 gap-5">
        <div className="flex flex-col ml-auto font-medium justify-center align-middle">
          <p className="text-right">{startCity}</p>
        </div>
        <div className="flex justify-center align-middle">
          <hr className="w-48 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        </div>
        <div className="flex flex-col font-medium justify-center align-middle">
          <p className="text-left">{endCity}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start px-7">
        <h1 className="text-3xl font-bold mx-auto">Stats</h1>
        <div className="flex flex-row gap-2 items-end lg my-auto pb-5 pt-2 mx-auto">
          <p className="flex my-auto text-2xl font-bold">
            {`${getNameFromActivityName(
              route?.activities.reduce(
                (maxObject, currentObject) => {
                  return currentObject.probability > maxObject.probability
                    ? currentObject
                    : maxObject;
                },
                { type: "", probability: -Infinity }
              ).type
            )} for `}
          </p>
          <p className="flex lg  my-auto text-2xl font-bold">
            {route
              ? `${Math.floor(
                (route?.endTimestamp - route?.startTimestamp) /
                (1000 * 60 * 60 * 24)
              )} days ${Math.floor(
                ((route?.endTimestamp - route?.startTimestamp) /
                  (1000 * 60 * 60)) %
                24
              )} hours ${Math.floor(
                ((route?.endTimestamp - route?.startTimestamp) /
                  (1000 * 60)) %
                60
              )} minutes`
              : "N/A"}
          </p>
        </div>
        <div className="flex flex-row font-extrabold my-auto">
          <p className="flex lg  my-auto text-4xl ">
            {getCarbonForCar(route.distance).toFixed(2)}
          </p>
          <p className=" text-xl my-auto ml-2 font-bold">
            kg potential carbon footprint
          </p>
        </div>
        <div className="flex flex-row font-extrabold my-auto">
          <p className=" flex lg  my-auto text-4xl ">
            {calculateCarbonSaved(route).toFixed(2)}
          </p>
          <p className="text-xl my-auto ml-2 font-bold">kg saved</p>
        </div>
        <div className="flex flex-row font-extrabold my-auto">
          <p className=" flex lg  my-auto text-4xl ">
            {route.distance.toFixed(2)}
          </p>
          <p className="text-xl my-auto ml-2 font-bold">m traveled</p>
        </div>
      </div>
    </div>
  );
}
