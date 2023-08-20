import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import {
  deleteSingleLibrary,
  getAllLibrariesRelatedToUser,
} from "../../API/Library/library-api.service";
import SubjectsCardComponent from "../../components/subject-card.component";
import { Link } from "react-router-dom";
import { VIEWS } from "../../utils/routes";

export default function UserLibrary() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [myLibraryData, setMyLibraryData] = useState([]);
  const [institutionName, setInstitutionName] = useState("");
  const [bearToken, setBearToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      setBearToken(token);
      setUserId(JSON.parse(user).id);
      handleGetAllLibrariesRelatedToUser(JSON.parse(user).id);
    }
  }, []);

  const handleGetAllLibrariesRelatedToUser = async (userId: string) => {
    setLoadingSpinner(true);
    const response = await getAllLibrariesRelatedToUser(userId);
    if (response.success) {
      console.log(response.data);
      setMyLibraryData(response.data);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  const handleRemoveFromLibrary = async (libraryId: string) => {
    setLoadingSpinner(true);
    const response = await deleteSingleLibrary(bearToken, libraryId);
    if (response.success) {
      console.log("deleteSingleLibrary : ", response.data);
      handleGetAllLibrariesRelatedToUser(userId);
      setLoadingSpinner(false);
      toast.success("Item remove from library successfully");
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">My Library</h1>
      <div className="mt-20">
        <div className="grid grid-cols-3 gap-4">
          {myLibraryData
            .map((item: any, index: any) => (
              <div>
                <Link
                  to={`${VIEWS.USER_SUBJECT_VIEW}?id=${item.subject._id}`}
                  className="cursor-pointer"
                >
                  <SubjectsCardComponent
                    name={item.subject.name}
                    imgUrl={item.subject.image.url}
                    key={index.toString()}
                  />
                </Link>
                <div className="w-full flex flex-row items-center justify-center">
                  <button
                    onClick={() => handleRemoveFromLibrary(item._id)}
                    className="text-blue-500 hover:text-slate-50 border-2 border-blue-500 hover:bg-blue-500 rounded-full p-2 w-8 h-8 flex items-center justify-center mt-5"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      </div>
      {myLibraryData.length === 0 ? (
        <p className="mt-36 text-slate-400 font-semibold text-center">
          There is no data found.
        </p>
      ) : null}
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
