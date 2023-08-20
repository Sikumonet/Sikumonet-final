import React, { useState } from "react";
import TopNavbarComponent from "../components/top-navbar.component";
import { VIEWS } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterComponent from "../components/footer.component";
import bgImage from "../assets/images/bg.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSignIn = () => {
    navigate(VIEWS.SIGN_IN);
  };

  const handleSignUp = () => {
    navigate(VIEWS.SIGN_UP);
  };

  return (
    <React.Fragment>
      <TopNavbarComponent btnName={"Sign In"} btnAction={handleSignIn} />
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60 z-10"></div>
        <div className="h-screen flex flex-col justify-center items-center relative z-20">
          <h1 className="text-white text-8xl font-bold text-center uppercase">
            Get Your Summary
          </h1>
          <h6 className="text-white text-4xl font-bold text-center mt-8">
            What are you waiting for?
          </h6>
          <button
            onClick={handleSignUp}
            type="button"
            className="mt-10 flex flex-row justify-start items-center bg-none hover:bg-blue-600 text-slate-50 hover:text-slate-100 rounded-xl text-lg px-10 py-5 text-center mr-3 md:mr-0 font-bold relative overflow-hidden transition-all duration-500"
            style={{
              boxShadow: "0px 0px 0px 2px white",
            }}
          >
            <span className="absolute top-0 left-0 w-full h-full transform scale-0 bg-white origin-top-left transition-transform duration-300"></span>
            Get Started
          </button>
        </div>
      </div>
      <FooterComponent />
      {isLoading ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
