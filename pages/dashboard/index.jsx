"use client";
import React, { useTransition, useState, useEffect, useContext } from "react";
import Wrapper from "../../components/Wrapper";
import TabButton from "../../components/TabButton";
import { CiLocationOn } from "react-icons/ci";
import TransitionEffect from "../../components/TransitionEffect";
import { FileContext } from "../../context/FileContext";
import { Unzip } from "../../read/Unzip";
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
        // setData(res);
        // getCarbonSum(res.routes);
        console.log(res);
      });
    }
  }, [fileContext.file]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full bg-background">
      <TransitionEffect />
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-3xl md:text-4xl mb-5 font-semibold leading-tight">
            Your Carbon Footprint Report
          </div>
        </div>

        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-3xl md:text-4xl mb-5 font-semibold leading-tight">
            Your Carbon Heatmap
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between py-10">
          <div className="flex flex-col  items-center justify-center gap-16 mt-5">
            <TabButton
              selectTab={() => handleTabChange("Delhi Pune")}
              active={tab === "Delhi Pune"}
            >
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <CiLocationOn size={40} />
                  <p>Delhi</p>
                </div>

                <div className="flex flex-col items-center">
                  <p>----------------------------</p>
                </div>

                <div className="flex flex-col items-center">
                  <CiLocationOn size={40} />
                  <p>Pune</p>
                </div>
              </div>
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("Delhi Gujarat")}
              active={tab === "Delhi Gujarat"}
            >
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <CiLocationOn size={40} />
                  <p>Delhi</p>
                </div>

                <div className="flex flex-col items-center">
                  <p>----------------------------</p>
                </div>

                <div className="flex flex-col items-center">
                  <CiLocationOn size={40} />
                  <p>Gujarat</p>
                </div>
              </div>
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("Maharastra MP")}
              active={tab === "Maharastra MP"}
            >
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <CiLocationOn size={40} />
                  <p>Maharastra</p>
                </div>

                <div className="flex flex-col items-center">
                  <p>----------------------------</p>
                </div>

                <div className="flex flex-col items-center">
                  <CiLocationOn size={40} />
                  <p>Madhya Pradesh</p>
                </div>
              </div>
            </TabButton>
          </div>
          <div>{Route_Tab_Data.find((t) => t.id === tab).content}</div>
        </div>

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
