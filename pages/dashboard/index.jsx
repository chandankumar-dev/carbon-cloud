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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Collapsible from "react-collapsible";
import { flattenHierarchy } from "../../utils/utils";
import { calculateCarbonSaved } from "../../utils/utils";
import { getCarbonForCar } from "../../utils/utils";
import BaseMap from "../../components/BaseMap";
import ModalMapRoute from "../../components/ModalMapRoute";

const Dashboard = () => {
  const [tab, setTab] = useState("Delhi Pune");
  const [route, setRoute] = useState(null);
  const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();
  const fileContext = useContext(FileContext);

  const [carbonSaved, setCarbonSaved] = useState(0);
  const [carbonWasted, setCarbonWasted] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [leaderboardValue, setLeaderboardValue] = useState("");

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const Route_Tab_Data = [
    {
      title: "Delhi Pune",
      id: "Delhi Pune",
      start: "Delhi",
      destination: "Pune",
      content: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121058.93192430925!2d73.78039436534952!3d18.524761299972962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699064320610!5m2!1sen!2sin"
          width="600"
          height="450"
          // style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      ),
    },

    {
      title: "Delhi Gujarat",
      id: "Delhi Gujarat",
      start: "Delhi",
      destination: "Gujarat",
      content: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777316.944988922!2d68.68031256921884!3d22.39942054700541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959051f5f0ef795%3A0x861bd887ed54522e!2sGujarat!5e0!3m2!1sen!2sin!4v1699064234947!5m2!1sen!2sin"
          width="600"
          height="450"
          // style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      ),
    },

    {
      title: "Maharastra MP",
      id: "Maharastra MP",
      content: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733735.001046555!2d75.77443072023003!3d23.95246180666062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39667381d35aea05%3A0xe0106b0d4e701c1e!2sMadhya%20Pradesh!5e0!3m2!1sen!2sin!4v1699065596364!5m2!1sen!2sin"
          width="600"
          height="450"
          // style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      ),
    },
  ];

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
      carbonWaste +=
        getCarbonForCar(route.distance) - calculateCarbonSaved(route);
    });
    setCarbonSaved(carbonSum);
    setCarbonWasted(carbonWaste);
  };

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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full bg-background bg-background">
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
