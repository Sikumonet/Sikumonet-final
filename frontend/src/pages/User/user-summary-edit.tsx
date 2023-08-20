import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import ButtonComponent from "../../components/button.component";
import InputFieldComponent from "../../components/input-field.component";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getSingleSummary,
  updateSingleSummary,
} from "../../API/Summaries/summary-api.service";
import { ISummaryData } from "../../common/types/summary.interface";

export default function UserSummaryEdit() {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [summaryId, setSummaryId] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [semester, setSemester] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [bearToken, setBearToken] = useState("");
  const [summaryData, setSummaryData] = useState({
    title: "",
    lectureName: "",
    semester: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setBearToken(token || "");
    setSummaryId(String(id));
    handleSingleSummaryDetails(String(id));
  }, []);

  const handleSingleSummaryDetails = async (summaryId: string) => {
    setLoadingSpinner(true);
    const response = await getSingleSummary(summaryId);
    if (response.success) {
      console.log("getSingleSummary : ", response.data);
      setSummaryData({
        title: response.data.title,
        lectureName: response.data.lectureName,
        semester: response.data.semester,
      });
      setTitle(response.data.title);
      setLectureName(response.data.lectureName);
      setSemester(response.data.semester);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  //Handling the file uploading and creating the summary goes here
  const handleSelectFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateSummaryDetails = async () => {
    try {
      setLoadingSpinner(true);
      const dataToUpdate = new FormData();
      if (title) {
        dataToUpdate.append("title", title);
      }
      if (lectureName) {
        dataToUpdate.append("lectureName", lectureName);
      }
      if (semester) {
        dataToUpdate.append("semester", semester);
      }
      if (file) {
        dataToUpdate.append("file", file);
      }
      console.log("dataToUpdate : ", dataToUpdate);
      const response = await updateSingleSummary(
        bearToken,
        summaryId,
        dataToUpdate
      );
      if (response.success) {
        console.log("updateSingleSummary", response.data);
        handleSingleSummaryDetails(summaryId);
        setLoadingSpinner(false);
        toast.success("Updated summary successfully");
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
      <div className="flex flex-row justify-start items-center">
        <button
          className="rounded-full border-2 p-3 h-fit w-fit m-2"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className="text-3xl text-slate-700 font-bold ml-4">
          {summaryData.title}
        </h1>
      </div>
      <form>
        <div className="rounded-xl bg-slate-100 px-10 py-14 mt-16">
          <h1 className="text-xl text-slate-700 font-bold mb-10">
            Update Summary Details
          </h1>
          <InputFieldComponent
            label="Summary Title"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={setTitle}
          />
          <InputFieldComponent
            label="Lecture Name"
            type="text"
            placeholder="Enter lecture name here"
            value={lectureName}
            onChange={setLectureName}
          />
          <InputFieldComponent
            label="Semester"
            type="text"
            placeholder="Enter semester here"
            value={semester}
            onChange={setSemester}
          />
          <div className="mt-10">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inputField"
            >
              Upload Summary File
            </label>
            <input
              onChange={handleSelectFile}
              type="file"
              id="formUpload"
              name="image"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="w-full flex flex-row justify-start items-center mt-10">
            <div className="w-1/5">
              <ButtonComponent
                name={"Upload Summary"}
                handleAction={handleUpdateSummaryDetails}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
