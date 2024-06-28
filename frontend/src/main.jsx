// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import "./index.css";
// import App from "./App";
// import Clockin from "./components/Clockin";
// import Sidebar from "./components/Sidebar";
// import Checkauth from "./Utils/Checkauth";
// import Setting from "./components/Setting";
// import Clockdashboard from "./components/Clockdashboard";
// import Clockin_int from "./components/Clockin_int";
// import Leave from "./components/Leave";
// import LeaveHistory from "./components/LeaveHistory";
// import Leaverequest from "./components/Leaverequest";
// import Holidaylist from "./components/Holidayslist";
// import Workfromhome from "./components/Workfromhome";
// import Remote_details from "./components/Remote_details";

// const DashboardPage = () => (
//   <Checkauth>
//     <div className="flex h-screen w-full bg-gradient-to-b from-blue-400 to-indigo-800 flex-col lg:flex-row">
//       <Sidebar />
//       <div
//         id="temp"
//         className="h-full w-full overflow-x-hidden flex justify-center items-center"
//       >
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
//         path: "",
//         element: <></>,
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
//         path: "Setting",
//         element: <Setting />,
//       },

//       {
//         path: "Leave",
//         element: <Leave />,
//       },

//       {
//         path: "LeaveHistory",
//         element: <LeaveHistory />,
//       },
//       {
//         path: "Holidaylist",
//         element: <Holidaylist />,
//       },
//       {
//         path: "Workfromhome",
//         element: <Workfromhome />,
//       },

//       {
//         path: "Leaverequest",
//         element: <Leaverequest />,
//       },
//       {
//         path: "Remote_details",
//         element: <Remote_details/>,
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );


import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Clockin from "./components/Clockin";
import Sidebar from "./components/Sidebar";
import Checkauth from "./Utils/Checkauth";
import Setting from "./components/Setting";
import Clockdashboard from "./components/Clockdashboard";
import Clockin_int from "./components/Clockin_int";
import Leave from "./components/Leave";
import LeaveHistory from "./components/LeaveHistory";
import Leaverequest from "./components/Leaverequest";
import Holidaylist from "./components/Holidayslist";
import Workfromhome from "./components/Workfromhome";
import Remote_details from "./components/Remote_details";

const DashboardPage = () => (
  <Checkauth>
    <div className="flex h-screen w-full bg-gradient-to-b from-blue-400 to-indigo-800 flex-col lg:flex-row">
      <Sidebar />
      <div
        id="temp"
        className="h-full w-full overflow-x-hidden flex justify-center items-center"
      >
        <Outlet />
      </div>
    </div>
  </Checkauth>
);

const rou = [];
const tempdata = [
  rou.map((item) => {
    return item;
  }),
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/User",
    element: <DashboardPage />,
    children: [
      {
        path: "",
        element: <></>,
      },
      {
        path: "Clockin_int",
        element: <Clockin_int />,
        children: [
          {
            path: "",
            element: <Clockin />,
          },
          {
            path: "Clockdashboard",
            element: <Clockdashboard />,
          },
        ],
      },
      {
        path: "Setting",
        element: <Setting />,
      },
      {
        path: "Leave",
        element: <Leave />,
      },
      {
        path: "LeaveHistory",
        element: <LeaveHistory />,
      },
      {
        path: "Holidaylist",
        element: <Holidaylist />,
      },
      {
        path: "Workfromhome",
        element: <Workfromhome />,
      },
      {
        path: "Leaverequest",
        element: <Leaverequest />,
      },
      {
        path: "Remote_details",
        element: <Remote_details />,
      },
    ],
  },
]);

const MainApp = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const isRunning = localStorage.getItem("isRunning") === "true";
      if (isRunning) {
        const confirmationMessage = "Are you sure you want to leave?";
        event.preventDefault();
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
};

createRoot(document.getElementById("root")).render(<MainApp />);
