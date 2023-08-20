import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VIEWS } from "../../../utils/routes";
import logo from "../../../assets/images/logo.svg";

const AdminSidebarComponent = () => {
  const [isOpenDashboard, setIsOpenDashboard] = useState(true);
  const [isOpenInstitutions, setIsOpenInstitutions] = useState(false);
  const [isOpenDegreePrograms, setIsOpenDegreePrograms] = useState(false);
  const [isOpenAcademicYears, setIsOpenAcademicYears] = useState(false);
  const [isOpenSubjects, setIsOpenSubjects] = useState(false);

  const handleChangeTab = (tabName: string) => {
    switch (tabName) {
      case "DASHBOARD":
        setIsOpenDashboard(true);
        setIsOpenInstitutions(false);
        setIsOpenDegreePrograms(false);
        setIsOpenAcademicYears(false);
        setIsOpenSubjects(false);
        break;
      case "INSTITUTIONS":
        setIsOpenDashboard(false);
        setIsOpenInstitutions(true);
        setIsOpenDegreePrograms(false);
        setIsOpenAcademicYears(false);
        setIsOpenSubjects(false);
        break;
      case "DEGREE_PROGRAMS":
        setIsOpenDashboard(false);
        setIsOpenInstitutions(false);
        setIsOpenDegreePrograms(true);
        setIsOpenAcademicYears(false);
        setIsOpenSubjects(false);
        break;
      case "ACADEMIC_YEARS":
        setIsOpenDashboard(false);
        setIsOpenInstitutions(false);
        setIsOpenDegreePrograms(false);
        setIsOpenAcademicYears(true);
        setIsOpenSubjects(false);
        break;
      case "SUBJECTS":
        setIsOpenDashboard(false);
        setIsOpenInstitutions(false);
        setIsOpenDegreePrograms(false);
        setIsOpenAcademicYears(false);
        setIsOpenSubjects(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-64 py-4 fixed top-0 left-0 z-20">
      <div className="flex flex-col justify-center items-center my-10">
        <img src={logo} alt="" className="w-20 h-auto" />
        <h1 className="text-2xl font-semibold text-center">Sikumonet</h1>
        <p className="text-sm font-normal text-center mb-6">
          (ADMIN DASHBOARD)
        </p>
      </div>
      <ul>
        <Link
          to={VIEWS.ADMIN_DASHBOARD}
          onClick={() => handleChangeTab("DASHBOARD")}
        >
          <li
            className={`${
              isOpenDashboard
                ? "bg-blue-700 text-blue-100"
                : "bg-gray-800 hover:bg-gray-700 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-table-columns mr-2"></i> Dashboard
          </li>
        </Link>
        <Link
          to={VIEWS.ADMIN_INSTITUTIONS}
          onClick={() => handleChangeTab("INSTITUTIONS")}
        >
          <li
            className={`${
              isOpenInstitutions
                ? "bg-blue-700 text-blue-100"
                : "bg-gray-800 hover:bg-gray-700 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-school mr-2"></i> Institutions
          </li>
        </Link>
        <Link
          to={VIEWS.ADMIN_DEGREES}
          onClick={() => handleChangeTab("DEGREE_PROGRAMS")}
        >
          <li
            className={`${
              isOpenDegreePrograms
                ? "bg-blue-700 text-blue-100"
                : "bg-gray-800 hover:bg-gray-700 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-user-graduate mr-2"></i> Degree Programs
          </li>
        </Link>
        <Link
          to={VIEWS.ADMIN_ACADEMIC_YEARS}
          onClick={() => handleChangeTab("ACADEMIC_YEARS")}
        >
          <li
            className={`${
              isOpenAcademicYears
                ? "bg-blue-700 text-blue-100"
                : "bg-gray-800 hover:bg-gray-700 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-regular fa-calendar mr-2"></i> Academic Years
          </li>
        </Link>
        <Link
          to={VIEWS.ADMIN_SUBJECTS}
          onClick={() => handleChangeTab("SUBJECTS")}
        >
          <li
            className={`${
              isOpenSubjects
                ? "bg-blue-700 text-blue-100"
                : "bg-gray-800 hover:bg-gray-700 text-slate-100 hover:text-slate-200"
            } p-4 cursor-pointer`}
          >
            <i className="fa-solid fa-shapes mr-2"></i> Subjects
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidebarComponent;
