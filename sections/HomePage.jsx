import React from "react";
import Button from "../components/Button";
import Image from "next/image";
import homePage_vector from "../public/assets/Login_graphic.png";
import { AiOutlineCloudUpload } from "react-icons/ai";
const HomePage = () => {
  return (
    <div className="w-full p-3 h-[90vh]">
      <div className="container mx-auto flex items-center justify-center w-full h-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-3 md:justify-between w-full h-full px-4 md:px-16">
          <div className="flex flex-col items-center md:items-start gap-5">
            <Link>
              <h2 className="font-bold">
                Carbon <span>Cloud</span>
              </h2>
            </Link>
            <p className="md:w-[550px] text-xl text-center md:text-start">
              Your carbon footprint matters. Reduce it today with our
              carbon-tracking travel platform and eco-friendly suggestions.
            </p>
            <p className="md:w-[550px] text-sm text-center md:text-start">
              Not sure what file to upload? To download the location data zip,
              check{" "}
              <a
                href="https://takeout.google.com/settings/takeout/custom/location_history"
                target="_blank"
                className="text-blue-400"
              >
                here
              </a>
            </p>
            <div className="flex items-center gap-3 bg-blue-400 rounded-lg p-2">
              <AiOutlineCloudUpload size={20} />
              <Button>Upload file</Button>
            </div>
          </div>

          <div>
            <Image
              src={homePage_vector}
              width={600}
              height={600}
              alt="vector"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
