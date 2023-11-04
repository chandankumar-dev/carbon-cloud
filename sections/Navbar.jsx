import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
const Navbar = () => {
  const menuList = [
    { label: "Home", path: "/" },
    { label: "Leaderboard", path: "/leaderboard" },
  ];

  const [nav, setNav] = useState(false);
  const handleChange = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full h-[10vh] bg-navBackground z-[999]">
      <div className="container mx-auto flex items-center justify-center w-full h-full px-4 lg:px-16">
        <div className="flex items-center justify-between w-full h-full">
          <div>
            <Link href="/">
              <h1 className="text-white">
                Carbon <span>Cloud</span>
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {menuList.map((menu, index) => (
              <ul className="text-black hover:text-blue-400" key={index}>
                <Link href={menu.path}>
                  <li>{menu.label}</li>
                </Link>
              </ul>
            ))}
          </div>

          <div
            className="flex md:hidden border border-black rounded-full text-black p-2"
            onClick={handleChange}
          >
            {nav ? (
              <AiOutlineClose size={20} className="text-black" />
            ) : (
              <AiOutlineMenu size={20} className="text-black" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// globally define the predifine tag of html
