import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Time from "./Components/Time.jsx";
import Leave from "./Components/Leave.jsx";
import Leave_approval from "./Components/Leave_approval.jsx";
import Wfh_approval from "./Components/Wfh_approval.jsx";
import Leave_History from "./Components/Leave_History.jsx"; 
import App from "./App.jsx";
import "./App.css";

const DashboardPage = () => (
  <div
    id="temp"
    className="h-full w-full overflow-x-hidden flex justify-center items-center"
  >
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/time",
    element: <Time />,
  },
  {
    path: "/leave",
    element: <Leave />,
  },
  {
    path: "/leaveapproval",
    element: <Leave_approval />,
  },
  {
    path: "/wfh",
    element: <Wfh_approval />,
  },
  {
    path: "/history",
    element: <Leave_History />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <DashboardPage />
  </RouterProvider>
);

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './App.css'
// import Home from "./Components/Home";
// import Sidebar from "./Components/Sidebar";
// import Leave from "./components/Leave"
// import Time from "./components/Time"

// const DashboardPage = () => (
//   <Checkauth>
//     <div className="flex h-screen w-full bg-[#6d9eeb] flex-col lg:flex-row">
//       <Sidebar />
//       <div id="temp" className="h-full w-full overflow-x-hidden flex justify-center items-center">
//         <Outlet />
//       </div>
//     </div>
//   </Checkauth>
// );

// const rou = [];
// const tempdata = [
//   rou.map((item) => {
//     return item;
//   }),
// ];
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/User",
//     element: <DashboardPage />,
//     children: [
//       {
//         path:"",
//         element:<></>

//       },
//       {
//         path: "Clockin_int",
//         element: <Clockin_int />,
//         children: [
//           {
//             path: "",
//             element: <Clockin />,
//           },
//           {
//             path: "Clockdashboard",
//             element: <Clockdashboard />,
//           },
//         ],
//       },

//       {
//         path: "Leave",
//         element: <Leave />,

//         children: [
//           {
//             path: "",
//             element: <Leave />,
//           },
//           // {
//           //   path: "Clockdashboard",
//           //   element: <Clockdashboard />,
//           // },
//         ],
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );
