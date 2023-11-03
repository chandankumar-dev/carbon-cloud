import React from "react";
import Head from "next/head";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

import { NextUIProvider } from "@nextui-org/react";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Carbon Cloud</title>
      </Head>
      <NextUIProvider>
        <div className="h-screen mx-auto w-full flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
        </div>
      </NextUIProvider>
    </>
  );
};

export default Layout;
