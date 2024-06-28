"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FiLogIn } from "react-icons/fi";
import Signup from "./Signup";
import Signin from "./Signin";
import Largepc from "./Largepc";
import "./login.css";
import { FaUserPlus } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
export default function Loginpage() {
  const [Navbool, Setnaavbool] = useState(false);
  const [Si, Setsi] = useState(false);
  const toggle = () => {};
  return (
    <div className="h-full w-full  test ">
      <div className="max-h-full h-full flex flex-col items-start justify-start tempglass ">
        <div className="h-full hidden"></div>

        <nav className="w-full flex items-center justify-between fixed bg-transparent ">
          {/* <div className="ml-4">
            <img src={logo} className="h-16 w-16 md:h-20 md:w-20" />
          </div> */}

          <div className="">
            {Si ? (
              <div className="mr-2">
                {" "}
                <FiLogIn
                  className="pb-1"
                  onClick={(e) => {
                    Setsi(!Si);
                  }}
                  size={35}
                />
              </div>
            ) : (<></>
              // <div className="mr-2">
              //   {" "}
              //   <AiOutlineUserAdd
              //     className="pb-1"
              //     onClick={(e) => {
              //       Setsi(!Si);
              //     }}
              //     size={35}
              //   />
              // </div>
            )}
          </div>
        </nav>
        {/* <div className="lg:hidden w-full h-full">
          {Si ? <Signup /> : <Signin />}
        </div> */}
        <div className="w-full h-full hidden lg:flex">
          <Largepc log={Si} />
        </div>
      </div>
    </div>
  );
}
