import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VIEWS } from "../../../utils/routes";
import profilePic from "../../../assets/images/propic.jpg";
import LoadingSpinner from "../../loading-spinner.component";
import { getLoggedInUser } from "../../../API/Auth/auth-api.service";

const DashboardTopNavComponent = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    role: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("loggedInUser");
    if (token) {
      handleGetLoggedInUser(token);
    }
    setLoggedInUser({
      role: JSON.parse(user || "")?.role,
    });
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate(VIEWS.SIGN_IN);
  };

  const handleGetLoggedInUser = async (token: string) => {
    setLoadingSpinner(true);
    const response = await getLoggedInUser(token);
    if (response.success) {
      console.log("getLoggedInUser : ", response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setUserAvatar(response.data.userAvatar);
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <div className="bg-gray-200 h-16 px-4 flex items-center justify-end fixed top-0 right-0 w-full z-10">
      <div className="flex flex-col justify-end text-right mr-5">
        <p className="font-semibold text-md text-gray-800">{name}</p>
        <p className="font-medium text-sm text-gray-400">{email}</p>
      </div>
      <div className="relative">
        <div
          onClick={toggleDropdown}
          className="bg-gray-400 text-white h-12 w-12 rounded-full cursor-pointer"
          style={{
            backgroundImage: `url(${userAvatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <ul className="absolute right-0 mt-1 bg-white border shadow-md rounded-lg font-semibold">
            {loggedInUser.role === "USER" ? (
              <Link to={VIEWS.USER_PROFILE}>
                <li className="py-2 px-8 hover:bg-gray-100 cursor-pointer flex flex-row items-center">
                  <i className="fa-regular fa-user mr-4"></i> Profile
                </li>
              </Link>
            ) : null}
            <li
              className="py-2 px-8 hover:bg-gray-100 cursor-pointer flex flex-row items-center"
              onClick={handleSignOut}
            >
              <i className="fa-solid fa-arrow-right-from-bracket mr-4"></i>{" "}
              Logout
            </li>
          </ul>
        )}
      </div>
      {loadingSpinner ? <LoadingSpinner /> : null}
    </div>
  );
};

export default DashboardTopNavComponent;
