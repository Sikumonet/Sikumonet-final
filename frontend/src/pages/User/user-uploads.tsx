import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import { getAllSummariesRelatedToUser } from "../../API/Summaries/summary-api.service";
import profilePic from "../../assets/images/propic.jpg";
import SummaryCardComponent from "../../components/Dashboard/summary-card.component";
import DataTable, { TableColumn } from "react-data-table-component";
import ButtonComponent from "../../components/button.component";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { VIEWS } from "../../utils/routes";
import { arrangeDateTime } from "../../utils/arrange-date";

type IDownloads = {
  _id: string;
  title: string;
  createdAt: string;
  user: {
    name: string;
    userAvatar: {
      url: string;
    };
  };
  file: {
    url: string;
  };
};

export default function UserUploads() {
  useScrollToTop();
  const navigate = useNavigate();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [mySummariesData, setMySummariesData] = useState([]);
  const [tableRowsData, setTableRowsData] = useState(mySummariesData);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      handleGetAllSummariesRelatedToUser(JSON.parse(user).id);
    }
  }, []);

  const handleGetAllSummariesRelatedToUser = async (userId: string) => {
    setLoadingSpinner(true);
    const response = await getAllSummariesRelatedToUser(userId);
    if (response.success) {
      console.log("getAllSummariesRelatedToUser : ", response.data);
      setMySummariesData(response.data);
      setTableRowsData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleFilterTable = async (e: any) => {
    var searchData = mySummariesData.filter((item: IDownloads) => {
      if (
        item.title
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });
    setTableRowsData(searchData);
  };

  const columns: TableColumn<IDownloads>[] = [
    {
      name: "Date & Time",
      selector: (row) => arrangeDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: "Summary Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Summary File",
      selector: (row) => row.file.url,
      cell: (row) => (
        <a
          className="text-blue-300 bg-blue-900 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
          href={row.file.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to file <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      ),
      sortable: true,
    },
    {
      name: "Author",
      selector: (row) => row.user.name,
      cell: (row) => (
        <div className="flex flex-row w-full justify-start items-center">
          <div
            className="w-6 h-6 rounded-full mr-4"
            style={{
              backgroundImage: `url(${row.user.userAvatar.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <p className="font-bold">{row.user.name}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Options",
      cell: (row) => (
        <div className="flex flex-row w-full justify-center items-center">
          <button
            title="View"
            onClick={() =>
              navigate(`${VIEWS.USER_SUMMARY_SINGLE_VIEW}?id=${row._id}`)
            }
            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full mx-1"
          >
            <i className="fa-solid fa-eye"></i>
          </button>
          <button
            title="Edit"
            onClick={() =>
              navigate(`${VIEWS.USER_SUMMARY_SINGLE_EDIT}?id=${row._id}`)
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-1"
          >
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {}, [tableRowsData]);

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">My Uploads</h1>
      <div className="">
        <div className="w-full flex flex-row justify-end items-center">
          <div className="w-1/5">
            <ButtonComponent
              name={"Add New Summary"}
              handleAction={() => navigate(VIEWS.USER_ALL_INSTITUTIONS)}
            />
          </div>
        </div>
        <div className="flex flex-row w-full grid-cols-2 justify-end items-center">
          <input
            type="text"
            onChange={handleFilterTable}
            placeholder="Search Summary"
            className="my-5 w-1/5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <DataTable
          columns={columns}
          data={tableRowsData}
          pagination
          className="font-bold"
        />
      </div>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
