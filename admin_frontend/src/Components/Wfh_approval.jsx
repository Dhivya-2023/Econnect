import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import axios from "axios";

const Wfh = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/remote_work_requests"
      );
      setLeaveData(response.data.remote_work_requests);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onApprove = async (userid) => {
    try {
      console.log("User ID:", userid); // Log userid
      // Update status in backend
      const formData = new FormData();
      formData.append("status", "Approved");
      formData.append("userid", userid);
      await axios.put(
        `http://127.0.0.1:8000/updated_remote_work_requests`,
        formData
      );
      // Update status locally
      const updatedData = leaveData.map((row) => {
        if (row.id === userid) {
          return { ...row, status: "Approved" };
        }
        return row;
      });
      setLeaveData(updatedData);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const onDisapprove = async (userid) => {
    try {
      console.log("User ID:", userid); // Convert userid to ObjectId
      // Update status in backend
      const formData = new FormData();
      formData.append("status", "Rejected");
      formData.append("userid", userid);

      await axios.put(
        `http://127.0.0.1:8000/updated_remote_work_requests`,
        formData
      );
      // Update status locally
      const updatedData = leaveData.map((row) => {
        if (row.id === userid) {
          return { ...row, status: "Rejected" };
        }
        return row;
      });
      setLeaveData(updatedData);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex bg-[#6d9eeb] bg-gradient-to-b from-blue-400 to-indigo-800">
      <Sidebar />
      <div className="container my-6 mx-6 bg-white rounded-3xl p-10">
        <div className="flex justify-between">
          <h1 className="text-5xl font-semibold font-inter pb-2 text-transparent bg-gradient-to-r from-zinc-600 to-zinc-950 bg-clip-text">
            Remote Work Approvals
          </h1>
          <Link to="/leave">
            <div className="">
              <button className="bg-blue-500 hover:bg-blue-400 hover:text-slate-900 text-white text-sm font-inter px-4 py-2 rounded-full shadow-lg">
                Back
              </button>
            </div>
          </Link>
        </div>
        <div className="w-full bg-gradient-to-b from-white to-blue-50 shadow-lg rounded-xl border border-gray-200 my-2">
          <header className="px-5 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">
              Remote Work Requests
            </h2>
          </header>
          <div className="p-3">
            <div>
              <table className="table-auto w-full overflow-y-auto">
                <thead className="text-sm font-semibold uppercase text-black bg-[#6d9eeb7a]">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">S.No</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">
                        Employee ID
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">From Date</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">To Date</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Reason</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {currentItems.map((row, index) => (
                    <tr key={index}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-center">
                          {(currentPage - 1) * itemsPerPage + index + 1}.
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-center">
                          {row.Employee_ID}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-center">
                          {row.employeeName}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-center">
                          {row.fromDate}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-center">
                          {row.toDate}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-center">
                          {row.reason}
                        </div>
                      </td>
                      <td className="p-2 ">
                        {row.status === "Approved" ? (
                          <p className="text-green-500 font-inter text-center">
                            Approved
                          </p>
                        ) : row.status === "Rejected" ? (
                          <p className="text-red-500 font-inter text-center">
                            Rejected
                          </p>
                        ) : (
                          <div className="flex justify-center">
                            <div
                              style={{ backgroundColor: "#34D399" }}
                              className="h-8 rounded-full p-1 mr-4"
                            >
                              <button
                                onClick={() => onApprove(row.id)} // Pass _id here
                                className="text-white "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div
                              style={{ backgroundColor: "#EF4444" }}
                              className="h-8 rounded-full p-1"
                            >
                              <button
                                onClick={() => onDisapprove(row.id)} // Pass _id here
                                className="text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <button
              className="py-1 px-3 bg-blue-500 hover:bg-blue-400 hover:text-slate-900 text-white text-sm font-inter rounded-full shadow-lg mr-2"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="py-1 px-3 bg-blue-500 hover:bg-blue-400 hover:text-slate-900 text-white text-sm font-inter rounded-full shadow-lg"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= leaveData.length}
            >
              Next
            </button>
          </div>
          <div className="text-sm font-semibold text-gray-800">
            {/* Page {currentPage} of {Math.ceil(leaveData.length / itemsPerPage)} */}
            Page {leaveData.length > 0 ? currentPage : 0} of{" "}
            {leaveData.length > 0
              ? Math.ceil(leaveData.length / itemsPerPage)
              : 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wfh;
