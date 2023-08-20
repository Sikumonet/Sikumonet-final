import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import {
  filterInstitutionsWithName,
  getAllInstitutions,
  sortInstitutionsWithName,
} from "../../API/Institutions/institutions-api.service";
import { VIEWS } from "../../utils/routes";
import { Link } from "react-router-dom";
import InstitutionCardComponent from "../../components/institution-card.component";

export default function UserInstitutions() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [institutionData, setInstitutionData] = useState([]);
  const [institutionName, setInstitutionName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
    }
    handleGetAllInstitutions();
  }, []);

  const handleGetAllInstitutions = async () => {
    setLoadingSpinner(true);
    const response = await getAllInstitutions();
    if (response.success) {
      console.log(response.data);
      setInstitutionData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleFilterInstitution = async () => {
    setLoadingSpinner(true);
    const response = await filterInstitutionsWithName(institutionName);
    if (response.success) {
      console.log(response.data);
      setInstitutionData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleSortInstitution = async (sortingType: string) => {
    setLoadingSpinner(true);
    const response = await sortInstitutionsWithName(sortingType);
    if (response.success) {
      console.log(response.data);
      setInstitutionData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">All Summaries</h1>
      <div className="mt-20">
        <div className="mb-14 flex flex-row items-center justify-end">
          <div className="flex flex-row w-1/5 grid-cols-2 justify-end items-center border-2 border-blue-500 focus:border-indigo-500 focus:border-solid p-3 rounded-md">
            <input
              type="text"
              value={institutionName}
              onChange={(e: any) => setInstitutionName(e.target.value)}
              placeholder="Search Institution"
              className="w-full px-3 py-2 rounded-md outline-none"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleFilterInstitution(); 
                }
              }}
            />
            <button
              onClick={handleFilterInstitution}
              className="text-xl text-slate-400 hover:text-blue-500"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <button
            onClick={() => handleSortInstitution("desc")}
            className="ml-2 bg-slate-400 hover:bg-blue-500 text-white px-3 py-2 rounded-md text-xl"
          >
            <i className="fa-solid fa-arrow-up-a-z"></i>
          </button>
          <button
            onClick={() => handleSortInstitution("asc")}
            className="ml-2 bg-slate-400 hover:bg-blue-500 text-white px-3 py-2 rounded-md text-xl"
          >
            <i className="fa-solid fa-arrow-up-z-a"></i>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {institutionData
            .map((item: any, index: any) => (
              <Link
                to={`${VIEWS.USER_INSTITUTIONS_VIEW}?id=${item._id}`}
                className="cursor-pointer"
              >
                <InstitutionCardComponent
                  name={item.name}
                  location={item.location}
                  imgUrl={item.image.url}
                  key={index.toString()}
                />
              </Link>
            ))
            .reverse()}
        </div>
        {institutionData.length === 0 ? (
          <p className="mt-36 text-slate-400 font-semibold text-center">
            There is no data found.
          </p>
        ) : null}
      </div>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
