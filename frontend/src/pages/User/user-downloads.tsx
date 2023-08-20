import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import DataTable, { TableColumn } from "react-data-table-component";
import { getAllDownloadsRelatedToUser } from "../../API/Downloads/download-api.service";
import { arrangeDateTime } from "../../utils/arrange-date";
import { useNavigate } from "react-router-dom";
import { VIEWS } from "../../utils/routes";

type IDownloads = {
  _id: string;
  createdAt: string;
  summary: {
    _id: string;
    title: string;
    file: {
      url: string;
    };
  };
  summaryAuthor: {
    name: string;
    userAvatar: {
      url: string;
    };
  };
};

export default function UserDownloads() {
  useScrollToTop();
  const navigate = useNavigate();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [myDownloadsData, setMyDownloadsData] = useState([]);
  const [tableRowsData, setTableRowsData] = useState(myDownloadsData);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      handleGetAllDownloadsRelatedToUser(JSON.parse(user).id);
    }
  }, []);

  const handleGetAllDownloadsRelatedToUser = async (userId: string) => {
    setLoadingSpinner(true);
    const response = await getAllDownloadsRelatedToUser(userId);
    if (response.success) {
      console.log("getAllDownloadsRelatedToUser : ", response.data);
      setMyDownloadsData(response.data);
      setTableRowsData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleFilterTable = async (e: any) => {
    var searchData = myDownloadsData.filter((item: IDownloads) => {
      if (
        item.summary.title
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });
    setTableRowsData(searchData);
  };

  const handleViewSummary = (summaryId: string) => {};

  const columns: TableColumn<IDownloads>[] = [
    {
      name: "Date & Time",
      selector: (row) => arrangeDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: "Summary Title",
      selector: (row) => row.summary.title,
      sortable: true,
    },
    {
      name: "Author",
      cell: (row) => (
        <div className="flex flex-row w-full justify-start items-center">
          <div
            className="w-6 h-6 rounded-full mr-4"
            style={{
              backgroundImage: `url(${row.summaryAuthor.userAvatar.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <p className="font-bold">{row.summaryAuthor.name}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Summary File",
      selector: (row) => row.summary.file.url,
      cell: (row) => (
        <a
          className="text-blue-300 bg-blue-900 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
          href={row.summary.file.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to file <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
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
              navigate(
                `${VIEWS.USER_SUMMARY_SINGLE_VIEW}?id=${row.summary._id}`
              )
            }
            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full mx-1"
          >
            <i className="fa-solid fa-eye"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {}, [tableRowsData]);

  const handleAddNewSummary = () => {};

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">My Downloads</h1>
      <div className="">
        <div className="flex flex-row w-full grid-cols-2 justify-end items-center">
          <input
            type="text"
            onChange={handleFilterTable}
            placeholder="Search"
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
