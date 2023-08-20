import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSingleInstitution } from "../../API/Institutions/institutions-api.service";
import { getAllDegreeProgramsRelatedToInstitution } from "../../API/DegreePrograms/degree-programs-api.service";
import DegreeProgrammeCardComponent from "../../components/degree-programme-card.component";
import { VIEWS } from "../../utils/routes";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";

export default function AdminInstitutionSingle() {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [bearToken, setBearToken] = useState("");
  const [institutionData, setInstitutionData] = useState({
    name: "",
    location: "",
    image: "",
  });
  const [degreeProgramsData, setDegreeProgramsData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setBearToken(token || "");
    handleSingleInstitutionDetails(String(id));
    handleGetAllDegreeProgramsRelatedToInstitution(String(id));
  }, []);

  const handleSingleInstitutionDetails = async (institutionId: string) => {
    setLoadingSpinner(true);
    const response = await getSingleInstitution(institutionId);
    if (response.success) {
      console.log("getSingleInstitution", response.data);
      setInstitutionData({
        name: response.data.name,
        location: response.data.location,
        image: response.data.image.url,
      });
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleGetAllDegreeProgramsRelatedToInstitution = async (
    institutionId: string
  ) => {
    setLoadingSpinner(true);
    const response = await getAllDegreeProgramsRelatedToInstitution(
      institutionId
    );
    if (response.success) {
      console.log("getAllDegreeProgramsRelatedToInstitution", response.data);
      setDegreeProgramsData(response.data || []);
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
              {institutionData.name}
            </h1>
            <p className="text-gray-400 text-left mt-2">
              <i className="fa-solid fa-location-dot"></i>{" "}
              <span className="text-slate-500 font-semibold">
                {institutionData.location}
              </span>
            </p>
          </div>
        </div>
        <div
          className="h-48 w-48 rounded-full shadow-lg"
          style={{
            backgroundImage: `url(${institutionData.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
      <div className="mt-20">
        <h1 className="text-2xl text-slate-500 font-semibold mb-10">
          All Degree Programs in {institutionData.name}
        </h1>
        {degreeProgramsData.length === 0 ? (
          <p className="text-slate-400 text-md font-semibold">
            There are no degree programs. Please add the first one from above.
          </p>
        ) : null}
        <div className="grid grid-cols-3 gap-4">
          {degreeProgramsData
            .map((item: any, index: any) => (
              <Link
                to={`${VIEWS.ADMIN_DEGREES_SINGLE}?id=${item._id}`}
                className="cursor-pointer"
              >
                <DegreeProgrammeCardComponent
                  name={item.name}
                  institution={item.institution.name}
                  imgUrl={item.image.url}
                  key={index.toString()}
                />
              </Link>
            ))
            .reverse()}
        </div>
      </div>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
