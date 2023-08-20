import React, { useState } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import { VIEWS } from "../../utils/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/loading-spinner.component";
import { decodeJwt } from "../../utils/decode-jwt";
import InputFieldComponent from "../../components/input-field.component";
import TopNavbarComponent from "../../components/top-navbar.component";
import { loginUser } from "../../API/Auth/auth-api.service";
import ButtonComponent from "../../components/button.component";
import FooterComponent from "../../components/footer.component";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";

export default function SignIn() {
  useScrollToTop();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [isLoading, setIsLoading] = useState(false);

  const signInToPlatform = async () => {
    if (email === "") {
      toast.error("Please enter email..!!");
    } else if (!checkEmail.test(email)) {
      toast.error("Please enter valid email..!!");
    } else if (password === "") {
      toast.error("Please enter password..!!");
    } else {
      try {
        setIsLoading(true);
        const response = await loginUser(email, password);
        console.log(response.data);
        if (response.success) {
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(response.data.user)
          );
          setEmail("");
          setPassword("");
          const decodedToken = decodeJwt(response.data.token);
          setIsLoading(false);
          {
            decodedToken.role === "ADMIN"
              ? navigate(VIEWS.ADMIN_DASHBOARD)
              : navigate(VIEWS.USER_DASHBOARD);
          }
        } else {
          setIsLoading(false);
          toast.error(response.error);
        }
      } catch (error: any) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const handleSignUp = () => {
    navigate(VIEWS.SIGN_UP);
  };

  return (
    <React.Fragment>
      <div className="mt-24">
        <TopNavbarComponent btnName={"Sign Up"} btnAction={handleSignUp} />
        <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-md shadow-md mt-28 mb-32">
          <h1 className="text-2xl font-bold mb-12 text-center">
            Login to your Account
          </h1>
          <InputFieldComponent
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={setEmail}
          />
          <InputFieldComponent
            label="Password"
            type="password"
            placeholder="**************"
            value={password}
            onChange={setPassword}
          />
          <ButtonComponent
            name={"Login to Your Account"}
            handleAction={signInToPlatform}
          />
          <p className="block text-gray-700 text-sm font-semibold mt-5 text-center">
            Don't have an account?{" "}
            <Link
              to={VIEWS.SIGN_UP}
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
        <FooterComponent />
      </div>
      {isLoading ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
