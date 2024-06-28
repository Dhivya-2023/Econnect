import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserClock, faHome, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar.jsx";

const Leavemanagement = () => {
  const location = useLocation();
  const { userPicture, userName } = location.state || {};
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const data = [
    {
      title: "Leave Approval System",
      desc: "Easy tracking of employee leave requests",
      icon: <FontAwesomeIcon icon={faUserClock} className="text-6xl mb-6 text-zinc-700"/>,
      button: "View now",
      link: "/leaveapproval",
    },
    {
      title: "Remote Work Approval System",
      desc: "Easy tracking of employee remote work requests",
      icon: <FontAwesomeIcon icon={faHome} className="text-6xl mb-6 text-zinc-700"/>,
      button: "View now",
      link: "/wfh",
    },
    {
      title: "Employees Leave Details",
      desc: "Easy tracking of employee leave details",
      icon: <FontAwesomeIcon icon={faClipboardList} className="text-6xl mb-6 text-zinc-700"/>,
      button: "View now",
      link: "/history",
    },
  ];

  return (
    <div className="flex bg-[#6d9eeb] bg-gradient-to-b from-blue-400 to-indigo-800">
      <Sidebar/>
      <div className="container my-6 mx-6 bg-white rounded-3xl p-10">
        <h1 className="text-5xl font-semibold font-poppins pb-2 text-transparent bg-gradient-to-r from-zinc-600 to-zinc-950 bg-clip-text">
          Leave Management
        </h1>
        <div className="my-7">
          <div className="grid grid-cols-3 gap-8">
            {data.map((item, index) => (
              <div
                key={index}
                className="w-full p-6 rounded-lg bg-blue-50 bg-gradient-to-tr from-white to-blue-100 transition-transform duration-300 transform hover:scale-105 border border-gray-200 shadow-lg  flex flex-col justify-between"
              >
                <div>
                  {item.icon}
                  <h1 className="font-poppins font-semibold text-lg pb-2 text-zinc-800">
                    {item.title}
                  </h1>
                  <p className="font-poppins font-medium text-gray-600 text-sm pb-3 ">
                    {item.desc}
                  </p>
                </div>
                <Link to={item.link}>
                  <button
                    className={`bg-blue-500 hover:bg-blue-400 hover:text-slate-900 text-white text-sm font-poppins px-4 py-2 mt-3 rounded-full shadow-lg`}
                  >
                    {item.button}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leavemanagement;
