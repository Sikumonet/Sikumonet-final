import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputFieldComponent from "../../components/input-field.component";
import ButtonComponent from "../../components/button.component";
import { getAllInstitutions } from "../../API/Institutions/institutions-api.service";
import {
  getAllDegreePrograms,
  getAllDegreeProgramsRelatedToInstitution,
} from "../../API/DegreePrograms/degree-programs-api.service";
import { createAcademicYear } from "../../API/AcademicYears/academic-years-api.service";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";

export default function AdminAcademicYearAdd() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [name, setName] = useState("");
  const [bearToken, setBearToken] = useState("");
  const [institutionData, setInstitutionData] = useState([]);
  const [selectedInstitutionValue, setSelectedInstitutionValue] = useState("");
  const [institutionId, setInstitutionId] = useState("");
  const [degreeProgramsData, setDegreeProgramsData] = useState([]);
  const [selectedDegreeProgramValue, setSelectedDegreeProgramValue] =
    useState("");
  const [degreeProgramId, setDegreeProgramId] = useState("");
  const yearValueData = [
    { name: "1st Year", value: 1 },
    { name: "2nd Year", value: 2 },
    { name: "3rd Year", value: 3 },
    { name: "4th Year", value: 4 },
    { name: "5th Year", value: 5 },
    { name: "6th Year", value: 6 },
    { name: "7th Year", value: 7 },
    { name: "8th Year", value: 8 },
    { name: "9th Year", value: 9 },
    { name: "10th Year", value: 10 },
  ];
  const [selectedYearValue, setSelectedYearValue] = useState("");
  const [yearValue, setYearValue] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setBearToken(token || "");
    handleGetAllInstitutions();
  }, []);

  const handleSelectChangeYear = (event: any) => {
    const selectedYearValue = event.target.value;
    setSelectedYearValue(selectedYearValue);
    setYearValue(selectedYearValue);
  };

  const handleSelectChangeInstitutions = (event: any) => {
    setDegreeProgramsData([]);
    const selectedInstitutionId = event.target.value;
    setSelectedInstitutionValue(selectedInstitutionId);
    setInstitutionId(selectedInstitutionId);
    handleGetAllDegreeProgramsRelatedToInstitution(selectedInstitutionId);
  };

  const handleSelectChangeDegreePrograms = (event: any) => {
    const selectedDegreeProgramId = event.target.value;
    setSelectedDegreeProgramValue(selectedDegreeProgramId);
    setDegreeProgramId(selectedDegreeProgramId);
  };

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

  const handleGetAllDegreeProgramsRelatedToInstitution = async (
    institutionId: string
  ) => {
    setLoadingSpinner(true);
    const response = await getAllDegreeProgramsRelatedToInstitution(
      institutionId
    );
    if (response.success) {
      console.log("getAllDegreeProgramsRelatedToInstitution", response.data);
      setDegreeProgramsData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleCreateAcademicYear = async () => {
    try {
      setLoadingSpinner(true);
      const response = await createAcademicYear(
        bearToken,
        name,
        yearValue,
        institutionId,
        degreeProgramId
      );
      if (response.success) {
        console.log("createAcademicYear", response.data);
        setName("");
        setSelectedYearValue("");
        setSelectedInstitutionValue("");
        setSelectedDegreeProgramValue("");
        setLoadingSpinner(false);
        toast.success("Added academic year successfully");
      } else {
        setLoadingSpinner(false);
        toast.error(response.error);
      }
    } catch (error: any) {
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">Academic Year</h1>
      <div className="rounded-xl bg-slate-100 px-10 py-14 mt-16">
        <h1 className="text-xl text-slate-700 font-bold mb-10">
          Create New Academic Year
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Select an Institution
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            name="inputField"
            onChange={handleSelectChangeInstitutions}
            value={selectedInstitutionValue}
          >
            <option value="" disabled={true}>
              Select an institution
            </option>
            {institutionData.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Select Degree Programme
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            name="inputField"
            onChange={handleSelectChangeDegreePrograms}
            value={selectedDegreeProgramValue}
          >
            <option value="" disabled={true}>
              Select degree programme
            </option>
            {degreeProgramsData.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputField"
          >
            Select Year
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            name="inputField"
            onChange={handleSelectChangeYear}
            value={selectedYearValue}
          >
            <option value="" disabled={true}>
              Select year
            </option>
            {yearValueData.map((item: any) => (
              <option key={item.name} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <InputFieldComponent
          label="Title"
          type="text"
          placeholder="Enter title here"
          value={name}
          onChange={setName}
        />
        <div className="w-full flex flex-row justify-start items-center mt-10">
          <div className="w-1/5">
            <ButtonComponent
              name={"Create Academic Year"}
              handleAction={handleCreateAcademicYear}
            />
          </div>
        </div>
      </div>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
