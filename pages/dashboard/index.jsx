"use client";
import React, { useTransition, useState, useEffect, useContext } from "react";
import Wrapper from "../../components/Wrapper";
import TransitionEffect from "../../components/TransitionEffect";
import { FileContext } from "../../context/FileContext";
import { Unzip } from "../../read/Unzip";
import {
  calculateCarbonSaved,
  flattenHierarchy,
  getCarbonForCar,
  getNameFromActivityName,
} from "../../utils/utils.js"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Collapsible from "react-collapsible";
import BaseMap from "../../components/BaseMap";
import ModalMapRoute from "../../components/ModalMapRoute";
import HeatmapWrapper from "../../components/HeatmapWrapper.jsx";

const Dashboard = () => {
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

        <div className="mt-20 py-5">
          <div className="mt-10 flex justify-center mb-10">
            <h2 className="text-4xl font-bold pb-5">View All Past Data</h2>
          </div>
          <div>
            <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 px-2">
                      <div>
                        <p className="text-2xl font-medium text-black">
                          {route
                            ? new Date(route?.startTimestamp).toLocaleString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                            : "N/A"}{" "}
                          to{" "}
                          {route
                            ? new Date(route?.endTimestamp).toLocaleString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                            : "N/A"}{" "}
                        </p>
                      </div>
                    </ModalHeader>

                    <ModalBody className="px-0 py-0">
                      <div className="grid grid-cols-2">
                        <div className="bg-blue-400">
                          <BaseMap selectedRoute={route} />
                        </div>
                        <div className="">
                          {route && <ModalMapRoute route={route} />}
                        </div>
                      </div>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          {data ? (
            <div className="flex flex-col text-left text-xl gap-3 border border-emerald mx-40 pl-6 pt-5 pb-5 rounded-lg shadow-md">
              <div className="flex flex-row pt-2 pb-2 font-bold">
                <div className="flex gap-12">
                  <span className="text-white">Year</span>
                  <span className="text-white">Month</span>
                  <span className="text-white">Record</span>
                </div>
              </div>
              {Array.from(data.routes.keys())
                .sort()
                .reverse()
                .map((category, index) => {
                  return (
                    <Collapsible trigger={category} key={index}>
                      {Array.from(data.routes.get(category).keys())
                        // sort by month
                        .sort((a, b) => {
                          const months = [
                            "JANUARY",
                            "FEBRUARY",
                            "MARCH",
                            "APRIL",
                            "MAY",
                            "JUNE",
                            "JULY",
                            "AUGUST",
                            "SEPTEMBER",
                            "OCTOBER",
                            "NOVEMBER",
                            "DECEMBER",
                          ];
                          return (
                            months.indexOf(a.toUpperCase()) -
                            months.indexOf(b.toUpperCase())
                          );
                        })
                        .map((subcategory, index) => {
                          return (
                            <div className="ml-20" key={index}>
                              <Collapsible
                                // className="hover:bg-gray-50"
                                key={Math.random()}
                                trigger={
                                  subcategory.charAt(0).toUpperCase() +
                                  subcategory.toLowerCase().slice(1)
                                }
                              >
                                {data.routes
                                  .get(category)
                                  .get(subcategory)
                                  .sort((a, b) => {
                                    return b.startTimestamp - a.startTimestamp;
                                  })
                                  .map((route, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="ml-28"
                                        onClick={() => {
                                          setRoute(route);
                                          onOpenChange(true);
                                        }}
                                      >
                                        <div className="flex flex-row hover:cursor-pointer">
                                          <h3 className="p-2">
                                            {new Date(
                                              route.startTimestamp
                                            ).toLocaleString("en-US", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            })}{" "}
                                            to{" "}
                                            {new Date(
                                              route.endTimestamp
                                            ).toLocaleString("en-US", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            })}
                                          </h3>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </Collapsible>
                            </div>
                          );
                        })}
                    </Collapsible>
                  );
                })}
            </div>
          ) : (
            <div>this will be the loader</div>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default Dashboard;
