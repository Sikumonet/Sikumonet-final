import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSingleAcademicYear } from "../../API/AcademicYears/academic-years-api.service";
import { getAllSubjectsRelatedToAcademicYear } from "../../API/Subjects/subject-api.service";
import SubjectsCardComponent from "../../components/subject-card.component";
import { getYearString } from "../../utils/year-string";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import { VIEWS } from "../../utils/routes";

export default function UserAcademicYearView() {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [bearToken, setBearToken] = useState("");
  const [academicYearData, setAcademicYearData] = useState({
    name: "",
    degreeProgram: "",
    institution: "",
    yearValue: 0,
  });
  const [subjectsData, setSubjectsData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setBearToken(token || "");
    handleSingleAcademicYearDetails(String(id));
    handleGetAllSubjectsRelatedToAcademicYear(String(id));
  }, []);

  const handleSingleAcademicYearDetails = async (academicYearId: string) => {
    setLoadingSpinner(true);
    const response = await getSingleAcademicYear(academicYearId);
    if (response.success) {
      console.log("getSingleAcademicYear", response.data);
      setAcademicYearData({
        name: response.data.name,
        yearValue: response.data.yearValue,
        degreeProgram: response.data.degreeProgram.name,
        institution: response.data.institution.name,
      });
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetAllSubjectsRelatedToAcademicYear = async (
    academicYearId: string
  ) => {
    setLoadingSpinner(true);
    const response = await getAllSubjectsRelatedToAcademicYear(academicYearId);
    if (response.success) {
      console.log("getAllSubjectsRelatedToAcademicYear", response.data);
      setSubjectsData(response.data || []);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-row justify-between h-64 items-center">
        <div className="flex flex-row">
          <button
            className="rounded-full border-2 p-3 h-fit w-fit m-2"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="fle flex-col ml-4">
            <h1 className="text-3xl text-slate-700 font-bold">
              {getYearString(academicYearData.yearValue)}
            </h1>
            <p className="text-gray-400 text-left mt-2">
              <i className="fa-solid fa-user-graduate"></i>{" "}
              <span className="text-slate-500 font-semibold">
                {academicYearData.degreeProgram}
              </span>
            </p>
            <p className="text-gray-400 text-left mt-2">
              <i className="fa-solid fa-school"></i>{" "}
              <span className="text-slate-500 font-semibold">
                {academicYearData.institution}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h1 className="text-2xl text-slate-500 font-semibold mb-10">
          All subjects in this academic year
        </h1>
        {subjectsData.length === 0 ? (
          <p className="text-slate-400 text-md font-semibold">
            There are no subjects. Please add the first one from above.
          </p>
        ) : null}
        <div className="grid grid-cols-3 gap-4">
          {subjectsData.map((item: any, index: any) => (
            <Link
              to={`${VIEWS.USER_SUBJECT_VIEW}?id=${item._id}`}
              className="cursor-pointer"
            >
              <SubjectsCardComponent
                key={index.toString()}
                name={item.name}
                imgUrl={item.image.url}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
