import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSingleInstitution } from "../../API/Institutions/institutions-api.service";
import {
  getAllDegreeProgramsRelatedToInstitution,
  getSingleDegreeProgram,
} from "../../API/DegreePrograms/degree-programs-api.service";
import DegreeProgrammeCardComponent from "../../components/degree-programme-card.component";
import { getAllAcademicYearsRelatedToDegreeProgram } from "../../API/AcademicYears/academic-years-api.service";
import InstitutionCardComponent from "../../components/institution-card.component";
import AcademicYearCardComponent from "../../components/academic-year-card.component";
import { VIEWS } from "../../utils/routes";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";

export default function AdminDegreeSingle() {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [bearToken, setBearToken] = useState("");
  const [degreeProgramData, setDegreeProgramData] = useState({
    name: "",
    institution: "",
    image: "",
  });
  const [academicYearsData, setAcademicYearsData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setBearToken(token || "");
    handleSingleDegreeProgramDetails(String(id));
    handleGetAllAcademicYearsRelatedToDegreeProgram(String(id));
  }, []);

  const handleSingleDegreeProgramDetails = async (degreeProgramId: string) => {
    setLoadingSpinner(true);
    const response = await getSingleDegreeProgram(degreeProgramId);
    if (response.success) {
      console.log("getSingleDegreeProgram", response.data);
      setDegreeProgramData({
        name: response.data.name,
        institution: response.data.institution.name,
        image: response.data.image.url,
      });
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetAllAcademicYearsRelatedToDegreeProgram = async (
    degreeProgramId: string
  ) => {
    setLoadingSpinner(true);
    const response = await getAllAcademicYearsRelatedToDegreeProgram(
      degreeProgramId
    );
    if (response.success) {
      console.log("getAllAcademicYearsRelatedToDegreeProgram", response.data);
      setAcademicYearsData(response.data || []);
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
              {degreeProgramData.name}
            </h1>
            <p className="text-gray-400 text-left mt-2">
              <i className="fa-solid fa-school"></i>{" "}
              <span className="text-slate-500 font-semibold">
                {degreeProgramData.institution}
              </span>
            </p>
          </div>
        </div>
        <div
          className="h-48 w-48 rounded-full shadow-lg"
          style={{
            backgroundImage: `url(${degreeProgramData.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
      <div className="mt-20">
        <h1 className="text-2xl text-slate-500 font-semibold mb-10">
          All academic years in this degree program
        </h1>
        {academicYearsData.length === 0 ? (
          <p className="text-slate-400 text-md font-semibold">
            There are no degree programs. Please add the first one from above.
          </p>
        ) : null}
        <div className="grid grid-cols-5 gap-3">
          {academicYearsData
            .sort((a: any, b: any) => a.yearValue - b.yearValue)
            .map((item: any, index: any) => (
              <Link
                to={`${VIEWS.ADMIN_ACADEMIC_YEARS_SINGLE}?id=${item._id}`}
                className="cursor-pointer"
              >
                <AcademicYearCardComponent
                  key={index.toString()}
                  name={item.name}
                  yearValue={item.yearValue}
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
