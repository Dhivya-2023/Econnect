import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Toaster, toast } from "react-hot-toast";
import RBGimage from "../assets/RBGimage.png";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Baseaxios, LS } from "../Utils/Resuse";

const Sidebar = ({ userPicture, userName, isLoggedIn, onLogout }) => {
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const Modal = ({ show, onClose, onConfirm, message }) => {
    if (!show) return null;

    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="mb-3 text-black font-poppins">{message}</p>
          <hr className="border-gray-400" />
          <div className="flex flex-row">
            <button
              className="bg-red-400 hover:bg-red-500 text-white w-1/2 px-4 py-2 mt-4 rounded-full mr-2 font-poppins"
              onClick={onConfirm}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black w-1/2 px-4 py-2 mt-4 rounded-full font-poppins"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    // Perform any additional logout actions if needed
    toast.success("Successfully logged out!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => {
        navigate("/");
        setShowLogoutModal(false);
        onLogout(); // Notify parent component about logout
      },
    });
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    // Load user picture immediately upon login
    if (isLoggedIn) {
      // Load user picture logic here
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col items-center bg-[#6d9eeb] min-h-screen w-1/4 relative text-white p-4 bg-gradient-to-b from-blue-400 to-indigo-800 ">
      <h1 className="text-2xl font-bold font-poppins mb-10 mt-4">Admin Portal</h1>
      <img src={RBGimage} alt="Img" className="rounded-full w-16 h-16 mb-4" />
      <div className="flex flex-col justify-center items-center">
        <Link to="/time">
          <div className="lg:ease-soft flex items-center justify-center active:bg-color3 group bg-[#eaecef26] hover:bg-blue-50 text-white transition-transform duration-300 transform hover:scale-105  hover:text-black uppercase active:text-black m-3 mr-auto p-3 w-full rounded-lg">
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 group-hover:rotate-180 duration-1000 hover:text-blue-500 cursor-pointer mr-2"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6l3 3"
              />
            </svg>
            <span className="text-base font-medium mr-2 font-poppins">
              Time Management
            </span>
          </div>
        </Link>

        <Link to="/leave">
          <div className="lg:ease-soft flex items-center justify-center active:bg-color3 group bg-[#eaecef26] hover:bg-blue-50 text-white transition-transform duration-300 transform hover:scale-105 hover:text-black uppercase active:text-black m-3 mr-auto p-3 w-full rounded-lg">
           
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 group-hover:animate-bounce hover:text-blue-500 cursor-pointer mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <span className="text-base font-medium mr-2 font-poppins">
              Leave Management
            </span>
          </div>
        </Link>

        <div className="absolute bottom-9 gap-6 flex ">
          <Link>
            <FiLogOut
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Logout"
              data-tooltip-place="top"
              size={30}
              color="white"
              className="hover:animate-pulse"
              onClick={handleLogout}
              // onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            />
          </Link>
          <Link>
            <FiUser
              data-tooltip-id="my-tooltip"
              data-tooltip-content={LS.get("name")}
              data-tooltip-place="top"
              size={30}
              color="white"
              className="hover:animate-pulse"
              // onClick={(e) => {
              //   navigate("/", { replace: true });
              // }}
            />
          </Link>
          <style>
            {`
            #my-tooltip {
                background-color: #eaecef26;
                border-radius: 8px;
              }
            `}
          </style>
        </div>
      </div>

      <Modal
        show={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        message="Are you sure you want to logout?"
      />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* <Toaster
        position="top-right"
        reverseOrder={false}
      /> */}

      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default Sidebar;