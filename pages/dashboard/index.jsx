"use client";
import React, { useTransition, useState, useEffect, useContext } from "react";
import Wrapper from "../../components/Wrapper";
import TabButton from "../../components/TabButton";
import { CiLocationOn } from "react-icons/ci";
import TransitionEffect from "../../components/TransitionEffect";
import { FileContext } from "../../context/FileContext";
import { Unzip } from "../../read/Unzip";
import {
  calculateCarbonSaved,
  flattenHierarchy,
  getCarbonForCar,
  getNameFromActivityName,
} from "../../utils/utils.js"
import HeatmapWrapper from "./components/HeatmapWrapper";


const Dashboard = () => {
  const [tab, setTab] = useState("Delhi Pune");
  const [isPending, startTransition] = useTransition();
  const fileContext = useContext(FileContext)
  const [data, setData] = useState(null);
  const [carbonSaved, setCarbonSaved] = useState(0);
  const [carbonWasted, setCarbonWasted] = useState(0);

  useEffect(() => {
    if (fileContext.file) {
      Unzip.unzipLocationHistory(fileContext.file).then((res) => {
        setData(res);
        getCarbonSum(res.routes);
      });
    }
  }, [fileContext.file]);

  const getCarbonSum = (data) => {
    let carbonSum = 0;
    let carbonWaste = 0;
    const flatten = flattenHierarchy(data);

    flatten.forEach((route) => {
      carbonSum += calculateCarbonSaved(route);
      carbonWaste += getCarbonForCar(route.distance) - calculateCarbonSaved(route);
    });

    setCarbonSaved(carbonSum);
    setCarbonWasted(carbonWaste);
  };

  return (
    <div className="w-full py-20 bg-background">
      <TransitionEffect />
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-3xl md:text-4xl mb-5 font-semibold leading-tight">
            Your Carbon Footprint Report
          </div>
        </div>

        <HeatmapWrapper compositeData={data} />
      </Wrapper>
    </div>
  );
};

export default Dashboard;