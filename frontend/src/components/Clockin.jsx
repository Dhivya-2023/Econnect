// import React, { useState, useEffect } from "react";
// import "./setting.css";
// import { useLocation, Link } from "react-router-dom";
// // import { Toaster, toast } from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import "./json.css";
// import { Baseaxios, LS } from "../Utils/Resuse";

// function Clockin() {
//   const location = useLocation();
//   const toastid = toast;
//   let path = location.pathname.split("/")[2];
//   const [Navbool, Setnavbool] = useState(false);
//   const togglebtn = () => {
//     Setnavbool(!Navbool);
//   };
//   const [startTime, setStartTime] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [Login, Setlogin] = useState(false);

//   // Load the timer state and login status from local storage on component mount
//   useEffect(() => {
//     const storedStartTime = parseInt(localStorage.getItem("startTime"));
//     const storedElapsedTime = parseInt(localStorage.getItem("elapsedTime"));
//     const storedIsRunning = localStorage.getItem("isRunning") === "true";
//     const storedLogin = localStorage.getItem("Login") === "true";

//     if (!isNaN(storedStartTime)) {
//       setStartTime(storedStartTime);
//     }
//     if (!isNaN(storedElapsedTime)) {
//       setElapsedTime(storedElapsedTime);
//     }
//     setIsRunning(storedIsRunning);
//     Setlogin(storedLogin);
//   }, []);

//   // Save the timer state and login status to local storage whenever they change
//   useEffect(() => {
//     localStorage.setItem("startTime", startTime);
//     localStorage.setItem("elapsedTime", elapsedTime);
//     localStorage.setItem("isRunning", isRunning);
//     localStorage.setItem("Login", Login);
//   }, [startTime, elapsedTime, isRunning, Login]);

//   useEffect(() => {
//     let timer;

//     if (isRunning) {
//       timer = setInterval(() => {
//         const now = Date.now();
//         const elapsed = now - startTime;
//         setElapsedTime(elapsed);
//       }, 1000);
//     } else {
//       clearInterval(timer);
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   }, [isRunning, startTime]);

//   const toggleTimer = () => {
//     Setlogin(true);
//     if (isRunning) {
//       setIsRunning(false);
//     } else {
//       const now = Date.now() - elapsedTime;
//       setStartTime(now);
//       setIsRunning(true);
//     }
//   };

//   const resetTimer = () => {
//     Setlogin(false);
//     setIsRunning(false);
//     setElapsedTime(0);
//     setStartTime(null);
//   };

//   const clockinapi = () => {
//     const userid = LS.get("userid");

//     let currentDate = new Date();
//     let options = { hour12: true };
//     let currentTimeString = currentDate.toLocaleTimeString(undefined, options);
//     console.log(currentTimeString);

//     Baseaxios.post("/Clockin", { userid, name: LS.get("name"), time: currentTimeString })
//       .then(() => {
//         toast.success("Clock in successful!");
//         toggleTimer();
//       })
//       .catch((err) => {
//         toast.error("Clock in failed. Please try again.");
//         console.log(err);
//       });
//   };

//   const clockoutapi = () => {
//     const userid = LS.get("userid");
//     console.log(userid);
//     let currentDate = new Date();
//     let time = currentDate.toLocaleTimeString().toString();

//     // alert message while clocking out
//     confirmAlert({
//       customUI: ({ onClose }) => {
//         return (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//             <div className="bg-blue-100 p-4 rounded-lg">
//               <h2 className="text-lg text-center font-semibold mb-3 border-b border-gray-400 pb-3">
//                 Confirm to Clock Out
//               </h2>
//               <p className="mb-3">Are you sure you want to clock out?</p>
//               <div className="flex justify-between">
//                 <button
//                   className="px-4 py-2 w-1/2 bg-red-400 hover:bg-red-500 text-white rounded-md mr-2"
//                   onClick={() => {
//                     Baseaxios.post("/Clockout", {
//                       userid: userid,
//                       name: LS.get("name"),
//                       time: time,
//                     })
//                       .then((res) => {
//                         toast.success("Clock out successful!");
//                         console.log(res);
//                         resetTimer();
//                       })
//                       .catch((err) => {
//                         toast.error("Clock Out failed. Please try again.");
//                         console.log(err);
//                       });
//                     onClose();
//                   }}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   className="px-4 py-2 w-1/2 bg-gray-300 hover:bg-gray-400 text-black rounded-md"
//                   onClick={() => {
//                     onClose();
//                   }}
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       },
//     });
//   };

//   const formatTime = (time) => {
//     const seconds = Math.floor((time / 1000) % 60);
//     const minutes = Math.floor((time / (1000 * 60)) % 60);
//     const hours = Math.floor(time / (1000 * 60 * 60));
//     return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
//       seconds < 10 ? "0" : ""
//     }${seconds}`;
//   };
//   return (
//     <div className="flex justify-center items-center relative jsonback mt-[6rem]">
//       <div className="card2">
//         <div className="card px-[2rem] md:px-[3rem] rounded-lg pb-[2rem] max-w-2xl lg:px-[4rem]">
//           <div className="card-img"></div>
//           <div className="card-info">
//             <div className="flex flex-col items-center space-y-4">
//               <div className="text-2xl font-semibold ">Time Tracking</div>
//               <div className="text-2xl">{formatTime(elapsedTime)}</div>
//             </div>
//             <div className="flex flex-row space-x-4">
//               {Login ? (
//                 <button
//                   className={`c-button c-button--gooey  ${
//                     isRunning ? "bg-red-500" : "bg-green-500"
//                   }`}
//                   onClick={toggleTimer}
//                 >
//                   {isRunning ? "Pause" : "Resume"}
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               ) : (
//                 <button
//                   className="c-button c-button--gooey "
//                   onClick={clockinapi}
//                 >
//                   {" "}
//                   Clock In
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               )}
//               {Login ? (
//                 <button
//                   className="c-button c-button--gooey "
//                   onClick={clockoutapi}
//                 >
//                   {" "}
//                   Clock Out
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       {/* <Toaster position="top-right" reverseOrder={false} /> */}
//     </div>
//   );
// }


// export default Clockin;



// import React, { useState, useEffect } from "react";
// import "./setting.css";
// import { useLocation, Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import "./json.css";
// import { Baseaxios, LS } from "../Utils/Resuse";

// function Clockin() {
//   const location = useLocation();
//   const toastid = toast;
//   let path = location.pathname.split("/")[2];
//   const [Navbool, Setnavbool] = useState(false);
//   const togglebtn = () => {
//     Setnavbool(!Navbool);
//   };
//   const [startTime, setStartTime] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [Login, Setlogin] = useState(false);

//   // Load the timer state and login status from local storage on component mount
//   useEffect(() => {
//     const storedStartTime = parseInt(localStorage.getItem("startTime"));
//     const storedElapsedTime = parseInt(localStorage.getItem("elapsedTime"));
//     const storedIsRunning = localStorage.getItem("isRunning") === "true";
//     const storedLogin = localStorage.getItem("Login") === "true";

//     if (!isNaN(storedStartTime)) {
//       setStartTime(storedStartTime);
//     }
//     if (!isNaN(storedElapsedTime)) {
//       setElapsedTime(storedElapsedTime);
//     }
//     setIsRunning(storedIsRunning);
//     Setlogin(storedLogin);
//   }, []);

//   // Save the timer state and login status to local storage whenever they change
//   useEffect(() => {
//     localStorage.setItem("startTime", startTime);
//     localStorage.setItem("elapsedTime", elapsedTime);
//     localStorage.setItem("isRunning", isRunning);
//     localStorage.setItem("Login", Login);
//   }, [startTime, elapsedTime, isRunning, Login]);

//   useEffect(() => {
//     let timer;

//     if (isRunning) {
//       timer = setInterval(() => {
//         const now = Date.now();
//         const elapsed = now - startTime;
//         setElapsedTime(elapsed);
//       }, 1000);
//     } else {
//       clearInterval(timer);
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   }, [isRunning, startTime]);

//   // Set a timer to clock out at 10 AM
//   useEffect(() => {
//     const checkTime = () => {
//       const now = new Date();
//       if (now.getHours() === 10 && now.getMinutes() === 40) {
//         clockoutapi();
//       }
//     };

//     const timerId = setInterval(checkTime, 60000); // Check every minute

//     return () => clearInterval(timerId);
//   }, [Login]);

//   const toggleTimer = () => {
//     Setlogin(true);
//     if (isRunning) {
//       setIsRunning(false);
//     } else {
//       const now = Date.now() - elapsedTime;
//       setStartTime(now);
//       setIsRunning(true);
//     }
//   };

//   const resetTimer = () => {
//     Setlogin(false);
//     setIsRunning(false);
//     setElapsedTime(0);
//     setStartTime(null);
//   };

//   const clockinapi = () => {
//     const userid = LS.get("userid");

//     let currentDate = new Date();
//     let options = { hour12: true };
//     let currentTimeString = currentDate.toLocaleTimeString(undefined, options);
//     console.log(currentTimeString);

//     Baseaxios.post("/Clockin", { userid, name: LS.get("name"), time: currentTimeString })
//       .then(() => {
//         toast.success("Clock in successful!");
//         toggleTimer();
//       })
//       .catch((err) => {
//         toast.error("Clock in failed. Please try again.");
//         console.log(err);
//       });
//   };

//   const clockoutapi = () => {
//     const userid = LS.get("userid");
//     console.log(userid);
//     let currentDate = new Date();
//     let time = currentDate.toLocaleTimeString().toString();

//     // alert message while clocking out
//     confirmAlert({
//       customUI: ({ onClose }) => {
//         return (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//             <div className="bg-blue-100 p-4 rounded-lg">
//               <h2 className="text-lg text-center font-semibold mb-3 border-b border-gray-400 pb-3">
//                 Confirm to Clock Out
//               </h2>
//               <p className="mb-3">Are you sure you want to clock out?</p>
//               <div className="flex justify-between">
//                 <button
//                   className="px-4 py-2 w-1/2 bg-red-400 hover:bg-red-500 text-white rounded-md mr-2"
//                   onClick={() => {
//                     Baseaxios.post("/Clockout", {
//                       userid: userid,
//                       name: LS.get("name"),
//                       time: time,
//                     })
//                       .then((res) => {
//                         toast.success("Clock out successful!");
//                         console.log(res);
//                         resetTimer();
//                       })
//                       .catch((err) => {
//                         toast.error("Clock Out failed. Please try again.");
//                         console.log(err);
//                       });
//                     onClose();
//                   }}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   className="px-4 py-2 w-1/2 bg-gray-300 hover:bg-gray-400 text-black rounded-md"
//                   onClick={() => {
//                     onClose();
//                   }}
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       },
//     });
//   };

//   const formatTime = (time) => {
//     const seconds = Math.floor((time / 1000) % 60);
//     const minutes = Math.floor((time / (1000 * 60)) % 60);
//     const hours = Math.floor(time / (1000 * 60 * 60));
//     return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <div className="flex justify-center items-center relative jsonback mt-[6rem]">
//       <div className="card2">
//         <div className="card px-[2rem] md:px-[3rem] rounded-lg pb-[2rem] max-w-2xl lg:px-[4rem]">
//           <div className="card-img"></div>
//           <div className="card-info">
//             <div className="flex flex-col items-center space-y-4">
//               <div className="text-2xl font-semibold">Time Tracking</div>
//               <div className="text-2xl">{formatTime(elapsedTime)}</div>
//             </div>
//             <div className="flex flex-row space-x-4">
//               {Login ? (
//                 <button
//                   className={`c-button c-button--gooey ${isRunning ? "bg-red-500" : "bg-green-500"}`}
//                   onClick={toggleTimer}
//                 >
//                   {isRunning ? "Pause" : "Resume"}
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               ) : (
//                 <button className="c-button c-button--gooey" onClick={clockinapi}>
//                   Clock In
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               )}
//               {Login ? (
//                 <button className="c-button c-button--gooey" onClick={clockoutapi}>
//                   Clock Out
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       {/* <Toaster position="top-right" reverseOrder={false} /> */}
//     </div>
//   );
// }

// export default Clockin;






// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Baseaxios, LS } from "../Utils/Resuse";
// import "./setting.css";
// import { useLocation } from "react-router-dom";
// import { confirmAlert } from 'react-confirm-alert'; // Import for confirmation dialog
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for confirmation dialog

// function Clockin() {
//   const location = useLocation();
//   let path = location.pathname.split("/")[2];
//   const [isRunning, setIsRunning] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [Login, setLogin] = useState(false);
//   const [startTime, setStartTime] = useState(null);

//   useEffect(() => {
//     if (isRunning) {
//       const timer = setInterval(() => {
//         setElapsedTime(Date.now() - startTime);
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [isRunning, startTime]);

//   useEffect(() => {
//     const checkTime = () => {
//       const now = new Date();
//       if (now.getHours() === 13 && now.getMinutes() === 55 && isRunning) {
//         autoClockout();
//       }
//     };

//     const timerId = setInterval(checkTime, 60000); // Check every minute

//     return () => clearInterval(timerId);
//   }, [isRunning]);

//   const toggleTimer = () => {
//     setLogin(true);
//     if (isRunning) {
//       setIsRunning(false);
//       setElapsedTime(Date.now() - startTime);
//     } else {
//       setStartTime(Date.now() - elapsedTime);
//       setIsRunning(true);
//     }
//   };

//   const resetTimer = () => {
//     setLogin(false);
//     setIsRunning(false);
//     setElapsedTime(0);
//     setStartTime(null);
//   };

//   const clockinapi = () => {
//     const userid = LS.get("userid");
//     let currentTimeString = new Date().toLocaleTimeString(undefined, { hour12: true });
//     Baseaxios.post("/Clockin", { userid, name: LS.get("name"), time: currentTimeString })
//       .then(() => {
//         toast.success("Clock in successful!");
//         toggleTimer();
//       })
//       .catch((err) => {
//         toast.error("Clock in failed. Please try again.");
//         console.log(err);
//       });
//   };

//   const clockoutapi = () => {
//     const now = new Date();
//     const userid = LS.get("userid");
//     let time = now.toLocaleTimeString().toString();

//     if (now.getHours() === 13 && now.getMinutes() === 55) {
//       autoClockout();
//     } else {
//       confirmAlert({
//         customUI: ({ onClose }) => {
//           return (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//               <div className="bg-blue-100 p-4 rounded-lg">
//                 <h2 className="text-lg text-center font-semibold mb-3 border-b border-gray-400 pb-3">
//                   Confirm to Clock Out
//                 </h2>
//                 <p className="mb-3">Are you sure you want to clock out?</p>
//                 <div className="flex justify-between">
//                   <button
//                     className="px-4 py-2 w-1/2 bg-red-400 hover:bg-red-500 text-white rounded-md mr-2"
//                     onClick={() => {
//                       Baseaxios.post("/Clockout", {
//                         userid: userid,
//                         name: LS.get("name"),
//                         time: time,
//                       })
//                         .then(() => {
//                           toast.success("Clock out successful!");
//                           resetTimer();
//                         })
//                         .catch(() => {
//                           toast.error("Clock Out failed. Please try again.");
//                         });
//                       onClose();
//                     }}
//                   >
//                     Yes
//                   </button>
//                   <button
//                     className="px-4 py-2 w-1/2 bg-gray-300 hover:bg-gray-400 text-black rounded-md"
//                     onClick={onClose}
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         },
//       });
//     }
//   };

//   const autoClockout = () => {
//     const userid = LS.get("userid");
//     let time = new Date().toLocaleTimeString().toString();

//     Baseaxios.post("/Clockout", {
//       userid: userid,
//       name: LS.get("name"),
//       time: time,
//     })
//       .then(() => {
//         toast.success("Automatic clock out successful!");
//         resetTimer();
//         localStorage.setItem("autoClockoutTime", time);
//       })
//       .catch(() => {
//         toast.error("Automatic clock out failed. Please try again.");
//       });
//   };

//   const formatTime = (time) => {
//     const seconds = Math.floor((time / 1000) % 60);
//     const minutes = Math.floor((time / (1000 * 60)) % 60);
//     const hours = Math.floor(time / (1000 * 60 * 60));
//     return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <div className="flex justify-center items-center relative jsonback mt-[6rem]">
//       <div className="card2">
//         <div className="card px-[2rem] md:px-[3rem] rounded-lg pb-[2rem] max-w-2xl lg:px-[4rem]">
//           <div className="card-img"></div>
//           <div className="card-info">
//             <div className="flex flex-col items-center space-y-4">
//               <div className="text-2xl font-semibold">Time Tracking</div>
//               <div className="text-2xl">{formatTime(elapsedTime)}</div>
//             </div>
//             <div className="flex flex-row space-x-4">
//               {Login ? (
//                 <button
//                   className={`c-button c-button--gooey ${isRunning ? "bg-red-500" : "bg-green-500"}`}
//                   onClick={toggleTimer}
//                 >
//                   {isRunning ? "Pause" : "Resume"}
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               ) : (
//                 <button className="c-button c-button--gooey" onClick={clockinapi}>
//                   Clock In
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               )}
//               {Login ? (
//                 <button className="c-button c-button--gooey" onClick={clockoutapi}>
//                   Clock Out
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// }

// export default Clockin;


// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Baseaxios, LS } from "../Utils/Resuse";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import { useLocation } from "react-router-dom";

// function Clockin() {
//   const location = useLocation();
//   const [isRunning, setIsRunning] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [Login, setLogin] = useState(false);
//   const [startTime, setStartTime] = useState(null);

//   useEffect(() => {
//     if (isRunning) {
//       const timer = setInterval(() => {
//         setElapsedTime(Date.now() - startTime);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [isRunning, startTime]);

//   useEffect(() => {
//     const checkTime = () => {
//       const now = new Date();
//       // Adjust this condition based on your business logic for automatic clock-out
//       if (now.getHours() === 16 && now.getMinutes() === 60 && isRunning) {
//         autoClockout();
//       }
//     };

//     const timerId = setInterval(checkTime, 60000);
//     return () => clearInterval(timerId);
//   }, [isRunning]);

//   const toggleTimer = () => {
//     setLogin(true);
//     if (isRunning) {
//       setIsRunning(false);
//       const elapsed = Date.now() - startTime;
//       setElapsedTime(elapsed);
//     } else {
//       setStartTime(Date.now() - elapsedTime);
//       setIsRunning(true);
//     }
//   };

//   const resetTimer = () => {
//     setLogin(false);
//     setIsRunning(false);
//     setElapsedTime(0);
//     setStartTime(null);
//   };

//   const clockinapi = () => {
//     const userid = LS.get("userid");
//     let currentDate = new Date();
//     let options = { hour12: true };
//     let currentTimeString = currentDate.toLocaleTimeString(undefined, options);
//     Baseaxios.post("/Clockin", { userid, name: LS.get("name"), time: currentTimeString })
//       .then(() => {
//         toast.success("Clock in successful!");
//         toggleTimer();
//       })
//       .catch((err) => {
//         toast.error("Clock in failed. Please try again.");
//         console.log(err);
//       });
//   };

//   const clockoutapi = () => {
//     const now = new Date();
//     const userid = LS.get("userid");
//     let time = now.toLocaleTimeString().toString();
//     // Adjust this condition based on your business logic for automatic clock-out
//     if (now.getHours() === 16 && now.getMinutes() === 60) {
//       autoClockout();
//     } else {
//       confirmAlert({
//         customUI: ({ onClose }) => {
//           return (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//               <div className="bg-blue-100 p-4 rounded-lg">
//                 <h2 className="text-lg text-center font-semibold mb-3 border-b border-gray-400 pb-3">
//                   Confirm to Clock Out
//                 </h2>
//                 <p className="mb-3">Are you sure you want to clock out?</p>
//                 <div className="flex justify-between">
//                   <button
//                     className="px-4 py-2 w-1/2 bg-red-400 hover:bg-red-500 text-white rounded-md mr-2"
//                     onClick={() => {
//                       Baseaxios.post("/Clockout", {
//                         userid: userid,
//                         name: LS.get("name"),
//                         time: time,
//                       })
//                         .then(() => {
//                           toast.success("Clock out successful!");
//                           resetTimer();
//                         })
//                         .catch(() => {
//                           toast.error("Clock Out failed. Please try again.");
//                         });
//                       onClose();
//                     }}
//                   >
//                     Yes
//                   </button>
//                   <button
//                     className="px-4 py-2 w-1/2 bg-gray-300 hover:bg-gray-400 text-black rounded-md"
//                     onClick={onClose}
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         },
//       });
//     }
//   };

//   const autoClockout = () => {
//     const userid = LS.get("userid");
//     const now = new Date();
//     let time = now.toLocaleTimeString().toString();
//     Baseaxios.post("/Clockout", {
//       userid: userid,
//       name: LS.get("name"),
//       time: time,
//     })
//       .then(() => {
//         toast.success("Automatic clock out successful!");
//         resetTimer();
//         localStorage.setItem("autoClockoutTime", time);
//       })
//       .catch(() => {
//         toast.error("Automatic clock out failed. Please try again.");
//       });
//   };

//   const formatTime = (time) => {
//     const seconds = Math.floor((time / 1000) % 60);
//     const minutes = Math.floor((time / (1000 * 60)) % 60);
//     const hours = Math.floor(time / (1000 * 60 * 60));
//     return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <div className="flex justify-center items-center relative jsonback mt-[6rem]">
//       <div className="card2">
//         <div className="card px-[2rem] md:px-[3rem] rounded-lg pb-[2rem] max-w-2xl lg:px-[4rem]">
//           <div className="card-img"></div>
//           <div className="card-info">
//             <div className="flex flex-col items-center space-y-4">
//               <div className="text-2xl font-semibold">Time Tracking</div>
//               <div className="text-2xl">{formatTime(elapsedTime)}</div>
//             </div>
//             <div className="flex flex-row space-x-4">
//               {Login ? (
//                 <button
//                   className={`c-button c-button--gooey ${isRunning ? "bg-red-500" : "bg-green-500"}`}
//                   onClick={toggleTimer}
//                 >
//                   {isRunning ? "Pause" : "Resume"}
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               ) : (
//                 <button className="c-button c-button--gooey" onClick={clockinapi}>
//                   Clock In
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               )}
//               {Login ? (
//                 <button className="c-button c-button--gooey" onClick={clockoutapi}>
//                   Clock Out
//                   <div className="c-button__blobs">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </button>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// }

// export default Clockin;



import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Baseaxios, LS } from "../Utils/Resuse";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useLocation } from "react-router-dom";

function Clockin() {
  const location = useLocation();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [Login, setLogin] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, startTime]);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      // Automatic clock-out condition
      if (now.getHours() === 16 && now.getMinutes() === 0 && isRunning) {
        autoClockout();
      }
    };

    const timerId = setInterval(checkTime, 60000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  const toggleTimer = () => {
    setLogin(true);
    if (isRunning) {
      setIsRunning(false);
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);
    } else {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    setLogin(false);
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(null);
  };

  const clockinapi = () => {
    const userid = LS.get("userid");
    let currentDate = new Date();
    let options = { hour12: true };
    let currentTimeString = currentDate.toLocaleTimeString(undefined, options);
    Baseaxios.post("/Clockin", { userid, name: LS.get("name"), time: currentTimeString })
      .then(() => {
        toast.success("Clock in successful!");
        toggleTimer();
      })
      .catch((err) => {
        toast.error("Clock in failed. Please try again.");
        console.log(err);
      });
  };

  const clockoutapi = () => {
    const now = new Date();
    const userid = LS.get("userid");
    let time = now.toLocaleTimeString().toString();
    if (now.getHours() === 12 && now.getMinutes() === 15) {
      autoClockout();
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h2 className="text-lg text-center font-semibold mb-3 border-b border-gray-400 pb-3">
                  Confirm to Clock Out
                </h2>
                <p className="mb-3">Are you sure you want to clock out?</p>
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 w-1/2 bg-red-400 hover:bg-red-500 text-white rounded-md mr-2"
                    onClick={() => {
                      Baseaxios.post("/Clockout", {
                        userid: userid,
                        name: LS.get("name"),
                        time: time,
                      })
                        .then(() => {
                          toast.success("Clock out successful!");
                          resetTimer();
                        })
                        .catch(() => {
                          toast.error("Clock Out failed. Please try again.");
                        });
                      onClose();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="px-4 py-2 w-1/2 bg-gray-300 hover:bg-gray-400 text-black rounded-md"
                    onClick={onClose}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          );
        },
      });
    }
  };

  const autoClockout = () => {
    const userid = LS.get("userid");
    Baseaxios.post("/autoClockout", {
      userid: userid,
      name: LS.get("name"),
    })
      .then(() => {
        toast.success("Automatic clock out successful!");
        resetTimer();
        const now = new Date();
        let time = now.toLocaleTimeString().toString();
        localStorage.setItem("autoClockoutTime", time);
      })
      .catch(() => {
        toast.error("Automatic clock out failed. Please try again.");
      });
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex justify-center items-center relative jsonback mt-[6rem]">
      <div className="card2">
        <div className="card px-[2rem] md:px-[3rem] rounded-lg pb-[2rem] max-w-2xl lg:px-[4rem]">
          <div className="card-img"></div>
          <div className="card-info">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-2xl font-semibold">Time Tracking</div>
              <div className="text-2xl">{formatTime(elapsedTime)}</div>
            </div>
            <div className="flex flex-row space-x-4">
              {Login ? (
                <button
                  className={`c-button c-button--gooey ${isRunning ? "bg-red-500" : "bg-green-500"}`}
                  onClick={toggleTimer}
                >
                  {isRunning ? "Pause" : "Resume"}
                  <div className="c-button__blobs">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </button>
              ) : (
                <button className="c-button c-button--gooey" onClick={clockinapi}>
                  Clock In
                  <div className="c-button__blobs">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </button>
              )}
              {Login ? (
                <button className="c-button c-button--gooey" onClick={clockoutapi}>
                  Clock Out
                  <div className="c-button__blobs">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}


export default Clockin;
